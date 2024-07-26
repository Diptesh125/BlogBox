import { NewBlog } from '../models/newBlog.models.js';
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
        const newBlog = new NewBlog({
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

        console.log(newBlog);

        // Save the new blog post to the database
        await newBlog.save();

        res.send('Form submitted successfully');
    } catch (error) {
        console.error('Error uploading image or saving data', error);
        res.status(500).send('Internal Server Error');
    }
};
