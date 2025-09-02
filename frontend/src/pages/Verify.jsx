import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

// not a secured method to verify payment 
// original method is using Webhooks

const Verify = () => {

  const {token, setcartitems, backendUrl} = useContext(ShopContext)
  const [searchParams,setsearchParams] = useSearchParams()
  
  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')

  const navigate = useNavigate()
  const verifyPayment = async () =>{
    try {
        if(!token){
            return null
        }
        const response = await axios.post(backendUrl + '/api/order/verifystripe', {success,orderId} , {headers: {token}})

        if(response.data.success) {
            setcartitems({})
            navigate('/orders')
        }
        else{
            navigate('/cart')
        }

    } catch (error) {
        console.log(error)
        toast.error(error);

    }
  }

  useEffect(()=>{
    verifyPayment()
  },[token])

  return (
    <div>

    </div>
  )
}

export default Verify