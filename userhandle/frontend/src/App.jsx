import { useCallback, useEffect, useState } from "react"
import Footer from "./components/Footer"
import Header from "./components/Header"
import {Outlet, useNavigate} from "react-router-dom"
import Wrapper from "./components/Wrapper"
import Loader from "./components/Loader/Loader"
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import { registerUser, setAuth, setLoading , } from "./store/user.slice"
import { getCountFollowing } from "./store/postSlice"



function App() {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.user.userauth)
  // console.log(true);
  
  

  const load = useSelector(state => state.user.loading)
  // console.log(load);

  

  const getUser = useCallback ( async (dispatch) => {

  try {

     dispatch(setLoading(true))

     const user = await axios.get('/api/user/getuser')
        // console.log(user);
   
     if(user) dispatch(registerUser(user.data)) 
        
    } catch (error) {
           console.log(error); 
    } finally {
           dispatch(setLoading(false))
         }
  },[dispatch])


  useEffect(() => {
        getUser(dispatch)
  },[dispatch])

 


  // following and follwers data for authUsers
  const user = useSelector(state => state.user.userData)

  let userId = user?.data?._id;
 
  const countFollowing = useCallback(async () => {
    // console.log("functionCalled");
    
      try {
         const res = await axios.get('/api/user/following', {
            params: {userId}
          })
          // console.log(res?.data?.data);

          if(res.data) {
            dispatch(getCountFollowing(res?.data?.data))
          }

      } catch (error) {
          console.log(error); 
      }

   },[userId])
   
  useEffect(() => {
     if(userId){
       countFollowing()
     }
  },[countFollowing])

  


const [message , setMessage] = useState(null)

const handleLogout = async () => {
     
   try {
      
    dispatch(setLoading(true))
    const response = await axios.post('/api/user/logout')
    // console.log(response.data.message);
    dispatch(setAuth(false))

    setMessage(response.data.message)
    setTimeout(() => {
       setMessage(null)
    },3000)

    return response
   } catch (error) {
      
     console.log(error);
    
   } finally {
    dispatch(setLoading(false))
    navigate('/')
   }
    
}

// logout popUp




return (
    <>
     
      {/* <Register /> */}
      {/* <Login /> */}
      {/* <Changepass /> */}


       <Header onlogOut={handleLogout} />
       <div className="bg-gray-500 min-h-screen ">

        {load ?  <Wrapper>
          
          <Loader />   
        
        </Wrapper> : 
        
        <Outlet /> 
        } 

      { message && <p className="min-h-screen flex justify-center items-center text-3xl"> 
                {message}
        </p>
        }  
          
       </div>
         <Footer />

    
    </>
  )
}

export default App
