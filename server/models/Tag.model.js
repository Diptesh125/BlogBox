import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    tags: {
        type: [String]
    }
})

export const Tag = mongoose.model("Tag", tagSchema)