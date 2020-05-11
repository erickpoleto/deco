const mongoose = require('mongoose')

const Product = require('../models/Product')
const Image = require('../models/Image')

module.exports = {

    async create(req, res) {

        const {name, category, desc, tec, imageId} = req.body

        try{    
            const product = await Product.create({name:name, category:category, desc:desc, tec:tec, imageId: imageId});
            return res.json(product)

        }catch(e){
            return res.send({error: e})
        }
    },
    async productUpdate(req,res) {
        const {id} = req.params
        const {imageId} = req.body;
       try{
            const product = await Product.findByIdAndUpdate(id, {$set:{imageId: imageId}});
            return res.send(product);
        }catch(e){
            return res.status(400).send(e)
        }
    }
    ,
    async index(req, res){
        const {page} = req.query
        try{
            const product = await Product.paginate({}, {populate:['imageId', 'commentsId'], page:page, limit: 12});
            return res.json(product)
        }catch(e){
            return res.json({error: e})
        }
           
    },

    async indexProduct(req, res){
        const {id} = req.params
        try{
            const product = await Product.findById(id).populate(['imageId', "commentsId"]);
            return res.json(product)    
        }catch(e){
            return res.json({error: e})
        }
        
    },

    async delete(req, res){

        const product = await Product.deleteMany({});
        return res.send()
    }
}