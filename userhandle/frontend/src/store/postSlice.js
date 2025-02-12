import { createSlice } from "@reduxjs/toolkit";

 
 const postSlice = createSlice({
     name: "post",
     initialState: {
        Allposts: [],
        currentPage: 1,
        totalPages: 1,
        hasMore: true,
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
        }

     }
 })

 export const  {addPost, postLoading, Posts} = postSlice.actions
 export default postSlice.reducer