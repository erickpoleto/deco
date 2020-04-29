const express = require('express');
const authMiddleware = require("./middlewares/auth")

const userController = require('./controllers/UserController')
const imageController = require('./controllers/Image')

const routes = express.Router()
const multer = require('multer');
const multerConfig = require('./config/multer')

routes.post('/register', userController.create);
routes.get('/index', userController.index);

routes.post('/post', multer(multerConfig).single('file'), imageController.create)
routes.get('/images', imageController.index)
routes.delete('/deleteimages/:id', imageController.delete)

module.exports = (routes);