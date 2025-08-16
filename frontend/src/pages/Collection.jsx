import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'; 

const Collection = () => {
  const { products,search,setsearch} = useContext(ShopContext);
  const [showFilter, setshowFilter] = useState(false);
  const [filterProducts,setfilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subcategory,setSubCategory] = useState([]);
  const [sorttype,setsorttype] = useState('relevant');
  
  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){ // category clicked is already set then unset it
    setCategory(prev => prev.filter(item => item!=e.target.value)); 
    }
    else{ //category not already there 
      setCategory(prev => [...prev,e.target.value]); // add the category into the category array 
    }
  }

  const toggleSubCategory = (e) => {
    if(subcategory.includes(e.target.value)){ // subcategory clicked is already set then unset it
    setSubCategory(prev => prev.filter(item => item!=e.target.value)); 
    }
    else{ //category not already there 
      setSubCategory(prev => [...prev,e.target.value]); // add the subcategory into the category array using spread operator  
    }
  }

  const onsortchange = (e) =>{
    setsorttype(e.target.value);
  }

useEffect(() => {
  let filtered = products.slice();

  // Apply category filter
  if (category.length > 0) {
    filtered = filtered.filter(item => category.includes(item.category));
  }

  // Apply subcategory filter
  if (subcategory.length > 0) {
    filtered = filtered.filter(item => subcategory.includes(item.subCategory));
  }

  // Apply sorting
  if (sorttype === 'low-high') {
    filtered = filtered.sort((a, b) => a.price - b.price);
  } else if (sorttype === 'high-low') {
    filtered = filtered.sort((a, b) => b.price - a.price);
  }

  if(search){
    filtered = filtered.filter((item)=> item.name.toLowerCase().includes(search.toLowerCase()));
  }
   
  setfilterProducts(filtered);
}, [category, subcategory, sorttype, products,search]); 

  useEffect(()=>{
    console.log(products);
    setfilterProducts(products);
  },[])

  return (
    <>
      {/* Main container for side-by-side layout */}
      <div className="flex gap-6 pt-10 border-t">
        
        {/* Left Side: Filters */}
        <div className="w-60 flex-shrink-0">
          <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
            Filters
          </p>

          {/* Category Filters */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? 'hidden' : ''}`}>
            <p className="mb-3 text-sm font-medium">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input className="w-3" type="checkbox" value="Men" onChange={toggleCategory}/> Men
              </p>
              <p className="flex gap-2">
                <input className="w-3" type="checkbox" value="Women" onChange={toggleCategory}/> Women
              </p>
              <p className="flex gap-2">
                <input className="w-3" type="checkbox" value="Kids" onChange={toggleCategory}/> Kids
              </p>
            </div>
          </div>

          {/* Subcategory Filters */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? 'hidden' : ''}`}>
            <p className="mb-3 text-sm font-medium">TYPE</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input className="w-3" type="checkbox" value="Topwear" onClick={toggleSubCategory}/> Topwear
              </p>
              <p className="flex gap-2">
                <input className="w-3" type="checkbox" value="Bottomwear"  onClick={toggleSubCategory} /> Bottomwear
              </p>
              <p className="flex gap-2">
                <input className="w-3" type="checkbox" value="Winterwear" onClick={toggleSubCategory} /> Winterwear
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Collections */}
        <div className="flex-1">
          <div className="flex justify-between text-base mb-10">
            <Title text1="ALL" text2="COLLECTIONS" />
            {/*Product Sort*/}
            <select onChange={onsortchange} className='border-2 border-gray-300 px-2 text-sm'>
              <option value="relavant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>
          {/* You can render products here */}
          <div className='grid grid-cols-4 gap-4 gap-y-6'>
            {
              filterProducts.map((item,ind)=>(
                <ProductItem  key={ind}  name = {item.name} id = {item._id} price = {item.price} image = {item.image}/>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Collection
