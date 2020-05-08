const express = require('express');

const userController = require('./controllers/UserController');
const sessionController = require('./controllers/SessionController');
const productController = require('./controllers/productController');
const categoryController = require('./controllers/CategoryController');
const commentsController = require('./controllers/CommentsController');


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

//product
routes.post('/newproduct', authMiddleware, productController.create)
routes.get('/products', productController.index)
routes.get('/product/:id', productController.indexProduct)
routes.delete('/deleteproduct', authMiddleware, productController.delete)

//createImages
routes.post('/createImages',multer(multerConfig).single('file'), authMiddleware, productController.createImages)

//category
routes.post('/newcategory', authMiddleware, categoryController.create)
routes.get('/indexcategory', categoryController.index)

//comments

routes.post('/newcomment', commentsController.create)
routes.get('/indexcomment/:id', commentsController.index)
routes.delete('/deletecomment/:id', commentsController.delete)

module.exports = (routes);