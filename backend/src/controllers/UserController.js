const mongoose = require("mongoose");

const User = require("../models/User");

module.exports = {
    async create(req, res) {
        const {user, email, password} = req.body
        try{
            const userCreate = await User.create({user:user, email:email, password:password});
            return res.send({userCreate})
        }catch(e){
            return res.status(400).send({error: "something went wrong"})
        }
    },
    async index(req, res) {
        const user = await User.find();
        return res.json(user)
    
    }
}