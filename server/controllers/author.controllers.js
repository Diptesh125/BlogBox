import { Author } from '../models/Author.models.js';
import { Blog } from '../models/Blog.models.js';


export const getAuthorDetails = async (req, res) => {
    try {
        const author = await Author.find().limit(10)
        res.json(author);
    } catch (error) {
        res.status(500).send('Error fetching author details');
    }
};

export const getAuthor = async (req, res) => {
    try {
        const authorId = req.params.id;

        // Fetch author details
        const author = await Author.findOne({ authorId: authorId });

        // Fetch all blogs by this author
        const blogs = await Blog.find({ authorId: authorId });

        // Calculate total likes across all blogs
        const totalLikes = blogs.reduce((sum, blog) => sum + blog.likeCount.length, 0);

        // Return author details, blogs, total likes, and follower count
        res.json({
            author,
            blogs,
            totalLikes,
            // followerCount: author.followers.length 
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching author details' });
    }
}