const express = require("express")
const { createOrder, fetchPayments, webhook } = require("../controller/razorpay.controller")
const router = express.Router()
const userMiddleware = require("../middleware/authorization.middleware")
const adminMiddleware = require("../middleware/admin.middleware")

router.post('/order', userMiddleware, createOrder)

router.get('/payments', adminMiddleware, fetchPayments)

router.post('/webhook', webhook)


module.exports = router