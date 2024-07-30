import { Blog } from '../models/Blog.models.js';
import cloudinary from '../config/cloudinary.js';

export const submitForm = async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        const image = req.file;
        const author = JSON.parse(req.body.author); // Parse the author JSON string

        console.log(author);

        // Upload the image to Cloudinary
        const result = await cloudinary.uploader.upload(image.path);

        // Create a new blog post with the provided data
        const blog = new Blog({
            imageUrl: result.secure_url,
            title,
            description,
            tags: JSON.parse(tags),
            authorId: author.id,
            authorFirstName: author.firstName,
            authorLastName: author.lastName,
            authorProfilePic: author.profilePic,
            createdAt: new Date(),
        });

        console.log(blog);

        // Save the new blog post to the database
        await blog.save();

        res.send('Form submitted successfully');
    } catch (error) {
        console.error('Error uploading image or saving data', error);
        res.status(500).send('Internal Server Error');
    }
};

export const getPosts = async (req, res) => {
    try {
        const allBlogs = await Blog.find();
        res.json(allBlogs)
    } catch (error) {
        res.status(500).send("Error fetching all the data")
    }
}