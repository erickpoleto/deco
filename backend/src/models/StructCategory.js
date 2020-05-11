const mongoose = require('mongoose')

const StructCategorySchema = new mongoose.Schema({
    name: {
        type : String,
        required: true,
        unique: true
    },

    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('StructCategory', StructCategorySchema);