import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name:"theme",
    initialState:{
        theme: localStorage.getItem('theme') || 'dark'
    },
    reducers:{
        darkMode: state => {
            state.theme = 'dark';
            localStorage.setItem('theme', 'dark');
        },
        lightMode: state => {
            state.theme = 'light';
            localStorage.setItem('theme', 'light');
        },
}
})


export const {darkMode,lightMode} = themeSlice.actions
export default themeSlice.reducer
