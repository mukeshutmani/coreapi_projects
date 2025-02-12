import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user.slice.js'
import postReducer from './postSlice.js'


const store = configureStore({

     reducer: {
        user: userReducer,
        post: postReducer
     }

})

export default store
