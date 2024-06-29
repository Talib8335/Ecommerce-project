const CategorySchema = require('../model/category.model')

const createCategory = async (req, res)=>{
    try {
        const category = new CategorySchema(req.body)
        await category.save()
        res.status(200).json(category)
    }
    catch(err)
    {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const fetchCategory = async (req, res)=>{
    try {
        const categories = await CategorySchema.find()
        res.status(200).json(categories)
    }
    catch(err)
    {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = {
    createCategory,
    fetchCategory
}