const jwt = require("jsonwebtoken")

const sessionMiddleware = async (req, res, next)=>{
    const authorization = req.headers.authorization

    if(!authorization) 
        return res.status(401).send("Unauthorized")

    const [type, token] = authorization.split(" ")
    
    if(type !== "Bearer" && type !== "Checkout")
        return res.status(401).send("Unauthorized")


    let secret = null
    if(type === "Bearer") 
        secret = process.env.AUTH_SECRET

    if(type === "Checkout")
        secret = process.env.CHECKOUT_SECRET

    try {
        const user = await jwt.verify(token, secret)
        req.user = user
        next()
    }
    catch(err)
    {
        return res.status(401).send("Unauthorized")
    }
}

module.exports = sessionMiddleware