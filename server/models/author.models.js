import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
    },
    joinedDate: {
        type: Date,
        default: Date.now,
    },
    totalLikes: {
        type: Number,
        default: 0,
    },
}, { timestamps: true })

export const Author = mongoose.model('Author', authorSchema)