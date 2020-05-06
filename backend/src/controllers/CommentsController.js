
const Comments = require('../models/Comments')
const Product = require('../models/Product')

module.exports = {
    async create(req, res){
        const {username, email, comment, productId} = req.body;
        try{
            const comments = await Comments.create({username, email, comment, productId});
            const products = await Product.findById(productId);

            products.commentsId.push(comments._id)
            await products.save()
            return res.json(products, comments)
        }catch(e){
            return res.json(e)
        }
    },
    async index(req, res){
        try{
            const comment = await Comments.find({})
            return res.json(comment)
        }catch(e){
            return res.json(e)
        }
    }
}