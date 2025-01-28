import React, { useState } from 'react'
import Wrapper from './Wrapper'
import Input from '../utils/Input'
import {useForm} from "react-hook-form"
import axios from 'axios'

function Changepass() {
   
  const { register, handleSubmit, reset} = useForm()
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)


  const changePassword = async(data) => {

          setMessage(null)
          console.log("Input Data",data);

          if(!data) return setMessage("required Input Fields")

          try {
              
              const response = await axios.post('/api/user/change-password', data)
              console.log(response.data.message);
              setMessage(response.data.message)
              return response

          } catch (error) {
             setMessage(error.response.data.message)
             console.log(error);

          } finally {
             reset()
          }
  }

  return (
    <Wrapper>
      <div className='bg-white/40 w-1/3 text-center p-6 rounded-lg'>
        <h1 className='font-bold text-2xl p-4'> Update New Password </h1>
          
        <form  onSubmit={handleSubmit(changePassword)}>

            {message ? 
                <p className='text-red-700 '> 
                {message} </p> 
                : <p className='invisible'>
                  Error
            </p> }

            {

            }

          <div className='p-2 mt-2 space-y-4'>

               <Input 
                 label="Old Password"
                 type="text"
                 placeholder="Enter your old password"
                 className='rounded-sm w-full p-1 m-1 outline-none'
                 required

                 name='oldPassword'
                 {...register("oldPassword", {
                  required:true
                 })}
                 
               />

               <Input 
                 label="New Password"
                 type="text"
                 placeholder="Enter your new password"
                 className='rounded-sm w-full p-1 m-1 outline-none'
                 required

                 name='newPassword'
                 {...register("newPassword", {
                  required: true
                 })}

               />

              <button
               type="submit"
               className='bg-blue-500 w-1/2   text-white p-1 mt-1   hover:bg-blue-600 rounded-md '
               > 
               Update
               </button>

          </div>
        </form>
      </div>

    </Wrapper>
  )
}

export default Changepass