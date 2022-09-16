const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middlewares/catchAsyncError")
const userDatabase = require('../model/user.model')
const sendToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail")
const crypto = require('crypto')
const cloudinary = require("cloudinary")
const otpDatabase = require("../model/otpmodel")
// regiter user
const register = catchAsyncError(async (req, res, next) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale"
    })

    const { name, email, password } = req.body

    const user = await userDatabase.create({
        name, email, password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    })

    if (!user) {
        return next(new ErrorHandler("please fill all deatais", 404))
    }
    sendToken(user, 200, res)
})


// login user
const loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new ErrorHandler("please Enter email or password", 400))
    }

    const user = await userDatabase.findOne({ email }).select("+password")

    if (!user) {
        return next(new ErrorHandler("invalid email", 404))
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("invalid user Password", 402))
    }

    sendToken(user, 200, res)
})

// logout user
const logoutUser = catchAsyncError(async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "successfully logout user"
    })
})

// forgot passwords
const forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await userDatabase.findOne({ email: req.body.email })


    if (!user) {
        return next(new ErrorHandler("user not found", 404))
    }

    // get ResetPasswordToken

    const resetToken = await user.getResetPasswordToken()
    console.log(resetToken)
    await user.save({ validateBeforeSave: false })

    // const resetPasswordUrl = `http://localhost:3000/password/reset/${resetToken} `
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset `

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nif you have not requested this email then, please ignore it`

    try {
        await sendEmail({
            email: user.email,
            subject: "Ecoomerce password recovery",
            message
        })

        res.json({
            success: true,
            status: 200,
            resetToken,
            message: `Email send to ${user.email} successfully`
        })

    } catch (error) {
        user.resetPasswordToken = undefined,
            user.resetPasswordExpire = undefined
        await user.save({ validateBeforeSave: false })

        return next(new ErrorHandler(error.message, 500))
    }
})

// reset password
const resetPassword = catchAsyncError(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex")

    const user = await userDatabase.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler("Resest password token is invalid or expired", 404))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("password does not match", 404))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    sendToken(user, 200, res)
})

// get user details ye tumhari details hai
const getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await userDatabase.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})

// update user Password
const updatePassword = catchAsyncError(async (req, res, next) => {

    const user = await userDatabase.findById(req.user.id).select("+password")

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("old password is incorrect", 400))
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("password does not match", 400))
    }

    user.password = req.body.newPassword
    await user.save()

    sendToken(user, 200, res)
})

// update user Profile
const updateUserProfile = catchAsyncError(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    if(req.body.avatar !==""){
        const user=await userDatabase.findById(req.user.id);

        const imageId=user.avatar.public_id

        await cloudinary.v2.uploader.destroy(imageId)

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale"
        })

        newUserData.avatar={
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    }

    const user = await userDatabase.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        user
    })
})

// getAllUsers
const getAllUsers = catchAsyncError(async (req, res, next) => {

    const user = await userDatabase.find({})

    res.status(200).json({
        success: true,
        user
    })
})

// get single user (only see the admin) or isme admin kisi bhi user ki detail dekh skta hai
const getSingleUser = catchAsyncError(async (req, res, next) => {

    const user = await userDatabase.findById(req.params.id)

    if (!user) {
        return next(new ErrorHandler(`user does not exists with id ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true,
        user
    })
})

// update user role
const updateUserRole = catchAsyncError(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await userDatabase.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        user
    })
})

// delete user
const deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await userDatabase.findById(req.params.id)
    if (!user) {
        return next(new ErrorHandler(`user does not exists with id: ${req.params.id}`, 404))
    }
    await user.remove()
    res.status(200).json({
        success: true,
        message: "user deleted successfully"
    })
})

const emailSend = catchAsyncError(async (req, res, next) => {
    const data = await userDatabase.findOne({ email: req.body.email })

    if (data) {
        let otpCode = Math.floor((Math.random() * 10000) + 1)

        let otpData = new otpDatabase({
            email: req.body.email,
            code: otpCode,
            expiresIn: new Date().getTime() + 300 * 1000
        })
        console.log(otpCode)
        await sendEmail({
            email: data.email,
            subject: `your otp is ${otpCode}`,
            message: `Email send to ${data.email} successfully`
        })
        await otpData.save()
        res.status(200).json({
            success:true,
            message:"otp has been sent your email id"
        })
    } else {
        return next(new ErrorHandler("Email id does not Exist", 404))
    }
})

const changePassword = catchAsyncError(async (req, res, next) => {
    const data = await otpDatabase.findOne({ code: req.body.code })
    if (data) {
        let currentTime = new Date().getTime()
        let diff = data.expiresIn - currentTime

        if (diff < 0) {
            return next(new ErrorHandler("token is expired", 400))
        } else {
            let user = await userDatabase.findOne({ email: req.body.email }).select("+password")
            if (req.body.password !== req.body.confirmPassword) {
                return next(new ErrorHandler("password does not match", 400))
            }
            user.password = req.body.password

            await user.save()
            return res.json({
                status: 200,
                message: "password changed successfully"
            })

        }
    } else {
        return next(new ErrorHandler("inavlid otp", 404))
    }
})
module.exports = {
    register, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateUserProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser, emailSend, changePassword
}