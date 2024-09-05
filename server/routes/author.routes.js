import express from 'express';
import { getAuthorDetails, getAuthor } from '../controllers/author.controllers.js';



const router = express.Router();

router.get('/top10Authors', getAuthorDetails)

router.get('/:id', getAuthor)

export default router;
