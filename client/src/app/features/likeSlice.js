import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    likes: {}
};

const likeSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
        setLikeState: (state, action) => {
            const { blogId, likeCount } = action.payload;
            state.likes[blogId] = likeCount;
        },
    },
});

export const { setLikeState } = likeSlice.actions;

export const toggleLike = ({ blogId, userId }) => async dispatch => {
    try {
        const response = await axios.post(`http://localhost:8080/blog/like`, { userId, blogId });

        if (response.data && typeof response.data.likeCount !== 'undefined') {
            dispatch(setLikeState({ blogId, likeCount: response.data.likeCount }));
            return { blogId, likeCount: response.data.likeCount }; // Return the payload
        } else {
            console.error('Unexpected response format:', response.data);
        }
    } catch (error) {
        console.error('Error liking the post:', error);
    }
};


export default likeSlice.reducer;
