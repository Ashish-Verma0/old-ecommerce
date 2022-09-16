const { getAllproducts, createProduct, updateProducts, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteProductReviews } = require("../controllers/product.controllers")

const express = require('express')
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth")

const productRouter = express.Router()

productRouter.get('/products', getAllproducts)
productRouter.post('/product/new', isAuthenticatedUser, authorizeRoles("admin"), createProduct)
productRouter.put('/product/:id', isAuthenticatedUser, authorizeRoles("admin"), updateProducts)
productRouter.delete('/product/:id', isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)
productRouter.get('/product/:id', getProductDetails)
productRouter.put('/review', isAuthenticatedUser, createProductReview)
productRouter.get('/reviews', getProductReviews)
productRouter.delete('/review', isAuthenticatedUser, deleteProductReviews)

module.exports = productRouter