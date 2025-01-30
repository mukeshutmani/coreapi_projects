import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function PrivateRouter({children}) {
  
   const auth = useSelector((state) => state.user.userauth )

   return auth ? children : <Navigate to="/login" />
}

export default PrivateRouter