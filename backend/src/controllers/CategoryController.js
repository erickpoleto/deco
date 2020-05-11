
const Category = require('../models/Category')
const StructCategory = require('../models/StructCategory')

module.exports = {
    async create(req, res){
        const {name} = req.body
        try{
            const category = await Category.create({name});
            return res.status(200).send(category);
        }catch(e){
            return res.json(e);
        }
    },

    async index(req, res){
        try{
            const category = await Category.find({});
            return res.json(category)
        }catch(e){
            return res.json(e);
        }
    },

    async createStruct(req, res) {
        const {name} = req.body
        try{
            const structCategory = await StructCategory.create({name})
            return res.json(structCategory);
        }catch(e){
            return res.json(e)
        }
    },
    async indexStruct(req, res) {
        try{
            const structCategory = await StructCategory.find({})
            return res.json(structCategory);
        }catch(e){
            return res.json(e)
        }
    }
}