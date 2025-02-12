import { asyncHanlder } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";




const generateAccessAndRefreshTokens = async (userId) => {

       try {
        
          const user =  await User.findById(userId)
          
          const accessToken = await user.generateAccessToken();
          const refreshToken = await user.generateRefreshToken();
          
          user.refreshToken = refreshToken;

          await user.save({
            validateBeforeSave: false
          })

          return { accessToken, refreshToken }

       } catch (error) {
          throw new ApiError(400, "Error during generate access and refresh tokens ")
       }
}





const userRegister =  asyncHanlder( async (req, res, next) => {
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
    
    // console.log("Avatar local path ",avatarLocalPath);
    
    if(!avatarLocalPath) {
        throw new ApiError(400, "Local Avatar is required field")
    }

    const avatarOnCloudinary =  await uploadOnCloudinary(avatarLocalPath)
    const coverImageOnCloudinary = await uploadOnCloudinary(coverImageLocalPath)
    
    // console.log("UserREgister file: avtar ", avatarOnCloudinary);
    

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

  const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user?._id)

  const createUser = await User.findById(user._id).select(
    "-password, -refreshToken"
  )
  
  if(!createUser) {
      throw new ApiError(500, "something went wrong while registering the user")
  }

  const options = {
    httpOnly: true,
    secure: true
  }

   return res
   .status(201)
   .cookie("accessToken", accessToken, options)
   .cookie("refreshToken", refreshToken, options)
   .json( new ApiResponse( 200, createUser, "User Registered Successfully"  ))
});



const loginUser = asyncHanlder ( async (req, res, next) => {

     const { email, password } = req.body;
    //  console.log(email);
     
     if(!email) {
        throw new ApiError(400, "email is required")
     }

    const user = await User.findOne({
        $or: [{email}]
     })

     if(!user) {
        throw new ApiError(400, "User does not exist")
     }

    const isPasswordValid =  await user.isPasswordCorrect(password)

    if(!isPasswordValid) {
        throw new ApiError( 400, "Password is not Correct")
    }
    
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const userLoggedIn = await User.findById(user._id).select(
           "-password -refreshToken"
          )
     
    const options = {
      httpOnly: true,
      secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            userLoggedIn, 
            accessToken, 
            refreshToken,
            "user loggedIn SuccessFully"
         )
    )

})


const logoutUser = asyncHanlder( async (req, res) => {
    User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, {}, "User Logout Successfuuly")
    )
})

const changePassword = asyncHanlder( async(req, res) => {

       const {oldPassword, newPassword} = req.body;

       if(!oldPassword || !newPassword) {
              throw new ApiError(400, "Both Fields Are required")
       }

      const user = await User.findById(req.user?._id)
      const passwordVerification = await user.isPasswordCorrect(oldPassword)
      
      if(!passwordVerification){
        throw new ApiError(400, "Opps! Invalid Old Password! Try Again")
      }
      
      user.password = newPassword;
      await user.save({validateBeforeSave: false})
      
      return res
      .status(200)
      .json(
        new ApiResponse(200, {}, "Password Changed SuccessFully")
      )
              
})

const getCurrentUser = asyncHanlder( async(req, res) => {
     return res
     .status(201)
     .json( new ApiResponse (
        200, req.user, "Current User fetched SuccessFully" 
    ))    
})



export {
    userRegister,
    loginUser,
    logoutUser,
    changePassword,
    getCurrentUser
}