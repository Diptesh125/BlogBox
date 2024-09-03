import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

const CommentSidebar = ({ blogId, comments, onClose }) => {
    const [commentText, setCommentText] = useState('');
    const { user } = useUser();

    const handleCommentSubmit = async () => {
        if (!commentText) return;

        const newComment = {
            blogId,
            userId: user.id,
            userName: `${user.firstName} ${user.lastName}`,
            commentText
        };

        try {
            await axios.post('http://localhost:8080/blog/comment', newComment);
            setCommentText('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className="fixed right-0 top-0 w-1/3 h-full bg-white shadow-lg p-4">
            <button onClick={onClose} className="text-black text-xl">X</button>
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            <div className="mb-4">
                {comments.map((comment, index) => (
                    <div key={index} className="mb-2">
                        <h3 className="font-bold">{comment.userName}</h3>
                        <p>{comment.commentText}</p>
                        <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
                    </div>
                ))}
            </div>
            <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <button
                onClick={handleCommentSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Submit
            </button>
        </div>
    );
};

export default CommentSidebar;
