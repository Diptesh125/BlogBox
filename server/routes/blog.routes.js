import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { submitForm } from '../controllers/createPost.controllers.js';
import { getPosts } from '../controllers/getPosts.controllers.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Apply Clerk authentication middleware
router.post('/submit-form', upload.single('image'), submitForm);
router.get('/blogs', getPosts);

export default router;
