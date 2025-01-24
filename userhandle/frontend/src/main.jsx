import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login.jsx'
import Register from './components/register.jsx'
import Changepass from './components/Changepass.jsx'
import Home from './components/Home.jsx'
import Profile from './components/Profile.jsx'


const router = createBrowserRouter([
    {
      path:'/',
      element: <App />,
      children: [
        {
          path:"/login",
          element:<Login />
        },

        {
          path:"/register",
          element: <Register />
        },
        {
          path:"/change-password",
          element: <Changepass />
        },

        {
          path:"/home",
          element: <Home />
        },
        {
          path:"/my-profile",
          element: <Profile />
        }

      ]
    }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
