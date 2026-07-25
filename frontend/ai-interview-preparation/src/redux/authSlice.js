// src/redux/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {

        // Save logged-in user
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },

        // Logout user
        logoutUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },

        // Loading state
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

    },
});

export const {
    setUser,
    logoutUser,
    setLoading,
} = authSlice.actions;

export default authSlice.reducer;