import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import { submitForm, getPosts, getBlogById, toggleLike } from '../controllers/blog.controllers.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/submit-form', upload.single('image'), submitForm);
router.get('/blogs', getPosts);

router.get('/:blogId', getBlogById)
router.post('/like', toggleLike)


export default router;
