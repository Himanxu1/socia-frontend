import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchCommentsByPostId = createAsyncThunk(
    'comments/fetchCommentsByPostId',
    async (postId) => {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URI+`/api/comment/${postId}`);
      return response.data;
    }
)

// Async thunk to post a new comment
export const postComment = createAsyncThunk(
    'comments/postComment',
    async ({ userId, postId, content }) => {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URI+'/api/comment/save', { userId, postId, content });
      return response.data;
    }
  );

  
const commentsSlice = createSlice({
    name: 'comments',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
          return action.payload;
        })
        .addCase(postComment.fulfilled, (state, action) => {
          state.push(action.payload);
        });
    },
  });
  
  export default commentsSlice.reducer;
  