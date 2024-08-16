import express from 'express';
import { getAuthorDetails } from '../controllers/author.controllers.js';
import { getBlogsByAuthor } from '../controllers/author.controllers.js';


const router = express.Router();

router.get('/top10Authors', getAuthorDetails)

// Get author details
// router.get('/:id', getAuthorDetails);

// Get blogs by author
router.get('/:id/blogs', getBlogsByAuthor);

export default router;
