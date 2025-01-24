import React from 'react'
import Wrapper from './Wrapper'
import Input from '../utils/Input'



function Register() {
  return (
      <Wrapper >

        <div className='bg-white/40 w-1/3  text-center p-8 rounded-lg'>
           <p className='text-2xl sm:text-1xl md:text-2xl lg:text-3xl xl:text-3xl font-bold text-gray-800'> Register User</p>
        <form >
           <div className='p-4 mt-2 space-y-4 '>

               <Input
               label="FullName"
               type="text"
               placeholder="Enter your fullname"
               className='rounded-sm w-full p-1 m-1 outline-none'
               required
               minlength="5"
               maxlength="40"
               
               />


               <Input
               label="Username"
               type="text"
               placeholder="Enter your username"
               className='rounded-sm w-full p-1 m-1 outline-none'
               required
               minlength="5"
               maxlength="15"
               />


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
               placeholder="Enter your passsword"
               className='rounded-sm w-full p-1 m-1 outline-none'
               required
               minlength="6"
               maxlength="15"
               
               />


            <div className='flex flex-row '>
              <label 
              htmlFor="profile"
              className='cursor-pointer rounded-full bg-gray-500 text-white px-4 py-2 ml-1'
              >
                Profile Picture 📸
              </label>
              <input 
              id='profile'
              type="file"
              accept="image/*"
              className='hidden'
              />


              <label 
              htmlFor="coverimage"
              className='cursor-pointer rounded-full bg-gray-500 text-white px-4 py-2 ml-1'
              >
                Cover Image 📸
              </label>
              <input 
              id='coverimage'
              type="file"
              accept="image/*"
              className='hidden'
              />
            </div>

            
            <div className='flex '>

               <button
               type="submit"
               className='bg-blue-500 w-1/2   text-white p-1 m-1   hover:bg-blue-600 rounded-md '
               > 
               Submit 
               </button>

               <button
               type="button"
               className='bg-blue-500 w-1/2  text-white p-1 m-1   hover:bg-blue-600 rounded-md '
               > 
               Sign In
               </button>
            </div>


           </div>
        </form>
        </div>
    </Wrapper>
  )
}

export default Register