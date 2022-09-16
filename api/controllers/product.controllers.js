const productDatabase = require('../model/product.model')
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middlewares/catchAsyncError")
const ApiFeatures = require('../utils/apiFeatures')

// gatAllProducts
const getAllproducts = catchAsyncError(async (req, res) => {
    const resultPerPage = 8
    const productCount = await productDatabase.countDocuments()
    
    const apiFeatures = new ApiFeatures(productDatabase.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage)
    
    // const products = await productDatabase.find()
    const products = await apiFeatures.query
    return res.status(200).json({
        message: "sucess", products, productCount
    })
})
// creating new id per product
let latestProductId=100
const getLatestId=async()=>{
const launch=await productDatabase.findOne().sort('-id')
if(!launch){
    return latestProductId
}
return launch.id
}
// create product
const createProduct = catchAsyncError(async (req, res) => {
    // const product = await productDatabase.create(req.body)
    
    // res.status(201).json({
        //     message: true,
        //     product
        // })

        let latestId=await getLatestId() + 1
        console.log(latestId)
const product=await Object.assign(req.body,{
    upcoming:true,
    success:true,
    id:latestId
})
const products=await productDatabase.create(product)
res.status(201).json({
    message: true,
        products
})
})

// updateProducts
const updateProducts = catchAsyncError(async (req, res) => {
    let product = await productDatabase.findById(req.params.id)

    if (!product) {
        res.status(404).json({
            success: false,
            message: "product not found"
        })
    }

    product = await productDatabase.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: true
    })

    res.status(200).json({
        message: "successfully updated product",
        product
    })
})

// delete product
const deleteProduct = catchAsyncError(async (req, res) => {
    let product = await productDatabase.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }

    product = await product.remove()

    res.status(200).json({
        message: "product successfully deleted",
        success: true,
        product
    })
})

// getProductDetails
const getProductDetails = catchAsyncError(async (req, res, next) => {

    let product = await productDatabase.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }
    res.status(200).json({
        success: true,
        product,
        // productCount
    })
})

// create new review or update new review
const createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await productDatabase.findById(productId)

    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString())

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString())
                rev.rating = rating,
                    rev.comment = comment
        })
    } else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    let avg = 0
    product.reviews.forEach((rev) => {
        avg += rev.rating
    })

    product.ratings = avg / product.reviews.length

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true
    })
})

// get All review of a product
const getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await productDatabase.findById(req.query.id)

    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// delete reviews
const deleteProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await productDatabase.findById(req.query.productId)

    if (!product) {
        return next(new ErrorHandler("product not found", 404))
    }

    const reviews = product.reviews.filter((rev) => {
        rev._id.toString() !== req.query.id.toString()
    })

    let avg = 0
    reviews.forEach((rev) => {
        avg += rev.rating
    })

    const ratings = avg / reviews.length
    const numOfReviews = reviews.length

    await productDatabase.findByIdAndUpdate(req.query.productId, {
        reviews, ratings, numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})
module.exports = {
    getAllproducts,
    createProduct,
    updateProducts,
    deleteProduct,
    getProductDetails,
    createProductReview,
    getProductReviews,
    deleteProductReviews

}