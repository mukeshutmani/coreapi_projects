import { Like } from "../models/Like.Model.js";
import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHanlder } from "../utils/asyncHandler.js";




const CreatePost = asyncHanlder( async (req, res) => {

      const {title, content} = req.body;
      const {_id} = req.user;
      
      if(!title || !content) {
            throw new ApiError(400, "Both fields are required")
      }

     const newPost = new Post({
        title,
        content,
        user: _id,
        
     })
    
     const post = await newPost.save();
     
     if(!post) {
        throw new ApiError(500, "Something went wrong while creating the Post")
     }
     
     const populatePost = await Post.findById(post._id).populate({
        path: 'user',
        select: 'fullName username avatar'
       })

     return res
     .status(201)
     .json(
        new ApiResponse(200, populatePost, "Post Created SuccessFully" )
     )

   
})


const GetAllPost = asyncHanlder( async(req, res) => {

        const userId = req.user?._id
      //   console.log(userId);
       
        const page = parseInt(req.query.page) || 1 ;
        const limit = parseInt (req.query.limit) || 9;
      //   const skip = (page - 1) * limit

        const options = {
            page: page,
            limit: limit,
            sort: {createdAt: -1},
            populate: {
               path: 'user',
               select: 'fullName username avatar'
            }
        }
        
        const posts = await Post.paginate({'user': userId}, options)
      //   console.log(posts);
        
        if(!posts) {
           throw new ApiError(500, "something went wrong while fecthing Posts")
        }

      //  const totalPosts = await Post.countDocuments({user: userId});

        return res
        .status(200)
        .json(
         new ApiResponse (201,  {
            posts: posts.docs,
            totalPosts: posts.totalDocs,
            totalPages: posts.totalPages,
            currentPage: page,
            hasMore: posts.hasNextPage
          }, 
            "posts fetched succesfully", 
              
            )
        )

})


const postLikes = asyncHanlder( async(req, res) => {

      const postId = req.query.postId;
      const { _id } = req.user
      
      if(!postId) {
          throw new ApiError(400, "PostId is required for Likes")
      }
      
      const existedLike = await Like.findOne({likedBy: _id, LikedPost: postId });
       
      if(existedLike) {

         const deleteLike =  await Like.deleteOne({ likedBy: _id, LikedPost: postId })
         
         await Post.findByIdAndUpdate(postId, {
            $pull: {likes: _id }
         })

         if(deleteLike) {
            throw new ApiError(400, "Like removed")
         }

      }
      
         
      const postLikes = await new Like({
            likedBy: _id,
            LikedPost: postId,
         }).save()
         
         await Post.findByIdAndUpdate(postId, {
            $push: {likes: _id}
         })

         await Post.findByIdAndUpdate(_id, {
            $push: {checked: true}
         })
         
         if(!postLikes) {
            throw new ApiError(400, "Likes are not saved")
         }
   
         const countLikes = await Like.countDocuments({ LikedPost: postId });
         
         if (!countLikes){
            throw new ApiError(400, "Post have not any likes")
         }
   
         return res
         .status(200)
         .json(
            new ApiResponse(
               200, 
               countLikes,
               "Likes count successFully"
            )
         )
      
})






export { 
   CreatePost,
   GetAllPost,
   postLikes
 }