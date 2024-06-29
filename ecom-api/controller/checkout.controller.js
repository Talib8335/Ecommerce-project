const ProductSchema = require("../model/product.model")
const CouponSchema = require("../model/coupon.model")
const jwt = require("jsonwebtoken")
const fiveMinute = 300000

const createCheckout = async (req, res)=>{
    try {
        const product = await ProductSchema.findById(req.body.productId)

        if(!product) 
            return res.status(500).json({success: false})

        const token = await jwt.sign(product.toObject(), process.env.CHECKOUT_SECRET, {expiresIn: fiveMinute})

        res.status(200).json({
            success: true,
            token: token
        })
    }   
    catch(err)
    {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const refreshCheckout = async (req, res)=>{
    try {
        delete req.user.iat
        delete req.user.exp
        const couponId = req.body.coupon
        const couponData = await CouponSchema.findById(couponId)
        req.user.discount = couponData.discount

        const token = await jwt.sign(req.user, process.env.CHECKOUT_SECRET, {expiresIn: fiveMinute})
        res.status(200).json({
            success: true,
            token: token
        })
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
    createCheckout,
    refreshCheckout
}