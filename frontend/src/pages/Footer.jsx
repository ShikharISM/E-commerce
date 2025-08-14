import React from 'react'
import { assets } from '../assets/assets'
const Footer = () => {
  return (
    <div>
        <div className='flex gap-14 my-10 mt-30 text-sm'>
            <div>
                <img src={assets.logo} className='mb-5 w-32' alt="" />
                <p className='w-full text-gray-800'>
                    Lorem ipsum dolor sit amet consectetur. 
                </p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>HOME</ul>
                 <ul className='flex flex-col gap-1 text-gray-600'>ABOUT</ul>
                  <ul className='flex flex-col gap-1 text-gray-600'>DELIVERY</ul>
                   <ul className='flex flex-col gap-1 text-gray-600'>PRIVACY POLICY</ul>
            </div>

        </div>

    </div>
  )
}

export default Footer