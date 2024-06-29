const jwt = require("jsonwebtoken")

const roleMiddleware = async (req, res, next)=>{
    try {
        const token = req.headers['x-auth-token']
        await jwt.verify(token, process.env.ADMIN_SECRET)
        req.body.role = "admin"
        next()
    }
    catch(err)
    {
        req.body.role = "user"
        next()
    }
}

module.exports = roleMiddleware