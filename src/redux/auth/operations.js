import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// export const instance = axios.create({
//   baseURL: "http://localhost:8080/api/",
//   withCredentials: true,
// });
export const instance = axios.create({
  baseURL: "https://back-inter-mafia-mitka.onrender.com/api/",
  withCredentials: true,
});

export const setAuthHeaders = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  instance.defaults.headers.common.Authorization = null;
};

export const apiLogin = createAsyncThunk(
  "users/login",
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post("users/login", formData);
      setAuthHeaders(data.data.accessToken);
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiRegister = createAsyncThunk(
  "users/register",
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post("users/register", formData);
      // setAuthHeaders(data.token);
      //   console.log("data:", data);
      return data;
    } catch (error) {
      // console.error("Error during registration:", error);
      return thunkApi.rejectWithValue(error.response.data.data.message);
    }
  }
);

// export const apiRefresh = createAsyncThunk(
//   "users/refresh",
//   async (_, thunkApi) => {
//     try {
//       const { data } = await instance.post("users/refresh");
//       // const state = thunkApi.getState();
//       // const token = state.auth.token;
//       setAuthHeaders(data.accessToken);
//       return data.data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   },
//   {
//     condition: (_, thunkApi) => {
//       const state = thunkApi.getState();

//       return state.auth.token !== null;
//     },
//   }
// );
export const apiRefresh = createAsyncThunk(
  "users/refresh",
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    if (!state.auth.token) {
      return thunkApi.rejectWithValue();
    }

    try {
      setAuthHeaders(state.auth.token);
      const { data } = await instance.post("users/refresh");
      console.log(data);
      setAuthHeaders(data.data.accessToken);
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const apiLogout = createAsyncThunk(
  "users/logout",
  async (_, thunkApi) => {
    try {
      await instance.post("users/logout");
      clearAuthHeader();
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, thunkApi) => {
    try {
      const response = await instance.get("users/count-user");
      return response.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
