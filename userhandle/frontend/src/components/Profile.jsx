import React from 'react'
import Wrapper from './Wrapper'
import { useSelector } from 'react-redux'
import Loader from './Loader/Loader'
import dateUtils from '../utils/Dateutils'

// import { useParams } from 'react-router-dom'

   
  function Profile() {
  
  const userdata = useSelector((state) => state?.user?.userData?.data)
  let loading = useSelector(state => state.user.loading)

  const createdDate = dateUtils(userdata?.createdAt)
  
  const followingData = useSelector(state => state.post.countFollowing);


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

             <div className='text-center mt-16 '>
                 <h3 className='text-lg font-semibold '>
                    {userdata?.fullName}
                 </h3>
                 <p className='text-gray-500'>
                     {userdata?.username}
                 </p>
                 <p className='text-gray-500 text-xs'>
                     {createdDate}
                 </p>
             </div>
            
             <div className='flex gap-2 '>
             <h1 className='mt-4 px-4 py-1 text-gray-950 rounded-full '>
                followers {followingData.userFollowers}
             </h1>
             <h1 className='mt-4 px-4 py-1 text-gray-950 rounded-full '>
                following {followingData.userFollowing}
             </h1>
            </div>

        
        </div> 
    </ Wrapper > 
}

export default Profile