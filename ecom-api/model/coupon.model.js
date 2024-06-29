const mongoose = require("mongoose")
const Schema = mongoose.Schema

const couponModel = new Schema({
    code: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        maxLength: 6
    },
    discount: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

couponModel.pre('save', async function(next){
    const count = await mongoose.model("Coupon").countDocuments({
        code: this.code.toUpperCase()
    })
    if(count > 0) 
        throw next(new Error("Duplicate coupon code"))

    next()
})

couponModel.pre('save', function(next){
    this.code = this.code.toUpperCase()
    next()
})

const CouponSchema = mongoose.model("Coupon", couponModel)
module.exports =  CouponSchema