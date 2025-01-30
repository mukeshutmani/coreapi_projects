import React, { useState } from 'react'
import Wrapper from './Wrapper'
import Input from '../utils/Input'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Loader from './Loader/Loader';
import { registerUser, setAuth } from '../store/user.slice';
import { useDispatch } from 'react-redux';


function Login() {
   const navigate = useNavigate()
   const [error, setError] = useState(null)
   const [loader, setLoader] = useState(false)
   const dispatch = useDispatch()


   const [inputValue, setInputValue] = useState({
      email:"",
      password:"",
   })
   



   const handleLogin = async (e) => {

      e.preventDefault();

      setLoader(true)
      setError(null)

      try {

          if(!inputValue.email || !inputValue.password) return null
       
          const response = await axios.post('/api/user/login', inputValue);
          if(response) {
             dispatch(registerUser(response.data))
          }
          
          dispatch(setAuth(true))

          setInputValue({email: '', password: ''})
          navigate('/my-profile')
          return response

      } catch (error) {
         setError(error.response.data.message) 

      } finally {
         setLoader(false)
      }
   }




  return !loader ? (
    <Wrapper>
        <div className='bg-white/40 w-1/3 text-center p-6 rounded-lg'>
           <h1 className='font-bold text-2xl p-4'>Login Page</h1>
         <form onSubmit={handleLogin} >
            <div className='p-2 mt-2 space-y-4'  >
                {error ? 
                <p className='text-red-700 '> {error} </p> 
                : <p className='invisible'>Error</p>}
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
  ) : <Wrapper> <div> <Loader /> </div> </Wrapper>
}

export default Login