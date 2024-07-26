import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    imagePreview: null,
};

const imagePreviewSlice = createSlice({
    name: 'imagePreview',
    initialState,
    reducers: {
        setImagePreview: (state, action) => {
            state.imagePreview = action.payload;
        },
        clearImagePreview: (state) => {
            state.imagePreview = null;
        },
    },
});

export const { setImagePreview, clearImagePreview } = imagePreviewSlice.actions;
export default imagePreviewSlice.reducer;
