const express = require('express')
const { register, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, updateUserProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser, emailSend, changePassword } = require('../controllers/user.controllers')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/login', loginUser)
userRouter.get('/logout', logoutUser)
userRouter.get('/me', isAuthenticatedUser, getUserDetails)
userRouter.post('/password/forgot', forgotPassword)
userRouter.put('/password/reset/:token', resetPassword)
userRouter.put('/password/update', isAuthenticatedUser, updatePassword)
userRouter.put('/me/update', isAuthenticatedUser, updateUserProfile)
userRouter.get('/admin/users', isAuthenticatedUser, authorizeRoles("admin"), getAllUsers)
userRouter.get('/admin/user/:id', isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
userRouter.put('/admin/user/:id', isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
userRouter.delete('/admin/user/:id', isAuthenticatedUser, authorizeRoles("admin"), deleteUser)
userRouter.post('/email/send', emailSend)
userRouter.post('/password/change', changePassword)

module.exports = userRouter