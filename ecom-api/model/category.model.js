const mongoose = require("mongoose")
const Schema = mongoose.Schema

const categorySchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    }
},{timestamps: true})

const CategorySchema = mongoose.model("Category", categorySchema)
module.exports = CategorySchema