import Changepass from "./components/Changepass"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Login from "./components/Login"
import Register from "./components/register"
import {Outlet} from "react-router-dom"

function App() {
  

return (
    <>
     
      {/* <Register /> */}
      {/* <Login /> */}
      {/* <Changepass /> */}

      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    
    </>
  )
}

export default App
