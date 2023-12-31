import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import postReducer from './slices/postSlice'
import themeReducer from './slices/themeSlice'
import commentReducer from './slices/CommentSlice'
import bookmarkReducer from './slices/BookmarkSlice'

const store = configureStore({
    reducer:{
        auth:authReducer,
        post:postReducer,
        theme:themeReducer,
        bookmark:bookmarkReducer,
        comments:commentReducer
    }
})

export default store