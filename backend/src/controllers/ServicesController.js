const mongoose = require('mongoose')

const Service = require('../models/Services')
const Image = require('../models/Image')

module.exports = {
    async create(req, res) {

        const {name, category, desc, tec, imageId} = req.body

        try{    
            const service = await Service.create({name:name, category:category, desc:desc, tec:tec, imageId: imageId});
            return res.json(service)

        }catch(e){
            return res.send({error: e})
        }
    },
    async index(req, res){
        const {page} = req.query
        try{
            const service = await Service.paginate({}, {populate:['imageId'], page:page, limit: 12});
            return res.json(service)
        }catch(e){
            return res.json({error: e})
        }
           
    },
    async indexService(req, res){
        const {id} = req.params
        try{
            const service = await Service.findById(id).populate(['imageId', "commentsId"]);
            return res.json(service)    
        }catch(e){
            return res.json({error: e})
        }
        
    },
    async delete(req, res){
        const services = await Services.findById(req.params.id);
        const image = await Image.findById(catalogue.idImage);
        await image.remove();
        services.remove();
        return res.send()
    }
}