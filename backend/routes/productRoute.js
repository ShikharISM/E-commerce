import express from 'express'
import { addProduct, listProducts, removeProduct, singleProduct } from '../controllers/productController.js'
import upload from '../middleware/multer.js'
import AdminAuth from '../middleware/adminauth.js';

const productRouter = express.Router();

productRouter.post('/add',AdminAuth,upload.fields([{name: 'image1', maxCount: 1},{name: 'image2', maxCount: 1},{name: 'image3', maxCount: 1},{name: 'image4', maxCount: 1}]) ,addProduct);
productRouter.post('/remove',AdminAuth,removeProduct);
productRouter.post('/list',listProducts);
productRouter.post('/single',singleProduct);


export default productRouter