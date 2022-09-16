const orederDatabase = require("../model/order.model")
const productDatabase = require('../model/product.model')
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middlewares/catchAsyncError")

// create new order

const newOrder = catchAsyncError(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body

    const order = await orederDatabase.create({
        shippingInfo, orderItems, paymentInfo, itemPrice, taxPrice, shippingPrice, totalPrice, paidAt: Date.now(), user: req.user._id
    })

    res.status(201).json({
        success: true,
        order
    })
})

// get single Order

const getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await orederDatabase.findById(req.params.id).populate("user", "name email")

    if (!order) {
        return next(new ErrorHandler("order not found with thid id", 404))
    }

    res.status(200).json({
        succcess: true,
        order
    })
})

// get loggedin user details
const myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await orederDatabase.find({ user: req.user._id })

    res.status(200).json({
        success: true,
        orders
    })
})

// get All orders for admin
const getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await orederDatabase.find()

    let totalAmount = 0

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })
    res.status(200).json({
        success: true,
        orders,
        totalAmount
    })
})
// update order status for admin
const updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await orederDatabase.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler("order not found with thid id", 404))
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("you have already delivered this order", 400))
    }

    order.orderItems.forEach(async (order) => {
        await updateStock(order._id, order.quantity)
    })

    order.orderStatus = req.body.orderStatus

    if (req.body.orderStatus === "Delivered") {
        order.deleviredAt = Date.now()
    }

    await order.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true,
        order,
        // totalAmount
    })
})

async function updateStock(id, quantity) {
    const product = await productDatabase.findById(id)
    product.stock -= quantity
    await product.save({ validateBeforeSave: false })
}

// delete orders
const deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await orederDatabase.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler("order not found with thid id", 404))
    }
    await order.remove()
    res.status(200).json({
        success: true,

    })
})
module.exports = {
    newOrder,
    getSingleOrder,
    myOrders,
    getAllOrders,
    updateOrder,
    deleteOrder
}