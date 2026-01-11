import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchBids = createAsyncThunk("bids/fetch", async (gigId) => {
  const res = await api.get(`/bids/${gigId}`);
  return res.data;
});

export const createBid = createAsyncThunk("bids/create", async (data) => {
  const res = await api.post("/bids", data);
  return res.data;
});

export const hireBid = createAsyncThunk("bids/hire", async (bidId) => {
  const res = await api.patch(`/bids/${bidId}/hire`);
  return res.data;
});

const bidSlice = createSlice({
  name: "bids",
  initialState: { list: [] },
  extraReducers: (builder) => {
    builder.addCase(fetchBids.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  }
});

export default bidSlice.reducer;
