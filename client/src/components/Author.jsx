import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BlogCard from './BlogCard';
import Navbar from './Navbar';

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
                        <h1 className="text-2xl font-bold">{author.firstName} {author.lastName}</h1>
                        <p className="text-gray-600">@{author.username}</p>
                        <p className="text-gray-600">{followerCount} Followers</p>
                        <button
                            onClick={handleFollow}
                            className={`mt-2 px-4 py-2 rounded ${isFollowing ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
                        >
                            {isFollowing ? 'Unfollow' : 'Follow'}
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <h2 className="text-xl font-bold">Total Likes: {totalLikes}</h2>
                </div>

                <div>
                    <h2 className="text-xl font-bold mb-4">Blogs by {author.firstName}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
