import { createSlice } from '@reduxjs/toolkit'


const userSlice = createSlice({
      name: 'user',
      initialState: {
        userData: null,
        loading: false,
        userauth: false,
        error: null
      },
     

      reducers: {
        registerUser (state, action) {
               state.userData = action.payload
               state.userauth = true
               state.loading = false
              //  console.log("Store Data:",state.userData);
        },

        setLoading (state, action) {
             state.loading = action.payload
        },

        setAuth (state, action) {
            state.userauth = action.payload
        },

        


      }

      
      
})

export const {registerUser, setLoading, setAuth} = userSlice.actions;
export default userSlice.reducer
