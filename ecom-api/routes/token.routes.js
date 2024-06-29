const express = require("express")
const { verifyToken } = require("../controller/token.controller")
const router = express.Router()

router.post('/verify', verifyToken)

module.exports = router