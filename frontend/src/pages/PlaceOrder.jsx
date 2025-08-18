import React, { useState } from 'react'
import Title from '../components/Title'
import Cart from './Cart'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

  const [method,setmethod] = useState(['cod']);
  const navigate = useNavigate();
  return (
    <div className='flex gap-4 pt-5'>
      {/* ..... Left Side .... */}
     <div className='flex flex-col gap-4 w-full'>
        <div className='text-xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        <div className='flex gap-3'> 
          <input type="text" placeholder='First Name' className='border bg-gray-100 rounded py-1.5 px-1.5' />
          <input type="text" placeholder='Last Name' className='border bg-gray-100 rounded py-1.5 px-1.5' />
        </div>
        <input type="email" placeholder='Email Address' className='border bg-gray-100 rounded py-1.5 px-1.5 w-100' />
        <input type="text" placeholder='Street' className='border bg-gray-100 rounded py-1.5 px-1.5 w-100' />
         <div className='flex gap-3'> 
          <input type="text" placeholder='City' className='border bg-gray-100 rounded py-1.5 px-1.5' />
          <input type="text" placeholder='State' className='border bg-gray-100 rounded py-1.5 px-1.5' />
        </div>
        <div className='flex gap-3'> 
          <input type="number" placeholder='Zipcode' className='border bg-gray-100 rounded py-1.5 px-1.5' />
          <input type="text" placeholder='Country' className='border bg-gray-100 rounded py-1.5 px-1.5' />
        </div>
        <input type="number" placeholder='Phone' className='border bg-gray-100 rounded py-1.5 px-1.5 w-100' />
     </div>
      {/* ....Right Side ... */}
      <div className='mt-8'>
        <div className='ml-30 w-100'>
          <CartTotal/>
        </div>
        <div className='mt-12 ml-30'>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          {/* Payment Method Selection */}
          <div className='flex gap-3 flex-col'>
             <div onClick={()=>setmethod('stripe')} className='flex items-center gap-3 border p-2 cursor-pointer px-3 w-150'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-300' : ''}`}></p>
                <img src={assets.stripe_logo} className='h-5 mx-4' alt="" />
             </div>
             <div onClick={()=>setmethod('razorpay')} className='flex items-center gap-3 border p-2 cursor-pointer px-3 w-150'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-300' : ''}`}></p>
                <img src={assets.razorpay_logo} className='h-5 mx-4' alt="" />
             </div>
             <div onClick={()=>setmethod('cod')} className='flex items-center gap-3 border p-2 cursor-pointer px-3 w-150'>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-300' : ''}`}></p>
                <p className='text-gray-700 text-sm  font-medium mx-4'>Cash On Delivery </p>
             </div>
          </div>
          <div className='w-150 text-end mt-8'>
            <button onClick={()=>navigate('/orders')} className='bg-black text-white m-5 p-3 w-100 cursor-pointer'>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder