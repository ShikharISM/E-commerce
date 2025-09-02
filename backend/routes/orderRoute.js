import express from 'express'
import {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updatestatus,
    verifyStripe
} from '../controllers/orderController.js'
import AdminAuth from '../middleware/adminauth.js'
import authUser from '../middleware/auth.js'
import order from '../models/orderModel.js'

const orderRouter = express.Router()

//Admin features
orderRouter.post('/list',AdminAuth,allOrders) // admin panel need authentication middleware
orderRouter.post('/status',AdminAuth,updatestatus) // for the status for admin 

//Payment features
orderRouter.post('/place',authUser,placeOrder) // for COD
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

//User features
orderRouter.post('/userorders',authUser,userOrders)
orderRouter.post('/verifystripe',authUser,verifyStripe)

export default orderRouter