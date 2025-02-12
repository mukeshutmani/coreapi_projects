import React, { forwardRef, useState } from "react";
import Like from "../utils/Like/Like";
import { useSelector } from "react-redux";
import axios from "axios";

function PostCard(
  { username, fullName, avatar, title, createdAt, content = "hello", postId },
  ref
) {

  // const posts = useSelector( state => state.post.Allposts)
//  console.log(postId);

    const [likes, setLikes] = useState(0)
    const [loading, setLoading] = useState(false)

    
    console.log("Likes", likes);
    
   const likeHandle = async(postId) => {
    setLoading(true)
    setLikes(0)

         try {
         const res =  await axios.get('/api/user/count-likes', {
          params: {postId}
         }) 

         console.log(res?.data?.data);
         if(res) {
            setLikes(res?.data?.data)
         }

         } catch (error) {
            console.log("Post id Error", error);
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

        <div className="flex-1">
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
            <Like id={postId} likes={likes} />
          </button>
          <button className="hover:text-blue-500">views 100k</button>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(PostCard);
