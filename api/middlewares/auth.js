const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken')
const userDatabase = require("../model/user.model")

const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await userDatabase.findById(decodedData.id);

    next();
});

const authorizeRoles = (...roles) => {
    // ye user hmm login se le rahe hai
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role:${req.user.role} is not allowed to access this resource`, 403))
        }
        next()
    }
}
module.exports = { isAuthenticatedUser, authorizeRoles }