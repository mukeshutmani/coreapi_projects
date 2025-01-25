import { DB_NAME } from "../constants.js";
import mongoose from "mongoose"


const Dbconnect = async () => {
    try {
        const connectionInstance =  await mongoose.connect(`${process.env.DATABASE_URL}/${DB_NAME}`)
        
        console.log(`MongoDB Connected!! ${connectionInstance.connection.host}`);
        

    } catch (error) {
         console.log("MongoDB Connection Error:", error);
         process.exit(1)
         
    } 
}

export {Dbconnect}




