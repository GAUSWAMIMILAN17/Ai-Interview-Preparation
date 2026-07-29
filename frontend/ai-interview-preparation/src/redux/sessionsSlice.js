// src/redux/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sessions: [],
    sessionData: null
};

const sessionsSlice = createSlice({
    name: "sessions",
    initialState,

    reducers: {

        // Save logged-in user
        setSessions: (state, action) => {
            state.sessions = action.payload;
        },
        setSessionData: (state, action) => {
            state.sessionData = action.payload;
        },

    },
});

export const {
    setSessions,
    setSessionData
} = sessionsSlice.actions;

export default sessionsSlice.reducer;