import { Router } from "express";
import { upload } from "../middlewares/multer.middle.js";
import { changePassword, getCurrentUser, loginUser, logoutUser, userRegister } from "../controllers/UserRegister.js";
import { verifyJWT } from "../middlewares/auth.middle.js";
import { CreatePost, GetAllPost, postLikes } from "../controllers/Post.Controllers.js";


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
router.route('/logout').post(verifyJWT, logoutUser)

router.route('/change-password').post(verifyJWT, changePassword )

router.route('/getuser').get(verifyJWT, getCurrentUser)



// posts routess 

router.route('/create-post').post(verifyJWT, CreatePost )

router.route('/get-allposts').get(verifyJWT, GetAllPost )

router.route('/count-likes').get(verifyJWT, postLikes)


export {router}

