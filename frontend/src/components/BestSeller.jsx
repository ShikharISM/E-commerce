import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';
import Title from './Title';
const BestSeller = () => {

    const { products } = useContext(ShopContext);
    const [ bestSellerProd, setbestSellerProd ] = useState([]);

   useEffect(() => {
        setbestSellerProd(
            products
                .filter(item => item.bestseller) // keep only bestsellers
                .slice(0, 10) // take first 10
        );
    }, []);

    return (
        <div className='my-10'>
            <div className='text-center py-8'>
                <Title text1={'BESTSELLERS'} text2 = {''} />
                {/* <p className='w-3/4 text-gray-800'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi quas odit, error eos eum sapiente in aspernatur explicabo dolor voluptatem.
                </p> */}
            </div>
            <div className='grid grid-cols-5 gap-4 gap-y-6'>

                {
                    bestSellerProd.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }

            </div>

        </div>
    )
}

export default BestSeller