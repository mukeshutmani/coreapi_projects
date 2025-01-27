import { Router } from "express";
import { upload } from "../middlewares/multer.middle.js";
import { loginUser, userRegister } from "../controllers/UserRegister.js";


const router = Router()


router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    
    userRegister
)

router.route('/login').post(loginUser)


export {router}

