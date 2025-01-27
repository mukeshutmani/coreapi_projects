import Footer from "./components/Footer"
import Header from "./components/Header"

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
