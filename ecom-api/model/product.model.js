const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
    thumbnail: {
        type: String,
        trim: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    brand: {
        type: String,
        trim: true,
        default: 'other'
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    discount: {
        type: Number,
        trim: true,
        required: true
    },
    category: {
        type: String,
        trim: true,
        default: 'other'
    },
    quantity: {
        type: Number,
        trim: true,
        required: true
    } 
}, {timestamps: true})

const productModel = mongoose.model("Product", productSchema)
module.exports = productModel
