import React, { useState } from 'react'
import Wrapper from './Wrapper'
import Input from '../utils/Input'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Login() {
   const navigate = useNavigate()
   const [inputValue, setInputValue] = useState({
      email:"",
      password:"",
   })
   
   const handleLogin = async (e) => {
      e.preventDefault();
      try {
          if(!inputValue.email || !inputValue.password) return null
          console.log(inputValue);
          
          const response = await axios.post('/api/user/login', inputValue);
          if(!response) return console.log('Serevr Error while fetching data ');
          
          console.log(response);
         
      } catch (error) {
         console.log(error);
         
         console.error("Login Error",error.response.data.message);
      }
   }


  return (
    <Wrapper>
        <div className='bg-white/40 w-1/3 text-center p-6 rounded-lg'>
           <h1 className='font-bold text-2xl p-4'>Login Page</h1>
         <form onSubmit={handleLogin} >
            <div className='p-2 mt-2 space-y-4'  >

            <Input
               label="Email"
               type="email"
               placeholder="Enter your email"
               className='rounded-sm w-full p-1 m-1 outline-none'
               required
               name="email"
               value={inputValue.email}
               onChange={(e) => setInputValue((prev) => (
                  {
                     ...prev,
                     email: e.target.value
                  }
               )) }
               />

            <Input
               label="Password"
               type="text"
               placeholder="Enter your email"
               className='rounded-sm w-full p-1 m-1 outline-none'
               required
                
               name="password"
               value={inputValue.password}
               onChange={(e) => setInputValue((prev) => (
                   {
                     ...prev,
                     password: e.target.value
                   }
               )) }
               

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
               onClick={() => navigate('/register')}
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