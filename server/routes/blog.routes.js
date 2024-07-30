import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import { submitForm } from '../controllers/blog.controllers.js';
import { getPosts } from '../controllers/blog.controllers.js';
// import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Apply Clerk authentication middleware
router.post('/submit-form', upload.single('image'), submitForm);
router.get('/blogs', getPosts);


export default router;
