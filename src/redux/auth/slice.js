import { createSlice } from "@reduxjs/toolkit";
import {
  apiLogin,
  apiLogout,
  apiRefresh,
  apiRegister,
  getAllUsers,
} from "./operations";

const INITIAL_STATE = {
  user: {
    name: "",
    email: "",
  },
  token: null,
  isRegisteredSuccess: false,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
  isLoading: false,
  count: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(apiRegister.pending, (state) => {
        state.error = null;
        state.isRegisteredSuccess = false;
        state.isLoading = true;
        state.isRefreshing = true;
      })
      .addCase(apiRegister.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isRegisteredSuccess = true;
        state.isLoading = false;
        state.isRefreshing = false;
      })
      .addCase(apiRegister.rejected, (state, action) => {
        state.error = action.payload;
        state.isRegisteredSuccess = false;
        state.isLoading = false;
        state.isRefreshing = false;
      })

      .addCase(apiLogin.pending, (state) => {
        state.error = null;
        state.isLoading = true;
        state.isRefreshing = true;
      })
      .addCase(apiLogin.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
        state.isRefreshing = false;
        state.isLoading = false;
      })
      .addCase(apiLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.isRefreshing = false;
        state.isLoading = false;
      })

      .addCase(apiLogout.pending, (state) => {
        state.error = null;
      })
      .addCase(apiLogout.fulfilled, () => {
        return INITIAL_STATE;
      })
      .addCase(apiLogout.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(getAllUsers.pending, (state) => {
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.count = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(apiRefresh.pending, (state) => {
        state.error = null;
        state.isRefreshing = true;
      })
      .addCase(apiRefresh.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(apiRefresh.rejected, (state, action) => {
        state.error = action.payload;
        state.isRefreshing = false;
        state.token = null;
      });
  },
});

export const authReducer = authSlice.reducer;
