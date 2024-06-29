const jwt = require("jsonwebtoken")

const verifyToken = (req, res)=>{
    try {
        const iss = req.query.iss
        let secret = null

        if(!iss) secret = process.env.AUTH_SECRET

        if(iss === "admin") secret = process.env.ADMIN_SECRET

        if(iss === "checkout") secret = process.env.CHECKOUT_SECRET

        const {token} = req.body
        const data = jwt.verify(token, secret)
        res.status(200).json(data)
    }
    catch(err)
    {
        res.status(401).json({success: false})
    }
}

module.exports = {
    verifyToken
}