const express = require("express")
const { createCoupon, expireCoupon, fetchCoupon } = require("../controller/coupon.controller")
const router = express.Router()
const userMiddleware = require("../middleware/authorization.middleware")
const adminMiddleware = require("../middleware/admin.middleware")

router.get('/:code', userMiddleware, fetchCoupon)
router.post('/', adminMiddleware, createCoupon)
router.delete('/:id', adminMiddleware, expireCoupon)

module.exports = router