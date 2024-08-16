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
        type: [String],
        default: []
    },
    likeCount: {
        type: [String],
        default: []
    },
    comments: {
        type: [String],
        default: []
    },
    authorId: {
        type: String,
        required: true,
    },
    authorFirstName: {
        type: String,
        required: true,
        default: null
    },
    authorLastName: {
        type: String,
        default: null
    },
    authorUserName: {
        type: String,
        required: true
    },
    authorProfilePic: {
        type: String,
        required: true
    },
    authorEmailAddress: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

export const Blog = mongoose.model('Blog', blogSchema)
