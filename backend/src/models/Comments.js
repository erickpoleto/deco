const mongoose = require('mongoose')

const CommentsSchema = new mongoose.Schema({
    
    username: {
        type : String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Comments', CommentsSchema);