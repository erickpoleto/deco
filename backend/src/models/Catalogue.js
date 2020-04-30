const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');

const CatSchema = new mongoose.Schema({
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
    idImage:[
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

CatSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Catalogue', CatSchema);