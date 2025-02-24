import React, { useCallback, useEffect, useState } from 'react'
import Post from './post'
import PostCard from './PostCard'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getCountFollowing, Posts } from '../store/postSlice'
import InfiniteScroll from 'react-infinite-scroll-component'
// import { getAllUsers } from '../store/user.slice'
// import debounce from "lodash.debounce"


function Home() {
  
  const allposts = useSelector(state => state.post.Allposts)

  const user = useSelector(state => state.user.userData)
  const dispatch = useDispatch()

  const currentPage = useSelector(state => state.post.currentPage)
  const hasMore = useSelector(state => state.post.hasMore)

  const [loading, setLoading] = useState(false)
  
   function formatTimeAgo (time) {

         if(!time) return "invalid date"

         const currentTime = new Date()
         const createdAt = new Date(time)
         
         if(isNaN(createdAt.getTime())) return "invalid Date syntax"

         const timeDifference = currentTime - createdAt
         if(timeDifference<0) return "Just Now"
         
         const timeUnits = [

            { unit: "year", duration: 365*24*60*60*1000 },
            { unit: "month", duration: 30*24*60*60*1000 },
            { unit: "week", duration: 7*24*60*60*1000 },
            { unit: "day", duration: 24*60*60*1000 },
            { unit: "hour", duration: 60*60*1000 },
            { unit: "minute", duration: 60*1000 },
            { unit: "second", duration: 1000 },
        
         ]

         for(const {unit, duration} of timeUnits) {

               if ( timeDifference >= duration ) {
                   const value = Math.floor(timeDifference/duration)
                   return `${value} ${unit}${value > 1 ? "s" : ""} ago`
               }
         }
   
         return "just now"

  }
  

  
  const getAllPosts = useCallback( async (page = 1, limit = 9) => {
     
    if(loading) return;
    setLoading(true)
    
    try {
      const res =  await axios.get('/api/user/get-allposts', {
        params: {page, limit}
      })
      console.log("Data res",res.data?.data);
      
      if(res?.data?.data) {
          dispatch(Posts({
            posts: res?.data?.data.posts,
            currentPage: res?.data?.data?.currentPage,
            hasMore: res?.data?.data?.hasMore,
            totalPages: res?.data?.data?.totalPages
          })) 
         
      } 

    } catch (error) {
       console.log("Get All Posts Error", error);
    } finally {
       setLoading(false)
    }

  }, [loading, dispatch, setLoading])

  useEffect(() => {
    if(allposts.length === 0){
      getAllPosts() 
    }
  },[getAllPosts])
 
  const hasMorePosts = () => {
     if(!loading && hasMore) {
          getAllPosts( currentPage+1, 9)
     }
  }
  
  return (
    <>
   
         <Post /> 
        <InfiniteScroll
           dataLength={allposts?.length || 0} //This is important field to render the next data
           next={hasMorePosts}
           hasMore={hasMore}
           loader={<h4 className='text-center'>Loading...</h4>}
           endMessage={
             <p style={{ textAlign: 'center' }}>
               <b>Yay! You have seen it all</b>
             </p>
           }
        >


          <div className='flex flex-wrap ml-4  mt-12 '>
          
           {allposts && allposts.map((post) => (
              <div key={post._id}>
                 
                    <PostCard 
                    loggedUserId = {post.user._id}
                     postId= {post._id} 
                     title={post.title}
                     content={post.content}
                     avatar={post.user.avatar}
                     username={post.user.username}
                     fullName={post.user.fullName}
                     createdAt={formatTimeAgo(post.createdAt)}
                     postlikes={post.likes.length}
                     likeChecked = {
                      post.likes.includes(user.data._id)
                     }
                    />

                  
              </div>
           ))}
          </div>
        </InfiniteScroll>
    </>
  )
}

export default Home