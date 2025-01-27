import { router } from "./routes/user.routes.js"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { ApiError } from "./utils/ApiError.js"

const app = express()




app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({
     extended: true,
     limit: "16kb",
}))

app.use(cookieParser())

app.use(express.static("public"))

app.use("/api/user", router)


app.use((err, req, res, next) => {

    if(err instanceof ApiError) {
       return res.status(err.statusCode)
       .json({
        statusCode: err.statusCode,
        success: false,
        message: err.message,
        errors: err.errors || [],
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
       });
    }
})



export {app}