import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// ✅ FETCH BIDS
export const fetchBids = createAsyncThunk(
  "bids/fetch",
  async (gigId) => {
    const res = await api.get(`/bids/${gigId}`);
    return res.data;
  }
);

// ✅ CREATE BID
export const createBid = createAsyncThunk(
  "bids/create",
  async (data) => {
    const res = await api.post("/bids", data);
    return res.data;
  }
);

export const hireBid = createAsyncThunk(
  "bids/hire",
  async ({ bidId, gigId }) => {
    const res = await api.patch(
      `/bids/${bidId}/hire`,
      { gigId } // 🔥 REQUIRED BY BACKEND
    );
    return res.data;
  }
);


const bidSlice = createSlice({
  name: "bids",
  initialState: {
    list: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBids.fulfilled, (state, action) => {
      state.list = action.payload;
    });

    builder.addCase(createBid.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });
  },
});

export default bidSlice.reducer;
