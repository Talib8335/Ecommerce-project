const UserSchema = require("../model/user.model")

const fetchUsers = async (req, res)=>{
    try {
        const users = await UserSchema.find({}, {password: 0, role: 0})
        res.status(200).json(users)
    }
    catch(err)
    {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports ={
    fetchUsers
}