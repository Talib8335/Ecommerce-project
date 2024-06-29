const Razorpay = require("razorpay")
const sendMail = require("../util/mail.util")
const crypto = require("crypto")
const secret = process.env.RAZORPAY_SECRET
const OrderSchema = require("../model/order.model")

const Razor = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const createOrder = async (req, res)=>{
    try {
        const {price, discount} = req.user
        const amount = price-(price*discount)/100
        const order = await Razor.orders.create({
            amount: (amount*100),
            receipt: 'WP_RN_'+Date.now()
        })
        res.status(200).json({
            amount: order.amount,
            orderId: order.id
        })
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}

const fetchPayments = async (req, res)=>{
    try {
        const payments = await Razor.payments.all()
        res.status(200).json(payments)
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}

const handleFailedPayment = async (data, res)=>{
    const {email, description} = data.payload.payment.entity
    const payload = {
        email,
        description
    }
    await sendMail(email, `Payment Failed - ${description}`, 'paymentFailed', payload)
    res.status(200).json({success: false})
}

const createProductOrder = async (data, res)=>{
    try {
        const payload = data.payload.payment.entity.notes
        const {email, description} = data.payload.payment.entity

        const mailPayload = {
            email,
            description
        }
        
        const order = new OrderSchema(payload)
        await order.save()
        await sendMail(email, `Payment Success - ${description}`, 'paymentSuccess', mailPayload)
        res.status(200).json({success: true})
    }
    catch(err)
    {
        console.log("two", err)
        res.status(500).json({success: false})
    }
}

const webhook = async (req, res)=>{
    const signature = req.headers['x-razorpay-signature']
    const data = req.body

    const paymentSignature = crypto.createHmac('sha256', secret)
    .update(JSON.stringify(data))
    .digest('hex')

    if(signature !== paymentSignature)
        return res.status(400).json({success: false})

    // Request is valid
    if(data.event === "payment.failed")
        return handleFailedPayment(data, res)

    if(data.event === "payment.captured")
        return createProductOrder(data, res)

    res.status(200).json({success: true})
}

module.exports = {
    createOrder,
    fetchPayments,
    webhook
}