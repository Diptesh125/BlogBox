import { Blog } from '../models/Blog.models.js';
import { Author } from '../models/Author.models.js';
import cloudinary from '../config/cloudinary.js';

export const submitForm = async (req, res) => {
    try {
        const { title, description, tags, authorId } = req.body;
        const image = req.file;

        const authorDetails = await Author.findOne({ authorId })
        // console.log(authorDetails)

        // console.log(authorId)

        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(image.path);

        // Create a new blog post with the provided data
        const blog = new Blog({
            imageUrl: result.secure_url,
            title: title,
            description: description,
            tags: JSON.parse(tags),
            authorId: authorId,
            authorFirstName: authorDetails.firstName,
            authorLastName: authorDetails.lastName,
            authorUserName: authorDetails.username,
            authorProfilePic: authorDetails.profilePic,
            authorEmailAddress: authorDetails.emailAddress,
            createdAt: new Date(),
        });

        console.log(blog);

        await blog.save();

        res.send('Form submitted successfully');
    } catch (error) {
        console.error('Error uploading image or saving data', error);
        res.status(500).send('Internal Server Error');
    }
};

export const getPosts = async (req, res) => {
    try {
        const allBlogs = await Blog.find()
        // console.log(allBlogs);
        res.json(allBlogs);
    } catch (error) {
        res.status(500).send("Error fetching all the data")
    }
}

export const getBlogById = async (req, res) => {
    try {
        const blogId = req.params.blogId

        const blog = await Blog.findById(blogId)
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json(blog)

    } catch (error) {
        res.status(500).json(error)
    }
}

export const toggleLike = async (req, res) => {
    const { userId, blogId } = req.body
    try {
        const blog = await Blog.findById(blogId)
        if (!blog) {
            return res.status(404).send('Blog not found');
        }

        const likeIndex = blog.likeCount.indexOf(userId);
        if (likeIndex === -1) {
            // User has not liked the blog yet, so add their ID
            blog.likeCount.push(userId);
        } else {
            // User has already liked the blog, so remove their ID
            blog.likeCount.splice(likeIndex, 1);
        }

        await blog.save();

        res.status(200).send('Like status updated successfully');
    } catch (error) {
        res.status(500).json(error)
    }
}

export const createComment = async (req, res) => {
    const { blogId, userId, userName, commentText } = req.body;

    try {
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        const newComment = {
            userId,
            userName,
            commentText,
            createdAt: new Date()
        };

        blog.comments.push(newComment);
        await blog.save();

        res.json(blog);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Server error' });
    }
}