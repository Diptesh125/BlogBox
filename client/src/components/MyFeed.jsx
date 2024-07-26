import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard'; // Adjust the import path as necessary

const MyFeed = () => {
    const [allBlogs, setAllBlogs] = useState([]);

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
        <div className="my-feed container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Top Post of the Day */}
                <div className="top-post col-span-1 md:col-span-3 p-4 rounded">
                    <h2 className="text-2xl font-bold mb-2 text-text-100 dark:text-darkText-100">Top Post of the Day</h2>
                    {allBlogs.length > 0 ? (
                        <BlogCard
                            title={allBlogs[0].title}
                            content={allBlogs[0].description}
                            tags={allBlogs[0].tags}
                            tagsClassNames="h-6 text-xs"
                            profilePicture={allBlogs[0].authorProfilePic}
                            author={`${allBlogs[0].authorFirstName} ${allBlogs[0].authorLastName}`}
                            date={new Date(allBlogs[0].createdAt).toLocaleDateString()}
                            likeCount={allBlogs[0].likeCount}
                            commentCount={allBlogs[0].comments.length}
                            banner={allBlogs[0].imageUrl}
                            className="w-full"
                        />
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>

                {/* Trending Blogs */}
                <div className="trending-blogs col-span-1 md:col-span-2 p-4 rounded">
                    <h2 className="text-2xl font-bold mb-2 text-text-100 dark:text-darkText-100">Trending Blogs</h2>
                    <div className="flex flex-wrap">
                        {allBlogs.map(blog => (
                            <BlogCard
                                key={blog._id}
                                title={blog.title}
                                content={blog.description}
                                tags={blog.tags}
                                tagsClassNames="h-6 text-xs"
                                profilePicture={blog.authorProfilePic}
                                author={`${blog.authorFirstName} ${blog.authorLastName}`}
                                date={new Date(blog.createdAt).toLocaleDateString()}
                                likeCount={blog.likeCount}
                                commentCount={blog.comments.length}
                                banner={blog.imageUrl}
                                className="mb-4 w-full"
                            />
                        ))}
                    </div>
                </div>

                {/* Small Search Bar */}
                <div className="search-bar h-fit col-span-1 p-4 rounded border-2 border-red-500">
                    <h2 className="text-2xl font-bold mb-2 text-text-100 dark:text-darkText-100">Search</h2>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Authors Section */}
                <div className="authors col-span-1 p-4 rounded">
                    <h2 className="text-2xl font-bold mb-2 text-text-100 dark:text-darkText-100">Authors</h2>
                    {/* Replace with actual content */}
                    <ul>
                        <li className="mb-2">Author 1</li>
                        <li className="mb-2">Author 2</li>
                        <li className="mb-2">Author 3</li>
                    </ul>
                </div>

                {/* Tags Section */}
                <div className="tags col-span-1 p-4 rounded">
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
    );
};

export default MyFeed;
