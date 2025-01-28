import { useState } from "react"
import Footer from "./components/Footer"
import Header from "./components/Header"
import {Outlet, useNavigate} from "react-router-dom"
import Wrapper from "./components/Wrapper"
import Loader from "./components/Loader/Loader"

import axios from 'axios'


function App() {
  
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  
const handleLogout = async () => {
   setLoading(true)
    
   try {
        
    const response = await axios.post('/api/user/logout')
    console.log(response.data);

    navigate('/')
   
    // alert("User Logout Successfuly")
    return response
   } catch (error) {
      // alert("Error")
     console.log(error);
     
   } finally {
       setLoading(false)
   }

 
    
}

return (
    <>
     
      {/* <Register /> */}
      {/* <Login /> */}
      {/* <Changepass /> */}

      <Header onlogOut={handleLogout} />

       <div className="bg-gray-500 min-h-screen">
        {loading && <Wrapper>
          <Loader />
          
        </Wrapper> }

        <Outlet />
       </div>

      <Footer />
    
    </>
  )
}

export default App
