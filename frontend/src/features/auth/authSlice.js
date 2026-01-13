import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// SAFE load from localStorage
let storedUser = null;
let storedToken = null;

try {
  const rawUser = localStorage.getItem("user");
  storedUser = rawUser ? JSON.parse(rawUser) : null;
  storedToken = localStorage.getItem("token");
} catch {
  localStorage.clear();
}

export const login = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/auth/login", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/auth/register", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Register failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser,
    token: storedToken,
    error: null,
    loading: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        // 🔥 UNIVERSAL RESPONSE HANDLING
        const token =
          action.payload.token ||
          action.payload.data?.token;

        const user =
          action.payload.user ||
          action.payload.data ||
          action.payload;

        state.user = user;
        state.token = token;

        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
        }
        if (token) {
          localStorage.setItem("token", token);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REGISTER
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;

        const token =
          action.payload.token ||
          action.payload.data?.token;

        const user =
          action.payload.user ||
          action.payload.data ||
          action.payload;

        state.user = user;
        state.token = token;

        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
        }
        if (token) {
          localStorage.setItem("token", token);
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
