import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './features/themeSlice'
import postsReducer from './features/postsSlice'
import visibilityReducer from './features/gradientSlice'
import imagePreviewReducer from './features/imagePreviewerSlice'

const store = configureStore({
    reducer: {
        visibility: visibilityReducer,
        theme: themeReducer,
        posts: postsReducer,
        imagePreview: imagePreviewReducer,
    }
})

export default store