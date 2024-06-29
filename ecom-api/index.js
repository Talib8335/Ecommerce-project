require("dotenv").config()
const mongoose = require("mongoose")
mongoose.connect(process.env.DB_URL)

const express = require("express")
const cors = require("cors")
const productRouter = require("./routes/product.routes")
const authRouter = require("./routes/auth.routes")
const storageRouter = require("./routes/storage.routes")
const tokenRouter = require("./routes/token.routes")
const razorpayRouter = require("./routes/razorpay.routes")
const orderRouter = require("./routes/order.routes")
const cartRouter = require("./routes/cart.routes")
const couponRouter = require("./routes/coupon.routes")
const brandRouter = require("./routes/brand.routes")
const categoryRouter = require("./routes/category.routes")
const checkoutRouter = require("./routes/checkout.routes")
const userRouter = require("./routes/user.routes")
const authorizationMiddleware = require("./middleware/authorization.middleware")
const bodyParser = require("body-parser")

const multer = require("multer")
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'storage/')
    },
    filename: (req, file, cb)=>{
        const fileNameArray = file.originalname.split(".")
        const lastIndex = fileNameArray.length-1
        const ext = '.'+fileNameArray[lastIndex]
        cb(null, Date.now()+ext)
    }
})
const upload = multer({storage: storage})

const app = express()
app.listen(8080)
app.use(express.static('storage'))

app.use(cors({
    origin: process.env.CLIENT,
    exposedHeaders: ['X-Auth-Role']
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/product', productRouter)

app.use('/auth', authRouter)

app.use('/order', orderRouter)

app.use('/storage', upload.single('fileData'), storageRouter)

app.use('/token', tokenRouter)

app.use('/razorpay', razorpayRouter)

app.use('/order', orderRouter)

app.use('/cart',authorizationMiddleware, cartRouter)

app.use('/coupon', couponRouter)

app.use('/brand', brandRouter)

app.use('/category', categoryRouter)

app.use('/checkout', authorizationMiddleware, checkoutRouter)

app.use('/user', userRouter)