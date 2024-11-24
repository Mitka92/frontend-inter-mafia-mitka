import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {},
  // extraReducers: {}, // II777: deprecated syntax was breaking the build
});

export const authReducer = authSlice.reducer;
