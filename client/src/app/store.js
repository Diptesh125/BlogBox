import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './features/themeSlice'
import postsReducer from './features/postsSlice'

const store = configureStore({
    reducer: {
        theme: themeReducer,
        posts: postsReducer
    }
})

export default store