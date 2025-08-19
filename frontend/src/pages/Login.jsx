import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'

const Login = () => {
   const [currentstate,setcurrentstate] = useState('Login');
   
   const {token,settoken,backendUrl} = useContext(ShopContext)

   const navigate = useNavigate();

   const [name,setname] = useState('')
   const [password,setpassword] = useState('')
   const [email,setemail] = useState('')

   const onSubmitHandler = async (e) =>{
      e.preventDefault();
      try {
        if(currentstate === 'Sign Up'){
            // will call the signup API
            const response = await axios.post(backendUrl + '/api/user/register', {name,email,password})
            if(response.data.sucess){
                settoken(response.data.token)
                localStorage.setItem('token',response.data.token)
            } else{
              toast.error(response.data.message)
            }
        }
        else{
            // will call the Login API
          const response = await axios.post(backendUrl + '/api/user/login',{email,password})
          console.log(response.data)
          if(response.data.success){
              settoken(response.data.token)
              localStorage.setItem('token',response.data.token)
          }
          else{
            toast.error(response.data.message)
          }
        }
      } catch (error) {
         console.log(error)
         toast.error(error.message)
      }
   }

   useEffect(()=>{
     if(token){
      navigate('/')
     }
   },[token])

  return (
    <form onSubmit = {onSubmitHandler} className='flex flex-col items-center w-[90%] mt-14 gap-4 text-gray-700'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl'>{currentstate}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentstate==='Login' ? '' : <input value={name} onChange={(e)=> {setname(e.target.value)}} type="text" className='w-full px-3 py-2 border border-gray-600' placeholder='Name' required/>}
      <input value={email} onChange={(e)=> {setemail(e.target.value)}} type="email" className='w-full px-3 py-2 border border-gray-600' placeholder='Email' required/>
      <input value={password} onChange={(e)=> {setpassword(e.target.value)}} type="password" className='w-full px-3 py-2 border border-gray-600' placeholder='Password' required/>
      
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