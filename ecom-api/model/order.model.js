const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'created',
        enum: ['created', 'packaging', 'dispatched']
    }
}, {timestamps: true})

const orderModel = mongoose.model("Order", orderSchema)
module.exports = orderModel
