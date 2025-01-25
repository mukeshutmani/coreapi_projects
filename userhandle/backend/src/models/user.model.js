import mongoose, {Schema}  from "mongoose";


const userSchema = new Schema({
    
    fullName: {
        type: String,
        required: true,
        index: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
    },

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
    },

    avatar: {
        type: String,
        required: true
    },

    coverImage: {
        type: String,
    },

    watchHistory: [ 
        {
        type: Schema.Types.ObjectId,
        ref: "Video"
        }
    ],

    refreshToken: {
        type: String
    }


}, { timestamps: true })


export const User = mongoose.model("User", userSchema)