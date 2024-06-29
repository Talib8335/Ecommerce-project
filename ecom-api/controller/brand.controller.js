const  BrandSchema = require('../model/brand.model')

const createBrand = async (req, res)=>{
    try {
        const brand = new BrandSchema(req.body)
        await brand.save()
        res.status(200).json(brand)
    }
    catch(err)
    {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const fetchBrand = async (req, res)=>{
    try {
        const brands = await BrandSchema.find()
        res.status(200).json(brands)
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
    createBrand,
    fetchBrand
}