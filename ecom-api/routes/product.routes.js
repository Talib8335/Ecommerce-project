const express = require("express")
const {
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controller/product.controller")
const adminMiddleware = require("../middleware/admin.middleware")
const router = express.Router()

router.get('/', fetchProduct)

router.post('/', adminMiddleware, createProduct)

router.put('/:id', adminMiddleware, updateProduct)

router.delete('/:id', adminMiddleware, deleteProduct)

module.exports = router