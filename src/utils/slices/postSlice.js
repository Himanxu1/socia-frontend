import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchAllPosts = createAsyncThunk(
    'post/fetchAllPosts',
    async () => {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URI+`/api/post`);
      return response.data.post;
    }
)

const postSlice = createSlice({
    name:"post",
    initialState:{
        items:false,
        posts:[]
    },
    reducers:{

     addPost:(state,action)=>{
            state.items = action.payload
    },  
},
extraReducers : (builder)=>{ 
    builder
    .addCase(fetchAllPosts.fulfilled, (state, action) => {
      state.posts = action.payload
    })
    
}
})


export const {addPost} = postSlice.actions
export default postSlice.reducer
