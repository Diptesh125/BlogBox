import mongoose, { Schema } from "mongoose";

const newBlogSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: [String]
    },
    likeCount: {
        type: Number,
    },
    comments: {
        type: [String]
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "Author"
    }
}, { timestamps: true })

export const NewBlog = mongoose.model('NewBlog', newBlogSchema)
