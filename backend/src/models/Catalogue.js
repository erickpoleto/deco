const mongoose = require('mongoose')

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
    images:[
        {
            name:{
                type:String,
            },
            url:{
                type:String
            },
            size: {
               type: Number,
            },
            key: {
                type: String
            }
        }
    ],
    createAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Catalogue', CatSchema);