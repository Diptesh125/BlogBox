import mongoose, { Schema } from "mongoose";

const blogSchema = new mongoose.Schema({
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
        default: 0
    },
    comments: {
        type: [String],
        default: [""]
    },
    authorId: {
        type: String
    },
    authorFirstName: {
        type: String
    },
    authorLastName: {
        type: String
    },
    authorProfilePic: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

export const Blog = mongoose.model('Blog', blogSchema)
