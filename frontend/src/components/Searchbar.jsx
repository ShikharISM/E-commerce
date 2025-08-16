import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const Searchbar = () => {
  const location = useLocation();
  const [visible,setvisible] = useState(false); 
  useEffect(()=>{
      if(location.pathname.includes('collection')){
        setvisible(true);
      }
      else{
        setvisible(false);
      }
},[location])
  const {search, setsearch,searchvisible,setsearchvisible} = useContext(ShopContext);
  return searchvisible && visible ? (
    <div className='border-t border-b bg-gray-50 text-center'>
      <div className='inline-flex items-center justify-center border-gray-700 px-5 py-2 my-5 mx-3 rounded-full w-3/4'>
        <input type="search" onChange={(e)=> setsearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' value={search} placeholder='Search'/>
        <img src={assets.search_icon} className='w-3' alt="" />
      </div>
      <img src={assets.cross_icon} className='inline w-3 cursor-pointer' onClick={() => setsearchvisible(false)} alt="" />
    </div>
  ) : null
}

export default Searchbar