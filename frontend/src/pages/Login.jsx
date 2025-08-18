import React, { useState } from 'react'

const Login = () => {
   const [currentstate,setcurrentstate] = useState('Sign Up');
   const onSubmitHandler = async (e) =>{
        e.preventDefault();
   }
  return (
    <form onSubmit = {onSubmitHandler} className='flex flex-col items-center w-[90%] mt-14 gap-4 text-gray-700'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl'>{currentstate}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentstate==='Login' ? '' : <input type="text" className='w-full px-3 py-2 border border-gray-600' placeholder='Name' required/>}
      <input type="email" className='w-full px-3 py-2 border border-gray-600' placeholder='Email' required/>
      <input type="password" className='w-full px-3 py-2 border border-gray-600' placeholder='Password' required/>
      
      <div className='w-full flex justify-between text-sm'>
        <p className='cursor-pointer'>Forgot Your Password?</p>
        {
          currentstate === 'Login' ? <p onClick={()=>setcurrentstate('Sign Up')}> Create Account </p> : <p onClick={()=> setcurrentstate('Login')}>Login Here</p>
        }
      </div>
      <button className='bg-black text-white px-8 py-2 mt-4'>{currentstate==='Login' ? 'Sign In' : 'Sign Up'}</button>

    </form>
  )
}

export default Login