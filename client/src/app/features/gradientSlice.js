import { createSlice } from '@reduxjs/toolkit';

export const gradientSlice = createSlice({
    name: 'visibility',
    initialState: {
        isVisible: false,
    },
    reducers: {
        show: state => {
            state.isVisible = true;
        },
        hide: state => {
            state.isVisible = false;
        },
    },
});

export const { show, hide } = gradientSlice.actions;

export default gradientSlice.reducer;