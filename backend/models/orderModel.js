import mongoose, { Schema } from 'mongoose'

const orderSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    items: {
        type: Array,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    address: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipcode: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true }
    },
    status: {
        type: String,
        required: true,
        default: 'Order Placed'
    },
    paymentMethod: {
        type: String,
        required: true
    },
    payment: {
        type: Boolean,
        required: true,
        default: false,
    },
    date: {
        type: Number,
        required: true
    }

}, { timestamps: true })

const order = mongoose.model('order', orderSchema)
export default order