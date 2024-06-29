const jwt = require("jsonwebtoken")

const adminMiddleware = async (req, res, next)=>{
    const authorization = req.headers.authorization

    if(!authorization) 
        return res.status(401).send("Unauthorized")

    const [type, token] = authorization.split(" ")
    
    if(type !== "Bearer")
        return res.status(401).send("Unauthorized")

    try {
        const user = await jwt.verify(token, process.env.ADMIN_SECRET)
        req.user = user
        next()
    }
    catch(err)
    {
        return res.status(401).send("Unauthorized")
    }
}

module.exports = adminMiddleware