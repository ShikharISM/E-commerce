import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { backendUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({token}) => {
 
 const [image1,setimage1] = useState(false);
 const [image2,setimage2] = useState(false);
 const [image3,setimage3] = useState(false);
 const [image4,setimage4] = useState(false);
 const [name,setname] = useState('')
 const [description, setdescription] = useState('')
 const [price,setprice] = useState('')
 const [category,setcategory] = useState('')
 const [subcategory,setsubcategory] = useState('')
 const [bestseller,setbestseller] = useState(false);
 const [sizes, setsizes] = useState([])

 const onSubmitHandler = async (e) => {
   try {
     e.preventDefault();
     const formData = new FormData()
     formData.append('name',name)
     formData.append('description',description)
     formData.append('category',category)
     formData.append('subCategory',subcategory)
     formData.append('price', price)
     formData.append('bestseller', bestseller ? "true" : "false")
     formData.append('sizes', JSON.stringify(sizes))
     image1 && formData.append('image1', image1)
     image2 && formData.append('image2', image2)
     image3 && formData.append('image3', image3)
     image4 && formData.append('image4', image4)
     
     const response = await axios.post(backendUrl + '/api/product/add', formData, {headers: {token}})

     console.log(response.data)

     if(response.data.success){
        setimage1(false);
        setimage2(false);
        setimage3(false);
        setimage4(false);
        setname('');
        setdescription('');
        setprice('');
        setcategory('');
        setsubcategory('');
        setsizes([]);
        toast.success(response.data.message)
     }
     else{
        toast.error(response.data.message)
     }

   } catch (error) {
    console.error(error)
    toast.error(error.message)
   }
 }

  return (
   <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
    <div>
      <p className='mb-2'>Upload Image</p>
      <div className='flex gap-2'>
        <label htmlFor="image1">
          <img className = 'w-20' src={!image1 ? assets.upload_area  : URL.createObjectURL(image1)} alt="" />
          <input onChange={(e)=>setimage1(e.target.files[0])}  type="file" id = "image1" hidden/>
        </label>
        <label htmlFor="image2">
          <img className = 'w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
          <input onChange={(e)=>setimage2(e.target.files[0])} type="file" id = "image2" hidden/>
        </label>
        <label htmlFor="image3">
          <img className = 'w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
          <input onChange={(e)=>setimage3(e.target.files[0])} type="file" id = "image3" hidden/>
        </label>
        <label htmlFor="image4">
          <img className = 'w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
          <input onChange={(e)=>setimage4(e.target.files[0])} type="file" id = "image4" hidden/>
        </label>
      </div>
    </div>
    <div className='w-full'>
      <p className='mb-2'>Product Name</p>
      <input onChange={(e)=>setname(e.target.value)} value={name} className='w-full px-3 py-2 border' type="text" placeholder='Type Here' required/>
    </div>
     <div className='w-full'>
      <p className='mb-2'>Product Description</p>
      <textarea onChange={(e)=>setdescription(e.target.value)} value={description} className='w-full px-3 py-2 border' type="text" placeholder='Write Content Here' required/>
    </div>
    <div className='flex flex-col gap-2 w-full'>
      <div>
        <p className='mb-2'>Product Category</p>
        <select value={category} onChange={(e)=>setcategory(e.target.value)} className='w-full px-3 py-2 border'>
          <option value="">Select Category</option>  {/* default empty option */}
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>
      <div>
        <p className='mb-2'>Sub Category</p>
        <select value={subcategory} onChange={(e)=>setsubcategory(e.target.value)} className='w-full px-3 py-2 border'>
          <option value="">Select Subcategory</option>
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Winterwear">Winterwear</option>
        </select>
      </div>
      <div>
        <p className='mb-2'>Product Price</p>
        <input onChange={(e)=>setprice(e.target.value)} className='w-full px-3 py-2 border' type="number" placeholder='25'/>
      </div>
    </div>
    <div>
      <p className='mb-2'>Product Sizes</p>
      <div className='flex gap-3'>
        <div onClick={(e)=> setsizes(prev=> prev.includes("M") ? prev.filter((item)=>item!=="M") : [...prev,"M"])}>
          <p className={` ${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
        </div>
        <div onClick={(e)=> setsizes(prev=> prev.includes("S") ? prev.filter((item)=>item!=="S") : [...prev,"S"])}>
          <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
        </div>
       <div onClick={(e)=> setsizes(prev=> prev.includes("L") ? prev.filter((item)=>item!=="L") : [...prev,"L"])}>
          <p className={` ${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
        </div>
       <div onClick={(e)=> setsizes(prev=> prev.includes("XL") ? prev.filter((item)=>item!=="XL") : [...prev,"XL"])}> 
         <p className={` ${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
        </div>
        <div onClick={(e)=> setsizes(prev=> prev.includes("XXL") ? prev.filter((item)=>item!=="XXL") : [...prev,"XXL"])}> 
         <p className={` ${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
        </div>
      </div>
    </div>

    <div className='flex gap-2 mt-2'>
      <input onChange={(e)=>setbestseller(prev=>!prev)} type="checkbox" id = "bestseller" checked = {bestseller} />
      <label className='cursor-pointer' htmlFor="bestseller">Add To Bestseller</label>
    </div>
    <button type='submit' className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
   </form>
  )
}

export default Add