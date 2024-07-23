// components/MyFeed.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../app/features/postsSlice.js';
import BlogCard from './BlogCard/BlogCard.jsx';

const TestMyFeed = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const status = useSelector((state) => state.posts.status);
    const error = useSelector((state) => state.posts.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);

    let content;

    if (status === 'loading') {
        content = <div>Loading...</div>;
    } else if (status === 'succeeded') {
        content = posts.map((post) => (
            <div key={post._id} className="w-full md:w-1/2 lg:w-1/3 px-4">
                <BlogCard post={post} />
            </div>
        ));
    } else if (status === 'failed') {
        content = <div>Error: {error}</div>;
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold my-6">My Feed</h1>
            <div className="flex flex-wrap -mx-4">{content}</div>
        </div>
    );
};

export default TestMyFeed;
