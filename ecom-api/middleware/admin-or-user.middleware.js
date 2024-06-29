const jwt = require("jsonwebtoken")

const session = async (token, secret)=>{
    try {
        const user = await jwt.verify(token, secret)
        return user
    }
    catch(err)
    {
        return null
    }
}

const sessionMiddleware = async (req, res, next)=>{
    const authorization = req.headers.authorization

    if(!authorization) 
        return res.status(401).send("Unauthorized")

    const [type, token] = authorization.split(" ")
    
    if(type !== "Bearer")
        return res.status(401).send("Unauthorized")

    const userSecret = process.env.AUTH_SECRET
    const adminSecret = process.env.ADMIN_SECRET

    const user = await session(token, userSecret)
    const admin = await session(token, adminSecret)

    if(!user && !admin)
        return res.status(401).send("Unauthorized")

    next()
}

module.exports = sessionMiddleware