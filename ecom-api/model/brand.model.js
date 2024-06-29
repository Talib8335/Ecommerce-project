const mongoose = require("mongoose")
const Schema = mongoose.Schema

const brandSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    }
},{timestamps: true})

const BrandSchema = mongoose.model("brand", brandSchema)
module.exports = BrandSchema