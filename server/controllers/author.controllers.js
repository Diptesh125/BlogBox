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

export const getBlogsByAuthor = async (req, res) => {
    try {
        const blogs = await Blog.find({ authorId: req.params.id });
        res.json(blogs);
    } catch (error) {
        res.status(500).send('Error fetching blogs');
    }
};
