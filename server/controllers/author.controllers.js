import Author from '../models/Author.models.js';
import Blog from '../models/Blog.models.js';

export const getAuthorDetails = async (req, res) => {
    try {
        const author = await Author.findOne({ clerkId: req.params.id });
        console.log(author)
        res.json(author);
    } catch (error) {
        res.status(500).send('Error fetching author details');
    }
};

export const getBlogsByAuthor = async (req, res) => {
    try {
        const blogs = await Blog.find({ authorId: req.params.id });
        console.log(blogs)
        res.json(blogs);
    } catch (error) {
        res.status(500).send('Error fetching blogs');
    }
};
