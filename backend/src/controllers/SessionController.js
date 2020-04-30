const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/User')

const tokens = require('../modules/token')

module.exports = {
    async create(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({email}).select('+password');
        if(!user){
            return res.status(400).send({error: "user not found"})
        }
        if(!await bcrypt.compare(password, user.password)){
            return res.status(400).send({error: "password invalid"})
        }
        user.password = undefined

        return res.send({ user, 
            token: tokens.token({id: user.id}) 
        });
    }
}