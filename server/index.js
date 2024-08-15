import dotenv from 'dotenv';
dotenv.config({
    path: '.env'
});

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { connectDB } from './config/db.js'
import newUserInMongoDB from './config/webhook.js'

import blogRoutes from './routes/blog.routes.js'
import authorRoutes from './routes/author.routes.js'


const app = express()
const PORT = process.env.PORT || '5050'

app.use(cors({
    origin: 'http://localhost:5173',
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

connectDB();

app.use('/blog', blogRoutes)
app.use('/author', authorRoutes)

app.post(
    "/api/webhooks",
    bodyParser.raw({ type: "application/json" }),
    newUserInMongoDB
);

app.listen(PORT, () => {
    console.log(`listening to http://localhost:${PORT}`);
})