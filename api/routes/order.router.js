const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/order.controllers")
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth")

const express = require("express")

const orderRouter = express.Router()

orderRouter.post("/order/new", isAuthenticatedUser, newOrder)
orderRouter.get("/order/:id", isAuthenticatedUser, getSingleOrder)
orderRouter.get("/orders/me", isAuthenticatedUser, myOrders)
orderRouter.get("/admin/orders", isAuthenticatedUser, authorizeRoles("admin"), getAllOrders)
orderRouter.put("/admin/order/:id", isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
orderRouter.delete("/admin/order/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteOrder)

module.exports = orderRouter