import React from 'react'
import Wrapper from './Wrapper'
import Profile from './Profile'


function Home() {
  return (
    
    <div className=' bg-gray-500 '>
      <div className='grid md:grid-cols-4 '>
         <Profile />
         <Profile />
         <Profile />
         <Profile />
         <Profile />
         
      </div>

    </div>
  
    
  )
}

export default Home