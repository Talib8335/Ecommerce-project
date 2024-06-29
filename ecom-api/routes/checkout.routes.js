const express = require("express")
const { createCheckout, refreshCheckout } = require("../controller/checkout.controller")
const userMiddleware = require("../middleware/authorization.middleware")
const router = express.Router()

router.post('/', userMiddleware, createCheckout)
router.post('/refresh', userMiddleware, refreshCheckout)

module.exports = router