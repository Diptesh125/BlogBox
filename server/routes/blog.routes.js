import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import { submitForm, getPosts, getBlogById, toggleLike, createComment } from '../controllers/blog.controllers.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/submit-form', upload.single('image'), submitForm);
router.get('/blogs', getPosts);

router.get('/:blogId', getBlogById)
router.post('/like', toggleLike)

router.post('/comment', createComment)


export default router;
