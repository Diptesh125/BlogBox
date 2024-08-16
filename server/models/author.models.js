import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    authorId: {
        type: String,
        required: true
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
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    joinedDate: {
        type: Date,
        default: Date.now,
    },
    totalLikes: {
        type: Number,
        default: 0,
    },
    totalFollwing: {
        type: [String]
    },
    totalFollower: {
        type: [String]
    },
    blogsWritten: {
        type: [String]
    }
}, { timestamps: true })

export const Author = mongoose.model('Author', authorSchema)