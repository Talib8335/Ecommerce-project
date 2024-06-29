const ProductSchema = require("../model/product.model")

const fetchProduct = async (req, res)=>{
    try {
        const products = await ProductSchema.find()
        res.status(200).json(products)
    }
    catch(err)
    {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const createProduct = async (req, res)=>{
    try {
        const newProduct = new ProductSchema(req.body)
        await newProduct.save()
        res.status(200).json(newProduct)
    }
    catch(err)
    {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const updateProduct = async (req, res)=>{
    try {
        const id = req.params.id
        const data = req.body
        // const modified = await Product.findByIdAndUpdate(id, data, {new: true})
        // res.status(200).json(modified)
        await ProductSchema.findByIdAndUpdate(id, data)
        res.status(200).json({success: true})
    }
    catch(err)
    {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const deleteProduct = async (req, res)=>{
    try {
        const id = req.params.id
        await ProductSchema.findByIdAndDelete(id)
        res.status(200).json({success: true})
    }
    catch(err)
    {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = {
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct
}