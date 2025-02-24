import React, { forwardRef, useState } from "react";
import Like from "../utils/Like/Like";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { postUser } from "../store/postSlice";




function PostCard(
  { username, fullName, avatar, title, createdAt, content = "hello", postId, postlikes,  likeChecked , loggedUserId },
  ref
) {

    const navigate = useNavigate()    
    
    const [likes, setLikes] = useState(postlikes)
    const [loading, setLoading] = useState(false)
    const [checked, setChecked] = useState(likeChecked)
    
    const dispatch = useDispatch()

   const onProfile = () => {
     dispatch(postUser(postId))
     navigate(`/profile/${username}`)
   }
    
   
  const likeHandle = async(postId) => {
    setLoading(true)
    // setLikes()
    
         try {
         const res =  await axios.get('/api/user/count-likes', {
          params: {postId}
         }) 

        //  console.log(res?.data?.data);
         if(res) {
            setLikes(res?.data?.data)
            setChecked(true)
         }

         } catch (error) {
            console.log("Post id Error", error);
            setChecked(false)

         } finally {
            setLoading(false)
         }
   }
  
     

  return (
    <div className="bg-white rounded-lg shadow-md p-5 w-[360px] transition duration-300 m-5 ">
      <div className=" flex items-start space-x-3  ">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center text-white font-bold">
          <img
            src={`${avatar}`}
            alt=""
            className=" w-12 h-12 rounded-full border-2 object-cover"
            ref={ref}
          />
        </div>

        <div className="flex-1 cursor-pointer" onClick={onProfile} >
          <h2 ref={ref}>{fullName}</h2>

          <h2 ref={ref}>@{username}</h2>
        </div>

        <div className="relative left-1 text-sm top-1 text-gray-500">
          <h1>{createdAt}</h1>
        </div>
      </div>
      <div className="relative top-4 ">
        <h1 ref={ref} className="text-gray-900 underline">
          {" "}
          {title}{" "}
        </h1>
      </div>

      <div
        className="outline-none resize-none w-full min-h-[100px] overflow-hidden whitespace-pre-wrap text-gray-700 mt-4 text-lg"
        ref={ref}
      >
        {content}
      </div>

      <div className="flex items-center justify-between mt-4 text-gray-500">
        <div className="flex items-center space-x-4">
          <button className="hover:text-blue-500">📩165</button>

          <button
           key={postId}
           onClick={() =>  likeHandle(postId)}
           disabled={loading}
          >
            <Like id={postId} likes={likes} checked={checked} />
          </button>
          <button className="hover:text-blue-500">views 100k</button>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(PostCard);
