import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Navbar from './Navbar'

import FollowIcon from '../assets/Follow.svg';
import HeartIcon from '../assets/Heart.svg';
import CommentIcon from '../assets/Comment.svg';
import ShareIcon from '../assets/Share.svg';

const BlogPage = () => {
    const { blogId } = useParams(); // Get the blog ID from the URL
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/blog/${blogId}`);
                console.log(response);

                setBlog(response.data);
                console.log(blog.comments);

            } catch (error) {
                console.error('Error fetching blog details:', error);
            }
        };

        fetchBlog();
    }, [blogId]);

    if (!blog) {
        return <p>Loading...</p>;
    }

    return (
        <div className='w-full'>
            <Navbar />
            <div className='w-full h-64 flex justify-center items-center mt-4' >
                <img src={blog.imageUrl} alt={blog.title} className='h-64 rounded-lg object-contain' />
            </div>
            <div className='h-10 w-full flex justify-between items-center mt-2'>
                {/* Display other details as needed */}
                <p className='h-full font-medium text-text-200 dark:text-darkText-200 px-2 pt-[5px] pb-1 border-[1px] border-accent-100 rounded-lg flex items-center'>{`${blog.authorFirstName} ${blog.authorLastName}`}</p>
                <div className='h-full font-[Poppins-Regular] font-medium text-base flex justify-center flex-wrap'>
                    <p className='h-full text-text-200 dark:text-darkText-200 px-2 pt-[5px] pb-1 border-[1px] border-accent-100 rounded-lg flex items-center'>{blog.tags.join(', ')}</p>
                </div>
            </div>
            <div className='w-full flex items-center mt-2'>
                <div className='flex mr-2'>
                    <img src={HeartIcon} alt="" className='h-full w-6 mr-1' />
                    <h1 className='h-full flex font-[GillSans] items-center mt-[2px] text-text-200 dark:text-darkText-200'>{blog.likeCount.length} Likes</h1>
                </div>

                <div className='flex mr-2'>
                    <img src={CommentIcon} alt="" className='h-full w-6 mr-1' />
                    <h1 className='h-full flex font-[GillSans] items-center mt-[2px] text-text-200 dark:text-darkText-200'>{blog.comments.length} Comments</h1>
                </div>

                <div className='flex mr-2'>
                    <img src={ShareIcon} alt="" className='h-full w-6 mr-1' />
                    <h1 className='h-full flex font-[GillSans] items-center mt-[4px] text-text-200 dark:text-darkText-200 '>Share</h1>
                </div>
            </div>
            <div className='flex justify-center flex-col mt-2'>
                <h1 className="w-full h-18 bg-bg-100 dark:bg-darkBg-100 font-[Poppins-Bold] text-4xl text-text-100 dark:text-darkText-100 focus:outline-none" >{blog.title}</h1>
            </div>
            <div className='h-full w-full mt-2'>
                <p className="h-screen w-full text-lg font-[Poppins-Regular] bg-bg-100 dark:bg-darkBg-100 text-text-100 dark:text-darkText-100 focus:outline-none ">{blog.description}</p>
            </div>
        </div>
    );
};

export default BlogPage;