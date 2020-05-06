
const Category = require('../models/Category')

module.exports = {
    async create(req, res){
        const {name} = req.body
        try{
            const category = await Category.create({name});
            return res.json(category);
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
    }
}