const express = require("express")
const {login, signup, forgotPassword} = require("../controller/auth.controller")
const roleMiddleware = require("../middleware/role.middleware")
const router = express.Router()

router.post('/login', login)

router.post('/signup', roleMiddleware, signup)

router.post('/forgot-password', forgotPassword)

module.exports = router