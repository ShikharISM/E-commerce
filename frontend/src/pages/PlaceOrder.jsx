import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import Cart from './Cart'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'


const PlaceOrder = () => {

  const {
      products,
      currency,
      delivery_fee,
      search,
      searchvisible,
      setsearch,
      setsearchvisible,
      cartitems,
      setcartitems,
      addtocart,
      updateQuantity,
      getcartcount,
      getCartAmount,
      token,
      settoken,
      userId,
      backendUrl,
    } = useContext(ShopContext)

  const [method,setmethod] = useState('cod')
  const [formdata,setformdata] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  const navigate = useNavigate()

  const onchangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setformdata(data => ({...data,[name]: value}))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      let orderItems = []
      for(const items in cartitems){
        for(const item in cartitems[items]){
          if(cartitems[items][item] > 0){
            const itemInfo = structuredClone(products.find(product=>product._id === items))
            if(itemInfo){
              itemInfo.size = item
              itemInfo.quantity = cartitems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formdata,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch(method){
        //API calls for COD
        case 'cod': {
           const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: {
            token: token || localStorage.getItem('token')
           }})
           console.log("Place order response:", response.data);
           if(response.data.success){
            setcartitems({})
            navigate('/orders')
           }
           else{
            toast.error(response.data.message)
           }
           break;
        }

        default:
          break
      }
      
      } catch (error) {
        console.error("Error placing order:", error.response ? error.response.data : error.message);
        toast.error("Failed to place order"); 
      }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex gap-4 pt-5'>
      {/* ..... Left Side .... */}
     <div className='flex flex-col gap-4 w-full'>
        <div className='text-xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        <div className='flex gap-3'> 
          <input required onChange={onchangeHandler} name='firstName' value={formdata.firstName} type="text" placeholder='First Name' className='border bg-gray-100 rounded py-1.5 px-1.5' />
          <input required onChange={onchangeHandler} name='lastName' value={formdata.lastName} type="text" placeholder='Last Name' className='border bg-gray-100 rounded py-1.5 px-1.5' />
        </div>
        <input required onChange={onchangeHandler} name='email' value={formdata.email} type="email" placeholder='Email Address' className='border bg-gray-100 rounded py-1.5 px-1.5 w-100' />
        <input required onChange={onchangeHandler} name='street' value={formdata.street} type="text" placeholder='Street' className='border bg-gray-100 rounded py-1.5 px-1.5 w-100' />
         <div className='flex gap-3'> 
          <input required onChange={onchangeHandler} name='city' value={formdata.city} type="text" placeholder='City' className='border bg-gray-100 rounded py-1.5 px-1.5' />
          <input required onChange={onchangeHandler} name='state' value={formdata.state} type="text" placeholder='State' className='border bg-gray-100 rounded py-1.5 px-1.5' />
        </div>
        <div className='flex gap-3'> 
          <input required onChange={onchangeHandler} name='zipcode' value={formdata.zipcode} type="number" placeholder='Zipcode' className='border bg-gray-100 rounded py-1.5 px-1.5' />
          <input required onChange={onchangeHandler} name='country' value={formdata.country} type="text" placeholder='Country' className='border bg-gray-100 rounded py-1.5 px-1.5' />
        </div>
        <input required onChange={onchangeHandler} name='phone' value={formdata.phone} type="number" placeholder='Phone' className='border bg-gray-100 rounded py-1.5 px-1.5 w-100' />
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
            <button type='submit' className='bg-black text-white m-5 p-3 w-100 cursor-pointer'>Place Order</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder