import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  { 
    followedTo: 
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        index: true
        
      },
    

    followedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        index: true
      },
  },
  { timestamps: true }
);


export const Subscription = mongoose.model("Subscription", subscriptionSchema);
