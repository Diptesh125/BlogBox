import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema({
    authorName: {
        type: String,
    },
    followerCount: {
        type: Number,
    },
    totalLikeCount: {
        type: Number,
    },
    allBlogs: {
        type: Schema.Types.ObjectId,
        ref: "NewBlog"
    }
}, { timestamps: true })

export const Author = mongoose.model('Author', AuthorSchema)