const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');

const ProductSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true
    },
    tec: {
        type: String,
        required: true
    },
    imageId:[
        {   
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image',
            require: true
        }
    ],
    commentsId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comments'
        }
    ],
    createAt: {
        type: Date,
        default: Date.now
    }
})

ProductSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Product', ProductSchema);