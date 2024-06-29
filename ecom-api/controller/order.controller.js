const OrderSchema = require("../model/order.model")

const fetchAllOrder = async (req, res)=>{
    try {
        const orders = await OrderSchema.find()
        .populate('user', '-password')
        .populate('product')

        res.status(200).json(orders)
    }
    catch(err)
    {
        res.status(500).json({
            success: false,
            message: err
        })
    }
}

const fetchUserOrder = async (req, res)=>{
    try {
        const orders = await OrderSchema.find({user: req.user.uid}).populate('product')
        res.status(200).json(orders)
    }
    catch(err)
    {
        res.status(500).json({
            success: false,
            message: err
        })
    }
}

const updateStatus = async (req, res)=>{
    try {
        await OrderSchema.findByIdAndUpdate(req.params.id, {status: req.body.status})
        res.status(200).json({success: true})
    }
    catch(err)
    {
        res.status(500).json({
            success: false,
            message: err
        }) 
    }
}


module.exports = {
    fetchAllOrder,
    updateStatus,
    fetchUserOrder
}
