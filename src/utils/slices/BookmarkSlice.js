import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";



export const fetchBookmark = createAsyncThunk(
    'bookmark/fetchBookmark',
    async (userId) => {
      const config = {
        headers: {
          Authorization: localStorage.getItem('token'), 
        }
      };

      const response = await axios.get(import.meta.env.VITE_BACKEND_URI+`/api/bookmark/${userId}`,config);
      return response.data.post;
    }
)
export const postBookmark = createAsyncThunk(
    'bookmark/postBookmark',
    async ({userId,postId}) => {

      const response = await axios.post(import.meta.env.VITE_BACKEND_URI+`/api/bookmark/save`,{userId,postId});
      return response.data;
    }
)

export const removeBookmark = createAsyncThunk(
    'bookmark/remove',
    async ({userId,postId}) => {
    
      const response = await axios.delete(import.meta.env.VITE_BACKEND_URI+`/api/bookmark/remove/${userId}/${postId}`);
      return response.data;
    }
)

const bookmarkSlice = createSlice({
     name:"bookmark",
     initialState: {
      bookmarks:[]
},
    reducers:{

    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchBookmark.fulfilled, (state, action) => {
          state.bookmarks = action.payload
        })
        .addCase(postBookmark.fulfilled, () => {
            
          })
          .addCase(removeBookmark.fulfilled, (state,action) => {
            state.bookmarks = state.bookmarks.filter((item)=> item.post_id !== action.payload.post_id)
          })
       
    }

})


  
export default bookmarkSlice.reducer;
  