import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchGigs = createAsyncThunk("gigs/fetch", async () => {
  const res = await api.get("/gigs");
  return res.data;
});

export const createGig = createAsyncThunk("gigs/create", async (data) => {
  const res = await api.post("/gigs", data);
  return res.data;
});

const gigSlice = createSlice({
  name: "gigs",
  initialState: { list: [] },
  extraReducers: (builder) => {
    builder.addCase(fetchGigs.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(createGig.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });
  }
});

export default gigSlice.reducer;
