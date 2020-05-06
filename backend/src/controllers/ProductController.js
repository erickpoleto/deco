const mongoose = require('mongoose')

const Product = require('../models/Product')
const Image = require('../models/Image')

module.exports = {

    async create(req, res) {

        const {name, category, desc, tec} = req.body
        const {originalname: imgName, size, key, location: url = ""} = req.file;

        try{    
            const image = await Image.create({imgName, size, key, url});
            const product = await Product.create({name:name, category:category, desc:desc, tec:tec, imageId: image._id});
            return res.json({product})

        }catch(e){
            return res.send({error: e})
        }
    },

    async createImages(req, res) {
        const {id} = req.body
        const {originalname: imgName, size, key, location: url = ""} = req.file;
        try{    
            const image = await Image.create({imgName, size, key, url});
            const product = await Product.findById(id, (err, product) => {
                product.idImage.push(image._id),
                product.save()
                return res.json(product)
            });

        }catch(e){
            return res.send({error: e})
        }
    },
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
        const product = await Product.find({});
        const image = await Image.findById(product.imageId);
        await image.remove();
        await product.remove();
        return res.send()
    }
}