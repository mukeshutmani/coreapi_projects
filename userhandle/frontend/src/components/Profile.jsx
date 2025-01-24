import React from 'react'
import Wrapper from './Wrapper'


function Profile() {
  return (
      <Wrapper>
        <div className='bg-white w-64 h-80 shadow-lg rounded-lg overflow-hidden flex flex-col items-center'>
             <div className='w-full h-24 bg-cover bg-center'
             style={{backgroundImage: `url(${'https://images.pexels.com/photos/30334299/pexels-photo-30334299/free-photo-of-elegant-woman-in-hijab-leaning-against-urban-wall.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'})`}}
             >
             </div>

             <div className=' absolute mt-12 '>
                <img 
                className='w-24 h-24 rounded-full border-2 '
                src="https://images.pexels.com/photos/6674100/pexels-photo-6674100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Profile" 
                />
             </div>

             <div className='text-center mt-16'>
                 <h3 className='text-lg font-semibold'>
                    Raj Kumar
                 </h3>
                 <p className='text-gray-500'>
                     @rajkumar67
                 </p>
             </div>

             <button className='mt-4 px-6 py-2 text-white bg-gray-700 rounded-full hover:bg-slate-600 transition duration-900'>
                Subscribe
             </button>

        
        </div> 
    </ Wrapper >
  )
}

export default Profile