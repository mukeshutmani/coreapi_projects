import mongoogse, { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const postSchema = new Schema({
        title: {
            type: String,
            required: true,
            index: true
        },

        content: {
            type: String,
            required: true,
            index: true
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }

}, { timestamps: true})

postSchema.plugin(mongoosePaginate)

export const Post = mongoogse.model("Post", postSchema)