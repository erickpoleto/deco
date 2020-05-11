const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');

const ServicesSchema = new mongoose.Schema({
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
        type: String
    },
    imageId:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image',
            require: true
        }
    ],
    createAt: {
        type: Date,
        default: Date.now
    }
})

ServicesSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Services', ServicesSchema);