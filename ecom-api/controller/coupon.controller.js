const CouponSchema = require("../model/coupon.model")

const createCoupon = async (req, res)=>{
    try {
        console.log(req.body);
        const coupon = new CouponSchema(req.body)
        await coupon.save()
        res.status(200).json(coupon)
    }
    catch(err)
    {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const expireCoupon = async (req, res)=>{
    try {
        await CouponSchema.findByIdAndUpdate(req.params.id, {isActive: false})
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

const fetchCoupon = async (req, res)=>{
    try {
        const coupon = await CouponSchema.findOne({
            code: req.params.code, 
            isActive: true
        })

        if(!coupon) return res.status(404).json({success: false})

        res.status(200).json(coupon)
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
    createCoupon,
    expireCoupon,
    fetchCoupon
}