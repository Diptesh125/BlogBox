import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard'; // Adjust the import path as necessary
import { useSelector, useDispatch } from 'react-redux';
import { likeBlog } from '../app/features/likeSlice';

import Navbar from './Navbar';

const MyFeed = () => {
    const [allBlogs, setAllBlogs] = useState([]);
    const likes = useSelector((state) => state.likes.likes);
    const dispatch = useDispatch();

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

    const handleLike = (blogId) => {
        dispatch(likeBlog(blogId));
    };

    return (
        <div className="my-feed h-full container mx-auto">
            <Navbar />
            <div className="h-full flex flex-col">

                {/* Top Post of the Day */}
                <div className="top-post p-4 rounded">
                    <h2 className="text-2xl font-bold mb-2 text-text-100 dark:text-darkText-100">Top Post of the Day</h2>
                    {allBlogs.length > 0 ? (
                        <BlogCard
                            id={allBlogs[0]._id}
                            title={allBlogs[0].title}
                            content={allBlogs[0].description}
                            tags={allBlogs[0].tags}
                            tagsClassNames="h-6 text-xs"
                            profilePicture={allBlogs[0].authorProfilePic}
                            author={`${allBlogs[0].authorFirstName} ${allBlogs[0].authorLastName}`}
                            date={new Date(allBlogs[0].createdAt).toLocaleDateString()}
                            likeCount={likes[allBlogs[0]._id] || allBlogs[0].likeCount}
                            commentCount={allBlogs[0].comments.length}
                            banner={allBlogs[0].imageUrl}
                            className="w-full"
                            onLike={() => handleLike(allBlogs[0]._id)}
                        />
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>

                <div className='w-full flex'>
                    {/* Trending Blogs */}
                    <div className="trending-blogs w-2/3 p-4 rounded">
                        <h2 className="text-2xl font-bold mb-2 text-text-100 dark:text-darkText-100">Trending Blogs</h2>
                        <div className="flex flex-wrap">
                            {allBlogs.map(blog => (
                                <BlogCard
                                    key={blog._id}
                                    id={blog._id}
                                    title={blog.title}
                                    content={blog.description}
                                    tags={blog.tags}
                                    tagsClassNames="h-6 text-xs"
                                    profilePicture={blog.authorProfilePic}
                                    author={`${blog.authorFirstName} ${blog.authorLastName}`}
                                    date={new Date(blog.createdAt).toLocaleDateString()}
                                    likeCount={likes[blog._id] || blog.likeCount}
                                    commentCount={blog.comments.length}
                                    banner={blog.imageUrl}
                                    className="mb-4 w-full"
                                    onLike={() => handleLike(blog._id)}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="search-bar h-fit p-4 rounded">
                            <h2 className="text-2xl font-bold mb-2 text-text-100 dark:text-darkText-100">Search</h2>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>

                        {/* Authors Section */}
                        <div className="authors h-fit p-4 rounded">
                            <h2 className="text-2xl font-bold mb-2 text-text-100 dark:text-darkText-100">Authors</h2>
                            {/* Replace with actual content */}
                            <ul className='text-text-200 dark:text-darkText-200' >
                                <li className="mb-2">Author 1</li>
                                <li className="mb-2">Author 2</li>
                                <li className="mb-2">Author 3</li>
                            </ul>
                        </div>

                        {/* Tags Section */}
                        <div className="tags h-fit p-4 rounded">
                            <h2 className="text-2xl font-bold mb-2 text-text-100 dark:text-darkText-100">Tags</h2>
                            {/* Replace with actual content */}
                            <ul>
                                <li className="inline-block bg-gray-200 px-2 py-1 rounded-full m-1">#Tag1</li>
                                <li className="inline-block bg-gray-200 px-2 py-1 rounded-full m-1">#Tag2</li>
                                <li className="inline-block bg-gray-200 px-2 py-1 rounded-full m-1">#Tag3</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyFeed;
