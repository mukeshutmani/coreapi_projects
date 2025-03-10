
import mongoose, { Schema } from "mongoose";


const likeSchema = new Schema({

    likedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    
    LikedPost : {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },


}, {timestamps: true})

export const Like = mongoose.model("Like", likeSchema)