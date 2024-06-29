const express = require("express")
const { fetchAllOrder, updateStatus, fetchUserOrder } = require("../controller/order.controller")
const router = express.Router()
const userMiddleware = require("../middleware/authorization.middleware")
const adminMiddleware = require("../middleware/admin.middleware")

router.get('/', adminMiddleware, fetchAllOrder)
router.get('/user', userMiddleware, fetchUserOrder)
router.put('/:id', adminMiddleware, updateStatus)

module.exports = router