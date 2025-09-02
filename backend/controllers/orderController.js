import order from "../models/orderModel.js"
import orderModel from "../models/orderModel.js"
import user from "../models/userModel.js"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const currency = 'inr'
const deliveryCharge = 10

// Place order using cash on Delivery 
const placeOrder = async(req,res) => {

    try {
        const {userId,items,amount,address} = req.body

        const orderData = {
            userId,
            items,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
            address,
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await user.findByIdAndUpdate(userId,{cartData: {}}) // after order is placed card will get empty
        res.json({success:true,message:"Order Placed"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message}) 
    }

}

//Verify Stripe 
const verifyStripe = async (req,res) => {
    const {orderId, success, userId} = req.body
    try {
        if(success === 'true'){
            await order.findByIdAndUpdate(orderId, {payment: true})
            await user.findByIdAndUpdate(userId, {cartData: {}})    
            res.json({success: true})
        }
        else{ // payment is failed
            await order.findByIdAndDelete(orderId)
            res.json({success:false})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message}) 
    }
}

// Place order using Stripe 
const placeOrderStripe = async(req,res) => {
   
    try {
        const {userId,items,amount,address} = req.body
        const { origin } = req.headers // 
        const orderData = {
            userId,
            items,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now(),
            address,
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: Math.round(item.price * 100) // Stripe expects amount in cents
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: deliveryCharge * 100 
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:  `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items: line_items,
            mode: 'payment',

        })

        return res.json({success:true,session_url: session.url})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message}) 
    }

}


// Place order using Razorpay
const placeOrderRazorpay = async(req,res) => {

}

//All Orders Data for admin panel  
const allOrders = async(req,res) => {
        try { 
            const orders = await orderModel.find({})
            res.json({success:true, orders})

        } catch (error) {
            console.log(error)
            res.json({success:false,message:error.message})
        }
}


// User order data for frontend
const userOrders = async(req,res)=>{

     try {
        const {userId} = req.body
        const orders = await orderModel.find({userId})
        res.json({success: true, orders})

     } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
     }

}

// update order status for admin panel
const updatestatus = async(req,res)=>{
 try {
    const {orderId, status} = req.body

    await orderModel.findByIdAndUpdate(orderId, {status})
    res.json({success:true, message: 'Status Updated..'})
 } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
 }
}

export {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updatestatus,
    verifyStripe,
}
