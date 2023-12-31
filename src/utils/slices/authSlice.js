import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const updateUser = createAsyncThunk(
    'auth/updateUser',
    async (data) => {
     
      const response = await axios.put(import.meta.env.VITE_BACKEND_URI+`/api/user/update`,data);
      return response.data
    }
)

const authSlice = createSlice({
    name:"auth",
    initialState:{
        items:null
    },
    reducers:{
     addUser:(state,action)=>{
            state.items = action.payload
    }, 
    removeUser:(state)=>{
        state.items = null;
    }
},
    extraReducers:(builder) =>{
        builder
        .addCase(updateUser.fulfilled, (state, action) => {
          state.items = action.payload
        })
    }
})


export const {addUser,removeUser} = authSlice.actions
export default authSlice.reducer
