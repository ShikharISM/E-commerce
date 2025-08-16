import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const Navigate = useNavigate();
  const {products,cartitems,currency,updateQuantity} = useContext(ShopContext);
  const [cartproducts,setcartproducts] = useState([]);

  useEffect(()=>{
    const tempdata = [];
    for(const items in cartitems){
      for(const item in cartitems[items]){
        if(cartitems[items][item] > 0){
          tempdata.push({
            _id:items,
            size:item,
            quantity:cartitems[items][item],
          })
        }
      }
    }
    setcartproducts(tempdata);
  },[cartitems])

  return (
    <div className='border-t pt-14'>
        <div className='text-2xl mb-3'>
          <Title text1={'YOUR'} text2={'CART'}/>
        </div>

        <div>
          {
            cartproducts.map((items,ind)=>{
              const productdata = products.find((prod)=> prod._id === items._id); // finding all the etails from products of the items added in cart
              return (
                <div key = {ind} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] items-center gap-4'>

                  <div className='flex items-start gap-4'>
                    <img src={productdata.image[0]} className='w-16' alt="" />
                    <div>
                       <p className='text-xs font-medium'>{productdata.name}</p>
                       <div className='flex items-center gap-5 mt-2'>
                         <p>{currency}{productdata.price}</p>
                         <p className='border w-5 bg-slate-50 text-center'>{items.size}</p>
                       </div>
                    </div>
                  </div>
                  <input onChange={(e)=>{updateQuantity(items._id,items.size,parseInt(e.target.value))}} className='border max-w-10 px-1 text-center cursor-pointer' type="number" min={1} defaultValue={items.quantity}/>
                  <img onClick={()=>updateQuantity(items._id,items.size,0)} src={assets.bin_icon} className='w-4 mr-4 cursor-pointer' alt="" />
                </div>
              )
            })
          }
        </div>

        <div className='flex justify-end my-20'>
           <div className='w-full'> 
            <CartTotal/>
           </div>
           <div className='w-full text-end'>
             <button onClick={()=>Navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3 cursor-pointer'> PROCEED TO CHECKOUT </button>
           </div>
        </div>

    </div>
  )
}

export default Cart