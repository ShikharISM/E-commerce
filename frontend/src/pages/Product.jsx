import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const Product = () => {
  const {productId} = useParams();
  const {products, currency,addtocart} = useContext(ShopContext);
  const [productdata,setproductdata] = useState(false);
  const [image, setimage] = useState('');
  const [size,setsize] = useState('');

  const fetchproductdata = async () => {
    products.map((item)=>{
      if(item._id === productId){
        setproductdata(item);
        setimage(item.image[0]);
        console.log(item);
      }
    })
  }
  useEffect(()=>{
   fetchproductdata();
  },[productId,products]);

  return productdata ? (
    //UI for Displaying Product Data
  <>  
  <div className="flex gap-6 items-start">
  {/* Thumbnails (Left side) */}
  <div className="flex flex-col gap-3">
    {productdata.image.map((item, index) => (
      <img
        onClick={() => setimage(item)}
        key={index}
        src={item}
        className={`w-20 h-20 object-cover rounded-lg border cursor-pointer hover:opacity-80 ${
          image === item ? "border-blue-500" : ""
        }`}
        alt={`Thumbnail ${index}`}
      />
    ))}
  </div>

  {/* Main Image (Medium size) */}
  <div className="flex-1 max-w-md">
    <img
      src={image}
      className="w-full h-auto rounded-lg border"
      alt="Main product"
    />
  </div>
  <div className='flex-1'>
   <h1 className='font-medium text-2xl mt-2'>{productdata.name}</h1>
   <div className='flex items-center gap-1 mt-2'>
    <img src={assets.star_icon} alt="" className="w-3 5" />
    <img src={assets.star_icon} alt="" className="w-3 5" />
    <img src={assets.star_icon} alt="" className="w-3 5" />
    <img src={assets.star_icon} alt="" className="w-3 5" />
    <img src={assets.star_dull_icon} alt="" className="w-3 5" />
    <p className='pl-2'>(122)</p>
   </div>
   <p className='mt-5 text-3xl font-medium'>{currency}{productdata.price}</p>
   <p className='mt-5 text-gray-700'>{productdata.description}</p>
   <div className='flex flex-col gap-4 my-8'>
     <p>Select Size</p>
     <div className='flex gap-2'>
      {
        productdata.sizes.map((item,index)=>(
          <button onClick={() => setsize(item)} className={`border py-2 px-4 bg-gray-100 cursor-pointer ${item === size ? 'border-orange-700' : ''}`} key={index}>{item}</button>
        ))
      }
     </div>
   </div>
   <button onClick={()=>addtocart(productdata._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer'>ADD TO CART</button>
   <hr className='my-5'/>
  </div>
  
 </div>
  {/* Description and Review Section */}
  <div className='mt-20'>
    <div className='flex'>
      <b className='border px-5 py-3 text-sm'>Description</b>
      <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
    </div>
    <div className='flex flex-col gap-4 border-1 px-6 py-6 text-sm text-gray-700'>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, aliquam.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic, impedit explicabo.</p>

    </div>
  </div>

  </>
  ) : <div className='opacity-0'> </div>
}

export default Product