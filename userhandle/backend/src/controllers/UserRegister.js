import { asyncHanlder } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const userRegister =  asyncHanlder( async (req, res) => {
    const {fullName, email, username, password} =  req.body

    if([fullName, email, username, password].some((field) => field.trim() === "" )){
            throw new ApiError(400,"All fields are required" )
      }

     const existedUser = await User.findOne({
        $or: [{username}, {email}]
     })

     if(existedUser) {
           throw new ApiError(409, "User with this email or username already exists")
      }

      // check filess
    
    const avatarLocalPath = req.files?.avatar[0]?.path;

    const coverImageLocalPath = req.files?.coverImage?.[0]?.path
    
    console.log("Avatar local path ",avatarLocalPath);
    
    if(!avatarLocalPath) {
        throw new ApiError(400, "Local Avatar is required field")
    }

    const avatarOnCloudinary =  await uploadOnCloudinary(avatarLocalPath)
    const coverImageOnCloudinary = await uploadOnCloudinary(coverImageLocalPath)
    
    console.log("UserREgister file: avtar ", avatarOnCloudinary);
    

    if(!avatarOnCloudinary) {
        throw new ApiError(400, " Cloudinary Avatar is required field")
    }

   const user = await User.create({
        fullName,
        email,
        username: username.toLowerCase(),
        password,
        avatar: avatarOnCloudinary.url,
        coverImage: coverImageOnCloudinary?.url || ""
   })

    
  const createUser = await User.findById(user._id).select(
    "-password, -refreshToken"
  )

  if(!createUser) {
      throw new ApiError(500, "something went wrong while registering the user")
  }

   return res
   .status(200)
   .json( new ApiResponse(200, createUser, "User Registered Successfully" )
    )


})


export {userRegister}