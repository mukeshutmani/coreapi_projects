import React, { useState } from 'react'
import Wrapper from './Wrapper'
import Input from '../utils/Input'
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader/Loader'
import { registerUser } from '../store/user.slice'
import { useDispatch } from 'react-redux'





function Register() {

   const { register, handleSubmit, reset  } = useForm()
   const [error, setError] = useState(null)
   const navigate = useNavigate()
   const [loading, setLoading] = useState(false)
   
   const dispatch = useDispatch()
    
   
  //  console.log(error);
   
  
   const dataSubmit = async (data) => {

      if(!data) return <p>Invalid Data </p>
      
      setLoading(true)
      // console.log("data", data);
      
      setError(null)

      const formData = new FormData();

      formData.append('fullName', data.fullName);
      formData.append('username', data.username);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('avatar', data.avatar[0]);
      formData.append('coverImage', data.coverImage[0]);


    try {

      const response = await axios.post('/api/user/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      //  console.log(response);
       
       if(response) {
          dispatch(registerUser(response.data))
       }
      
      navigate('/my-profile')
       
       reset()
       return response
           
    } catch (error) {
       console.log(error);
      
        setError("Data Submit Error",error.message)        
       }
    finally {
      setLoading(false)
    }

   }
   
    return !loading ? (
      <Wrapper >
        <div className='bg-white/40 w-1/3  text-center p-8 rounded-lg'>
           <p className='text-2xl sm:text-1xl md:text-2xl lg:text-3xl xl:text-3xl font-bold text-gray-800'> Register User</p>
        <form 
          onSubmit={handleSubmit(dataSubmit)}
        >
           <div className='p-4 mt-2 space-y-4 '>

               <Input
               label="FullName"
               type="text"
               placeholder="Enter your fullname"
               className='rounded-sm w-full p-1 m-1 outline-none'
               required
               
               name="fullName"
               {...register('fullName', {
                required: true
               })}
               
               />


               <Input
               label="Username"
               type="text"
               placeholder="Enter your username"
               className='rounded-sm w-full p-1 m-1 outline-none'
               required
               minlength="5"
               maxlength="15"
               name="username"
               {...register('username', {
                required: true
               })}
              //  {...errors.username && <span className='text-red-800'> {errors.username.message} </span> }
               />


               <Input
               label="Email"
               type="email"
               placeholder="Enter your email"
               className='rounded-sm w-full p-1 m-1 outline-none'
               required
               name="email"
               {...register('email', {
                required: true
               })}

               />

               <Input
               label="Password"
               type="text"
               placeholder="Enter your passsword"
               className='rounded-sm w-full p-1 m-1 outline-none'
               required
               name="password"
               {...register('password', {
                required: true
               })}
               
               />


            <div className='flex flex-row '>
              <label 
              htmlFor="avatar"
              className='cursor-pointer rounded-full bg-gray-500 text-white px-4 py-2 ml-1'
              >
                Profile Picture 📸
              </label>
              <input 
              id='avatar'
              type="file"
              accept="image/*"
              className='hidden'

              name='avatar'
              {...register('avatar', {
                required: true
              })}
              // onChange={}

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
              name='coverImage'
              {...register('coverImage', {
                // required: true
              })}
            //  onChange={}
              />
            </div>

            
            <div className='flex '>

               <button
               type="submit"
               disabled={loading}
               className='bg-blue-500 w-1/2   text-white p-1 m-1   hover:bg-blue-600 rounded-md '
               > 
                {loading ? 'Submitting...' : 'Submit'}
               </button>

             <button
               type="button"
               onClick={()=> navigate('/login')}
               className='bg-blue-500 w-1/2  text-white p-1 m-1   hover:bg-blue-600 rounded-md '
               > 
               Sign In
               </button>
            </div>


           </div>
        </form>
        </div>
    </Wrapper>
  ) : <Wrapper>
     <div>
       <Loader />
     </div>
  </Wrapper>
}

export default Register