import React, { useState } from 'react'
import Input from '../utils/Input'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import ResToast from './toast/ResToast'
import { useDispatch } from 'react-redux'
import { addPost } from '../store/postSlice'
import Loader from './Loader/Loader'







function Post() {
  
      const [err, setErr] = useState(null)
      const [msg, setMsg] = useState(null)
      const {register, handleSubmit, reset} = useForm()

      const [loader, setLoader] = useState(false)

      const dispatch  = useDispatch()



  const createPost = async (data) => {
     
     setErr(null)
     setLoader(true)

     try {

         const post = await axios.post('/api/user/create-post', data)

         dispatch(addPost(post?.data?.data));
        
         setMsg("Post Created Successfully")
         // console.log(post.data);
         
         reset()

     } catch (error) {
         console.log(error);
         
     } finally {
          setLoader(false)
     }
  } 

  setTimeout(() => {
     setMsg(null)
  }, 3000);
   

  return (
     <div className= 'flex justify-center  items-center '>
        <div className='absolute   top-16'>
          { msg && <ResToast message={msg} />}
        </div>
        <div className='absolute   top-20'>
          { loader && <Loader /> }
        </div>
         <div className=' w-1/3 h-1/2 mt-20 bg-gray-400 rounded-lg p-4  '>
           <h1 className=' text-center relative top-3 text-lg'>
            Create Post
           </h1>
            <form onSubmit={handleSubmit(createPost)} >
                <div className='mt-6 space-y-4'>
                   <Input
                   placeholder='Add a title'
                   required
                   maxLength={25}
                   className='w-full p-2 focus:outline-none focus:ring-2 rounded-sm  '

                   name="title"
                   {...register('title', {
                    required: true
                   })}
                   />

                   <textarea 
                   placeholder='Add a content'
                   rows={4}
                   cols={4}
                   required
                   className='w-full p-2 focus:outline-none focus:ring-2 focus:ring=blue-500 border border-gray-300 rounded-sm resize-none'
                   name='content'
                   {...register('content', {
                      required: true
                   })}
                   >
                   </textarea>
                   
                   <button 
                   type='submit'
                   className='w-full bg-blue-500 p-1 rounded-sm hover:bg-blue-600 duration-500'>
                     Post
                   </button>

                </div>
                
             </form>
         </div>
     </div>
  )
}

export default Post