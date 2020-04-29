const mongoose = require('mongoose')

const Image = require('../models/Image')

module.exports = {
    async create(req, res) {
        const {originalname: name, size, key, location: url = ""} = req.file;
        try{    
            const post = await Image.create({
                name,
                size,
                key,
                url,
            })
            return res.json(post)
        }catch(e){

            return res.send({error: "some error ocurred"})
        }
    },
    async index(req, res){
        const images = await Image.find();
        return res.json(images)
    },
    async delete(req, res){
        const images = await Image.findById(req.params.id);
        await images.remove();
        return res.send()
    }
}