import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios'

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext)
  const [orderdata, setorderdata] = useState([])

  const loadOrderData = async () => {
    try {
      if (!token) return null
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, {
        headers: { token }
      })
      console.log(response.data)
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["date"] = order.date;
            item["paymentMethod"] = order.paymentMethod;
            allOrdersItem.push(item);
          });
        });
        setorderdata(allOrdersItem.reverse())
      }


    } catch (error) {

    }
  }
  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {
          orderdata.map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col items-center gap-4'>
              <div className='flex items-start gap-6'>
                <img src={item.image[0]} className='w-15' alt="" />
                <div>
                  <p className='font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-gray-700'>
                    <p>{currency}{item.price}</p>
                    <p>Quantity : {item.quantity}</p>
                    <p>Size : {item.size}</p>
                  </div>
                  <p className='mt-2'>Date: <span className='text-gray-400'> {new Date(item.date).toDateString()} </span></p>
                  <p className='mt-1'>Payment: <span className='text-gray-400'> {item.paymentMethod} </span></p>
                </div>
              </div>
              <div className='w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-400'></p>
                  <p className='text-sm'>{item.status}</p>
                </div>
                <button onClick={loadOrderData} className='border px-4 py-2 font-medium cursor-pointer'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders