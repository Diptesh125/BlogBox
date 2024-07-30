import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import axios from 'axios'

import Line from '../assets/Line.svg';
import LineDark from '../assets/LineDark.svg';
import Pen from '../assets/Pen.svg';

import Button from './Button';
import BlogCard from './BlogCard';
import Navbar from './Navbar';

const Homepage = () => {
    const darkMode = useSelector((state) => state.theme.darkMode)
    const currLine = darkMode ? LineDark : Line

    const [allBlogs, setAllBlogs] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:8080/blog/blogs');
                const blogs = response.data;
                console.log(blogs)
                setAllBlogs(blogs);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className={`w-full flex justify-center items-center relative flex-col ${darkMode ? '' : ''}`}>
            <Navbar />
            <div className="relative w-full h-[400px] flex justify-center items-center flex-col">

                <div className="w-fit relative flex justify-center items-center text-text-100 mt-10 z-10 dark:text-darkText-100">
                    <h1 className="lg:text-7xl font-[Diastema] ">
                        Stories that connect <br />
                        Ideas that <span className="font-[Pinyon] lg:text-8xl">Inspire</span>
                    </h1>
                    <img src={currLine} alt="" className="absolute bottom-0 right-0" />
                </div>

                <Button
                    text="Write"
                    textClassName="font-[GillSans] text-lg text-text-100 dark:text-darkText-100"
                    className="lg:w-[7rem] lg:h-[3rem] bg-accent-100 dark:bg-darkAccent-100 rounded-full flex justify-center items-center pt-1 mt-10 z-10"
                    img={Pen}
                    onClick={() => navigate('/submit-form')}
                />
            </div>

            <Marquee
                className="h-[300px] overflow-hidden "
                pauseOnHover
            >
                {allBlogs.map((blog, index) => (
                    <BlogCard
                        key={blog._id}
                        title={blog.title}
                        content={blog.description}
                        tags={blog.tags}
                        profilePicture={blog.authorProfilePic}
                        author={`${blog.authorFirstName} ${blog.authorLastName}`}
                        date={new Date(blog.createdAt).toLocaleDateString()}
                        likeCount={blog.likeCount}
                        commentCount={blog.comments.length}
                        banner={blog.imageUrl}
                        className={index % 2 === 0 ? 'mt-8' : null}
                    />
                ))}
            </Marquee>
        </div>
    );
};

export default Homepage;
