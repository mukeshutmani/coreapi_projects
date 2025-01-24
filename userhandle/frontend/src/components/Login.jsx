import React from 'react'
import Wrapper from './Wrapper'
import Input from '../utils/Input'


function Login() {
  return (
    <Wrapper>
        <div className='bg-white/40 w-1/3 text-center p-6 rounded-lg'>
           <h1 className='font-bold text-2xl p-4'>Login Page</h1>
            <form >
            <div className='p-2 mt-2 space-y-4'  >

            <Input
               label="Email"
               type="email"
               placeholder="Enter your email"
               className='rounded-sm w-full p-1 m-1 outline-none'
               required
               />

            <Input
               label="Password"
               type="text"
               placeholder="Enter your email"
               className='rounded-sm w-full p-1 m-1 outline-none'
               required
               minlength="5"
               maxlength="15"
               />

               <div className='flex mt-4'>

               <button
               type="submit"
               className='bg-blue-500 w-1/2   text-white p-1 m-1   hover:bg-blue-600 rounded-md '
               > 
               Login 
               </button>

               <button
               type="button"
               className='bg-blue-500 w-1/2  text-white p-1 m-1   hover:bg-blue-600 rounded-md '
               > 
               Sign Up
               </button>
            </div>


            </div>
            </form>
        </div>
    </Wrapper>
  )
}

export default Login