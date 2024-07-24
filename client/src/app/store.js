import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './features/themeSlice'
import postsReducer from './features/postsSlice'
import visibilityReducer from './features/gradientSlice'

const store = configureStore({
    reducer: {
        visibility: visibilityReducer,
        theme: themeReducer,
        posts: postsReducer
    }
})

export default store