import React from 'react'
import { createRoot } from 'react-dom/client'
import {Provider, useSelector} from 'react-redux'

import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import Login from './components/Login.jsx'
import Register from './components/register.jsx'
import Changepass from './components/Changepass.jsx'
import Home from './components/Home.jsx'
import Profile from './components/Profile.jsx'
import store from './store/store.js'
import Post from './components/post.jsx'
// import PrivateRouter from './PrivateRouter.jsx'
// const auth = useSelector((state) => state.user.userauth)
const PrivateRoute = () => {
  
  const auth = useSelector((state) => state.user.userauth)

  const router = createBrowserRouter([
    { 
     
      path:'/',
      element: <App />,
      children: [
       {  
          path:"/login",
          element:  !auth && <Login />
       },
  
        {
          path:"/register",
          element: !auth && <Register />
        },
        {
          path:"/change-password",
          element: auth && <Changepass />
         
        },
  
        {
          path:"/home",
          element: auth && <Home />
        },
        
        {
          path:"/my-profile",
          element: auth && <Profile />
          
        },
  
      ]
    }
  ])

  return <RouterProvider router={router} />
}




createRoot(document.getElementById('root')).render(
 
    <Provider store={store}>
       <PrivateRoute />
    </Provider>
 
)
