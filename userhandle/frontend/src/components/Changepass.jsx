import React from 'react'
import Wrapper from './Wrapper'
import Input from '../utils/Input'

function Changepass() {
  return (
    <Wrapper>
      <div className='bg-white/40 w-1/3 text-center p-6 rounded-lg'>
        <h1 className='font-bold text-2xl p-4'> Update New Password </h1>
        <form >
          <div className='p-2 mt-2 space-y-4'>

               <Input 
                 label="Old Password"
                 type="text"
                 placeholder="Enter your old password"
                 className='rounded-sm w-full p-1 m-1 outline-none'
                 required
                 minlength="5"
                 maxlength="15"
               />

               <Input 
                 label="New Password"
                 type="text"
                 placeholder="Enter your new password"
                 className='rounded-sm w-full p-1 m-1 outline-none'
                 required
                 minlength="5"
                 maxlength="15"
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