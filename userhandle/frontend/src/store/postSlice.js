import { createSlice } from "@reduxjs/toolkit";

 
 const postSlice = createSlice({
     name: "post",
     initialState: {
        Allposts: [],
        currentPage: 1,
        totalPages: 1,
        hasMore: true,
        postUser: [],
        followingData: [],
        countFollowing: {},
     },

     reducers: {

       Posts (state, action) {
          state.Allposts = [...state.Allposts, ...action.payload.posts]

         //  console.log("state all posts", state.Allposts);
          
          state.currentPage = action.payload.currentPage
          state.totalPages = action.payload.totalPages
          state.hasMore = action.payload.hasMore
       },

        addPost (state, action) {
                state.Allposts = [action.payload, ...state.Allposts]
               //  console.log("Store Data",state.postData);
                
        },

        postLoading (state) {
             state.loading = true
        },
       
        postUser(state, action) {
          
         const post = state.Allposts.find((post) => post._id === action.payload)
         if(post){
              state.postUser = JSON.parse(JSON.stringify(post.user)); 

            //   console.log(state.postUser);
              
         }

        },

        following (state, action) {
           state.followingData = action.payload
        },

        getCountFollowing (state, action) {
             state.countFollowing = action.payload;
        }
        
     }
 })

 export const  {addPost, postLoading, Posts, likeChecked, postUser, following, getCountFollowing } = postSlice.actions
 export default postSlice.reducer