import React from 'react'
import Wrapper from './Wrapper'
import { useSelector } from 'react-redux'
import Loader from './Loader/Loader'
import dateUtils from '../utils/Dateutils'




function Profile() {

  const userdata = useSelector((state) => state?.user?.userData?.data)
  let loading = useSelector(state => state.user.loading)

  const createdDate = dateUtils(userdata?.createdAt)

  return loading ?  <Wrapper>
                  <div> 
                     <Loader />
                  </div>
          </Wrapper> :
      <Wrapper>
        <div className='bg-white w-64 h-80 shadow-lg rounded-lg overflow-hidden flex flex-col items-center'>
             <div className='w-full h-24 bg-cover bg-center'
             style={{backgroundImage: `url(${userdata?.coverImage})`}}
             >
             </div>

             <div className=' absolute mt-12 '>
                <img 
                className='w-24 h-24 rounded-full border-2 '
                src={userdata?.avatar}
                alt="Profile" 
                />
             </div>

             <div className='text-center mt-16'>
                 <h3 className='text-lg font-semibold'>
                    {userdata?.fullName}
                 </h3>
                 <p className='text-gray-500'>
                     {userdata?.username}
                 </p>
                 <p className='text-gray-500 text-xs'>
                     {createdDate}
                 </p>
             </div>

             <button className='mt-4 px-6 py-2 text-white bg-gray-700 rounded-full hover:bg-slate-600 transition duration-900'>
                Subscribe
             </button>

        
        </div> 
    </ Wrapper > 
}

export default Profile