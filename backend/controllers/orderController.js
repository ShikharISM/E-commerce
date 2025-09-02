import orderModel from "../models/orderModel.js"
import user from "../models/userModel.js"
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

// Place order using Stripe 
const placeOrderStripe = async(req,res) => {

}


// Place order using Razorpay
const placeOrderRazorpay = async(req,res) => {

}

//All Orders Data for admin panel  
const allOrders = async(req,res) => {

}


// User order data for frontend
const userOrders = async(req,res)=>{

}

// update order status for admin panel
const updatestatus = async(req,res)=>{

}

export {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updatestatus
}
