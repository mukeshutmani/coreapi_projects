
// import dotenv from 'dotenv
// import 'dotenv/config' // behind the scence it call the .env
import { Dbconnect } from './db/index.js'
import mongoose from 'mongoose'
import { app } from './app.js'
// import { ApiResponse } from './utils/ApiResponse.js'




// dotenv.config({
//     path:'./.env'
// })
mongoose.set('strictQuery', false)

const PORT = process.env.PORT || 3000


// app.get("/", (req, res) => {
//         res.send(`<h1> welcome my server <h1/>`)
// })







// app.get("/user", (req, res) => {
//         res.send(`<h1> welcome Mukesh Utmani <h1/>`)
// })

Dbconnect()
.then(() => {

    const server = app.listen(PORT, () => {
        console.log(`Server is runnning at port ${PORT}`);
    })

    server.on("error", (error) => {
          console.log("Server Error Port:", error);
    })

})
.catch(( error) => {
     console.log("MongoDb Connection Error Fail", error); 
})



// app.listen(PORT, () => {
//     console.log(`Serevre is running at Port http://localhost:${PORT}`);

// })






