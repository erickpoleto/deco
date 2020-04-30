const mongoose = require('mongoose')

const Catalogue = require('../models/Catalogue')
const Image = require('../models/Image')

module.exports = {
    async create(req, res) {
        const {name, category, desc, tec} = req.body
        const {originalname: imgName, size, key, location: url = ""} = req.file;
        try{    
            const image = await Image.create({imgName, size, key, url});
            const post = await Catalogue.create({name:name, category:category, desc:desc, tec:tec, idImage: image._id});
            return res.json({post})

        }catch(e){
            return res.send({error: e})
        }
    },
    async index(req, res){
        const {page} = req.query
        try{
            const catalogue = await Catalogue.paginate({}, {populate:'idImage', page:page, limit: 10});
            return res.json(catalogue)
        }catch(e){
            return res.json({error: e})
        }
           
    },
    async indexProduct(req, res){
        const {id} = req.params
        try{
            const catalogue = await Catalogue.findById(id).populate(['idImage']);
            return res.json(catalogue)    
        }catch(e){
            return res.json({error: e})
        }
        
    },
    async delete(req, res){
        const catalogue = await Catalogue.findById(req.params.id);
        const image = await Image.findById(catalogue.idImage);
        await image.remove();
        catalogue.remove();
        return res.send()
    }
}