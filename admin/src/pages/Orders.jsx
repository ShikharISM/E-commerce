import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
const Orders = ({ token }) => {

  const [orders, setorders] = useState([])

  const fetchallorders = async () => {
    if (!token) return null
    try {

      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setorders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', {orderId, status: event.target.value}, {headers: {token}})
      if(response.data.success){
        await fetchallorders()
      }
    } catch (error) {
       console.log(error)
       toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchallorders()
  }, [token])

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          orders.map((order, index) => (
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5' key={index}>
              <img className='w-12' src={assets.parcel_icon} alt="" />
              <div>

                <div>{
                  order.items.map((item, idx) => {
                    if (index === order.items.length) {
                      return <p className='py-0.5' key={idx}>{item.name} x {item.quantity} <span>{item.size}</span></p>
                    }
                    else {
                      return <p className='py-0.5' key={idx}>{item.name} x {item.quantity} <span>{item.size} </span> , </p>
                    }
                  })
                }
                </div>
                <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                <div>
                  <p>{order.address.street + ","}</p>
                  <p>{order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.zipcode}</p>
                </div>
                <p>{order.address.phone}</p>
              </div>
              <div>
                <p className='text-sm'>Items: {order.items.length}</p>
                <p className='mt-3'>Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <p className='text-sm'>{'$'}{order.amount}</p>
              <select value={order.status} onChange={(e)=> statusHandler(e,order._id)} className='p-2 font-semibold'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

          ))
        }
      </div>
    </div>
  )
}

export default Orders