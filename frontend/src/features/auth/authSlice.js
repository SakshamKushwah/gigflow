import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Load user from localStorage (IMPORTANT)
const storedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const login = createAsyncThunk("auth/login", async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
});

export const register = createAsyncThunk("auth/register", async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
