const express = require("express")
const { addToCart, removeFromCart, fetchCart } = require("../controller/cart.controller")
const userMiddleware = require("../middleware/authorization.middleware")
const router = express.Router()

router.post('/', userMiddleware, addToCart)
router.get('/', userMiddleware, fetchCart)
router.delete('/:id', userMiddleware, removeFromCart)

module.exports = router