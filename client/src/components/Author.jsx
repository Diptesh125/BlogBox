import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BlogCard from './BlogCard';
import Navbar from './Navbar';
import Button from './Button';

const Author = () => {
    const { id } = useParams(); // Get the author ID from the URL
    const [author, setAuthor] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [totalLikes, setTotalLikes] = useState(0);
    const [followerCount, setFollowerCount] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const fetchAuthorDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/author/${id}`);
                const { author, blogs, totalLikes, followerCount } = response.data;
                setAuthor(author);
                setBlogs(blogs);
                setTotalLikes(totalLikes);
                setFollowerCount(followerCount);
            } catch (error) {
                console.error('Error fetching author details:', error);
            }
        };

        fetchAuthorDetails();
    }, [id]);

    const handleFollow = () => {
        // Implement follow/unfollow logic here
        setIsFollowing(!isFollowing);
    };

    if (!author) {
        return <p>Loading...</p>;
    }

    return (
        <div className="w-full">
            <Navbar />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center mb-6 mt-4">
                    <img src={author.profilePic} alt={author.userName} className="w-20 h-20 rounded-full mb-4 sm:mb-0 sm:mr-4" />
                    <div className="text-center sm:text-left">
                        <h1 className="text-3xl font-bold mb-2 text-text-100 dark:text-darkText-100">{author.firstName} {author.lastName}</h1>
                        <p className="font-[GillSans] text-md text-text-200 hover:text-text-100 pt-1 dark:text-white">@{author.username}</p>
                        <p className="font-[GillSans] text-md text-text-200 hover:text-text-100 pt-1 dark:text-white">{followerCount} Followers</p>
                        <button
                            onClick={handleFollow}
                            className=' font-[GillSans] text-base w-[4.75rem] h-[2rem] bg-accent-100 dark:bg-darkAccent-100 rounded-md flex justify-center items-center pt-1 mr-2'
                        >
                            {isFollowing ? 'Unfollow' : 'Follow'}
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <h2 className="text-3xl font-bold mb-2 text-text-100 dark:text-darkText-100">Total Likes: {totalLikes}</h2>
                </div>

                <div>
                    <h2 className="text-3xl font-bold mb-2 text-text-100 dark:text-darkText-100">Blogs by {author.firstName}</h2>
                    <div className="grid grid-cols-2 gap-5">
                        {blogs.map(blog => (
                            <BlogCard
                                key={blog._id}
                                id={blog._id}
                                title={blog.title}
                                content={blog.description}
                                tags={blog.tags}
                                author={`${author.firstName} ${author.lastName}`}
                                profilePicture={author.profilePic}
                                date={new Date(blog.createdAt).toLocaleDateString()}
                                likeCount={blog.likeCount.length}
                                commentCount={blog.comments.length}
                                banner={blog.imageUrl}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Author;
