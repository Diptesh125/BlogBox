import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import { submitForm } from '../controllers/blog.controllers.js';
import { getPosts, getBlogById } from '../controllers/blog.controllers.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/submit-form', upload.single('image'), submitForm);
router.get('/blogs', getPosts);

router.get('/:blogId', getBlogById)
// router.patch('/blog/:blogId/like', toggleLike)


export default router;
