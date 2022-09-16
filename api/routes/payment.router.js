const express=require("express")
const { processPayment, sendStripeApiKey } = require("../controllers/payment.controllers")
const { isAuthenticatedUser } = require("../middlewares/auth")

const paymentRouter=express.Router()


paymentRouter.post('/payment/process',isAuthenticatedUser,processPayment)
paymentRouter.get('/stripeApiKey',sendStripeApiKey)

module.exports=paymentRouter