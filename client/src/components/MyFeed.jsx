import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard'; // Adjust the import path as necessary
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const MyFeed = () => {
    const [allBlogs, setAllBlogs] = useState([]);
    const [allAuthors, setAllAuthors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const blogDetails = await axios.get('http://localhost:8080/blog/blogs');
                const top10Authors = await axios.get('http://localhost:8080/author/top10Authors');

                const blogs = blogDetails.data;
                const top10AuthorsData = top10Authors.data;

                setAllBlogs(blogs);
                setAllAuthors(top10AuthorsData);

            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredBlogs = allBlogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm) ||
        blog.description.toLowerCase().includes(searchTerm) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );

    return (
        <div className="my-feed h-full container mx-auto">
            <Navbar />
            <div className="h-full flex flex-col">

                {/* Top Post of the Day */}
                <div className="top-post p-4 rounded">
                    <h2 className="text-3xl font-bold mb-2 text-text-100 dark:text-darkText-100">Top Post of the Day</h2>
                    {allBlogs.length > 0 ? (
                        <BlogCard
                            id={allBlogs[allBlogs.length - 1]._id}
                            title={allBlogs[allBlogs.length - 1].title}
                            titleClassNames="text-xl"
                            content={allBlogs[allBlogs.length - 1].description}
                            contentClassNames="text-md"
                            tags={allBlogs[allBlogs.length - 1].tags}
                            tagsClassNames="h-6 text-xs"
                            profilePicture={allBlogs[allBlogs.length - 1].authorProfilePic}
                            author={`${allBlogs[allBlogs.length - 1].authorFirstName} ${allBlogs[allBlogs.length - 1].authorLastName}`}
                            date={new Date(allBlogs[allBlogs.length - 1].createdAt).toLocaleDateString()}
                            likeCount={allBlogs[allBlogs.length - 1].likeCount.length}
                            commentCount={allBlogs[allBlogs.length - 1].comments.length}
                            banner={allBlogs[allBlogs.length - 1].imageUrl}
                            className="w-full"
                        />
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>

                <div className='w-full flex'>
                    {/* Trending Blogs */}
                    <div className="trending-blogs w-2/3 p-4 rounded">
                        <h2 className="text-3xl font-bold mb-2 text-text-100 dark:text-darkText-100">Trending Blogs</h2>
                        <div className="flex flex-wrap">
                            {allBlogs.map(blog => (
                                <BlogCard
                                    key={blog._id}
                                    id={blog._id}
                                    title={blog.title}
                                    titleClassNames="text-xl"
                                    content={blog.description}
                                    contentClassNames="text-md"
                                    tags={blog.tags}
                                    tagsClassNames="h-6 text-xs"
                                    profilePicture={blog.authorProfilePic}
                                    author={`${blog.authorFirstName} ${blog.authorLastName}`}
                                    date={new Date(blog.createdAt).toLocaleDateString()}
                                    likeCount={blog.likeCount.length}
                                    commentCount={blog.comments.length}
                                    banner={blog.imageUrl}
                                    className="mb-4 w-full"
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="search-bar h-fit p-4 rounded">
                            <h2 className="text-3xl font-bold mb-2 text-text-100 dark:text-darkText-100">Search</h2>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full p-2 border border-gray-300 rounded"
                                onChange={handleSearchChange}
                            />
                        </div>

                        {/* Authors Section */}
                        <div className="authors h-fit p-4 rounded">
                            <h2 className="text-3xl font-bold mb-2 text-text-100 dark:text-darkText-100">Authors</h2>
                            <ul className='text-text-200 dark:text-darkText-200' >
                                {allAuthors.map((author) => (
                                    <Link to={`/author/${author.authorId}`} className="h-full font-medium text-text-200 dark:text-darkText-200 pt-[5px] pb-1 flex items-center">
                                        {`${author.firstName} ${author.lastName}`}
                                    </Link>
                                ))}
                            </ul>
                        </div>

                        {/* Tags Section */}
                        <div className="tags h-fit p-4 rounded">
                            <h2 className="text-3xl font-bold mb-2 text-text-100 dark:text-darkText-100">Tags</h2>
                            <ul>
                                {Array.from(new Set(allBlogs.flatMap(blog => blog.tags))).map(tag => (
                                    <li key={tag} className="inline-block bg-gray-200 px-2 py-1 rounded-full m-1">#{tag}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyFeed;
