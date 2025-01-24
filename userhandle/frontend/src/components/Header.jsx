import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Header() {

  const navigate = useNavigate()
     
  return (
   <header>
     <div className=' text-xl  w-full h-12 bg-gray-700 text-white'>
        <div className=' pl-4 flex justify-between pt-1 '>
          <div className='flex pl-3 gap-4 cursor-pointer '>
            <Link to="/home">
              <h1 className=' hover:underline'>
              uniconnect
              </h1>
            
            </Link>
            <Link to='/home'>
              <p>Logo</p>
            </Link>

            <button 
            onClick={() => navigate("/my-profile")}
            className='text-1xl mb-2'>
              
                <p>
                  my profile
                </p>
             
            </button>
          </div>

          <nav >
            <ul className='flex gap-4 pr-10 cursor-pointer ' >

              <li className=' p-1 border-2 rounded-lg'>
                <button 
                onClick={() => navigate("/logout")}
                >
                  Logout
                </button>
              </li>

              <li
              className=' p-1 border-2 rounded-lg'
              onClick={() => navigate("/home")}
              > Home </li>

              <li
              onClick={() => navigate("/login")}
              className=' p-1 border-2 rounded-lg'
              >Login</li>

              <li
              onClick={() => navigate("/register")}
              className=' p-1 border-2 rounded-lg'
              >Register</li>

              <li
              onClick={() => navigate("/change-password")}
              className=' p-1 border-2 rounded-lg'
              > Change Password </li>

            </ul>
          </nav>
        
        </div>
     </div>
   </header>
  )
}

export default Header