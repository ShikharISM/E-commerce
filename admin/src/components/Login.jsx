import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App';
import { ToastContainer, toast } from 'react-toastify';

const Login = ({settoken}) => {

   const [email,setemail] = useState('');
   const [password,setpassword] = useState('');
  const onSubmitHandler = async (e) => {
    try {
    e.preventDefault();
    const response = await axios.post(backendUrl + '/api/user/admin',{email,password}); // will make a post request to the backend
    console.log(response.data)
    console.log(`${backendUrl}/api/user/admin`)
    if(response.data.success){
      settoken(response.data.token); // if the response is successful, we will set the token in the state
    } else{
        toast.error(response.data.message)
    }
    
    } catch (error) {
        // console.error(error);
        toast.error(error.message)
    }
  } 
    
  return (
    <div className='bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-20'>
       <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1> 
        <form onSubmit={onSubmitHandler}>
            <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                <input onChange={(e)=>{setemail(e.target.value)}} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@email.com' required />
            </div>
            <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                <input onChange={(e)=>{setpassword(e.target.value)}} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password " placeholder='Enter Your Password'/>
            </div>
            <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black cursor-pointer' type="submit">Login</button>
        </form>
    </div>

  )
}

export default Login