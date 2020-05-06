const mongoose = require('mongoose')

const Services = require('../models/Services')
const Image = require('../models/Image')

module.exports = {
    async create(req, res) {
        const {name, category, desc} = req.body
        const {originalname: imgName, size, key, location: url = ""} = req.file;
        try{    
            const image = await Image.create({imgName, size, key, url});
            const post = await Services.create({name:name, category:category, desc:desc, imageId: image._id});
            return res.json({post})

        }catch(e){
            return res.send({error: e})
        }
    },
    async index(req, res){
        const services = await Services.find().populate(['idImage']);
        return res.json(services)
    },
    async delete(req, res){
        const services = await Services.findById(req.params.id);
        const image = await Image.findById(catalogue.idImage);
        await image.remove();
        services.remove();
        return res.send()
    }
}