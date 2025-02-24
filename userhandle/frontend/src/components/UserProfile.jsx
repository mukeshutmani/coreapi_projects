import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import dateUtils from '../utils/Dateutils'
import Loader from './Loader/Loader'
import Wrapper from './Wrapper'
import axios from 'axios'
import { following } from '../store/postSlice'



function UserProfile() {
    
  const postUser = useSelector(state => state?.post?.postUser)
  const userdata = useSelector((state) => state?.user?.userData?.data)
  
//   console.log(userdata._id);
  
  
  let loading = useSelector(state => state.user.loading)
  const createdDate = dateUtils(postUser?.createdAt)
  
   const dispatch = useDispatch()
   
   const [dataFollowing, setDataFollowing] = useState(0)
   const [dataFollowers, setDataFollowers] = useState(0)

   const [status, setStatus] = useState(false)
   console.log(status);
   

   
   
   const subscriptions = async (followedToId) => {
   //   console.log(followedToId);
     
      try {

        if(!followedToId) return;

        const res = await axios.get('/api/user/subs', {
          params: {followedToId}
        })

   
        if (res.data){
          dispatch(following(res.data))
          setDataFollowing(res.data.data.userFollowing)
          setDataFollowers(res.data.data.userFollowers)

          setMessage("Follwing")
        }

      } catch (error) {
         console.log(error);
         
      }
  }
  

  let userId = postUser?._id;
   //  console.log(postUser._id);
    
  const countFollowing = useCallback(async () => {
    console.log("functionCalled");
    
      try {
         const res = await axios.get('/api/user/following', {
            params: {userId}
          })
          console.log("response", res);

          if(res.data) {
            //   console.log(res.data.data);
            setDataFollowers(res?.data?.data?.userFollowers)
            setDataFollowing(res?.data?.data?.userFollowing)
            setStatus(res.data?.data?.status)

          }

      } catch (error) {
          console.log(error); 
      }

   },[userId])
   
  useEffect(() => {
     if(userId){
       countFollowing()
     }
  },[countFollowing])
  



  return loading ?  <Wrapper>
                  <div> 
                     <Loader />
                  </div>
          </Wrapper> :
      <Wrapper>
        <div className='bg-white w-64 h-80 shadow-lg rounded-lg overflow-hidden flex flex-col items-center'>
             <div className='w-full h-24 bg-cover bg-center'
             style={{backgroundImage: `url(${postUser?.coverImage})`}}
             >
             </div>

             <div className=' absolute mt-12 '>
                <img 
                className='w-24 h-24 rounded-full border-2 '
                src={postUser?.avatar}
                alt="Profile" 
                />
             </div>

             <div className='text-center mt-16 '>
                 <h3 className='text-lg font-semibold '>
                    {postUser?.fullName}
                 </h3>
                 <p className='text-gray-500'>
                     {postUser?.username}
                 </p>
                 <p className='text-gray-500 text-xs'>
                     {createdDate}
                 </p>
             </div>

            <div className='flex gap-2'>
             <h1 className='mt-4 px-4 py-1 text-gray-950 rounded-full '>
                followers {dataFollowers}
             </h1>
             <h1 className='mt-4 px-4 py-1 text-gray-950 rounded-full '>
                following {dataFollowing}
             </h1>
            </div>
            
          
           { postUser._id !== userdata._id && <button 
            onClick={() => subscriptions(postUser?._id)}
            className='mt-4 mb-2 px-4 py-1 text-white bg-gray-700 rounded-full hover:bg-slate-600 transition duration-900' >
                 {status? "Following": "Follow"}
             </button> }
           

        </div> 
    </ Wrapper > 
}

export default UserProfile