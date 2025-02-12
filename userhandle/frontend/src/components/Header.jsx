import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'


function Header({onlogOut}) {

  const navigate = useNavigate()
  const auth = useSelector((state) => state.user.userauth)
  
  

  // const handleLogin = () => {
  //   onlogOut()
  // }

  return (
   <header>
     <div className=' text-xl  w-full h-12 bg-gray-700 text-white fixed'>
        <div className=' pl-4 flex justify-between pt-1 '>
          <div className='flex pl-3 gap-4 cursor-pointer '>
            <Link to="/">
              <h1 className=' hover:underline'>
              uniconnect
              </h1>
            
            </Link>
            <Link to='/'>
              {auth && <p>All Posts</p>}
            </Link>

          { auth && <button 
            onClick={() => navigate("/my-profile")}
            className='text-1xl mb-2'>
              
                <p>
                  My Profile
                </p>
             
            </button> }
          </div>

          <nav >
            <ul className='flex gap-4 pr-10 cursor-pointer ' >

           { auth && <li className=' p-1 border-2 rounded-lg'>
                <button 
                onClick={() => onlogOut() }
                >
                  Logout
                </button>
              </li>}

             { auth && <li
              className=' p-1 border-2 rounded-lg'
              onClick={() => navigate("/home")}
              > Create Post </li> }

             { !auth && <li
              onClick={() => navigate("/login")}
              className=' p-1 border-2 rounded-lg'
              >Login</li> }

            { !auth && <li
              onClick={() => navigate("/register")}
              className=' p-1 border-2 rounded-lg'
              >Register</li>}

             { auth && <li
              onClick={() => navigate("/change-password")}
              className=' p-1 border-2 rounded-lg'
              > Change Password </li>}

            </ul>
          </nav>
        
        </div>
     </div>
   </header>
  )
}

export default Header