import React from 'react';

const ShareModal = ({ link, onClose }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(link).then(() => {
            alert("Link copied to clipboard!");
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Share this blog</h2>
                <p className="mb-4">{link}</p>
                <button
                    onClick={copyToClipboard}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                    Copy Link
                </button>
                <button
                    onClick={onClose}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ShareModal;
