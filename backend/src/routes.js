const express = require('express');

const userController = require('./controllers/UserController');
const sessionController = require('./controllers/SessionController');
const catalogueController = require('./controllers/CatalogueController');


const routes = express.Router()
const multer = require('multer');
const multerConfig = require('./config/multer')

const authMiddleware = require("./middlewares/auth")
//user
routes.post('/register', userController.create);
routes.get('/index', userController.index);
routes.delete('/delete', userController.delete);
//session
routes.post('/session', sessionController.create);
//catalogue
routes.post('/createProduct', multer(multerConfig).single('file'), authMiddleware, catalogueController.create)
routes.post('/createImages', multer(multerConfig).single('file'), catalogueController.createImages)
routes.get('/products', catalogueController.index)
routes.get('/category', catalogueController.indexDistinct)
routes.get('/product/:id', catalogueController.indexProduct)
routes.delete('/deletecat/:id', authMiddleware, catalogueController.delete)

//services

module.exports = (routes);