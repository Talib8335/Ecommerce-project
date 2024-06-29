require("dotenv").config()
const jwt = require("jsonwebtoken")
const fiveMinute = '7d'
const token = jwt.sign({session: Date.now()}, process.env.ADMIN_SECRET, {expiresIn: fiveMinute})
console.log(token)