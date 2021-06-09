import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getSingleProduct = createAsyncThunk(
  `singleProduct/id`,
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      // console.log('thunk', data);
      return data;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

export const singleProductDetailsSlice = createSlice({
  name: 'singleProduct',
  initialState: {
    singleProduct: {
      reviews: [],
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getSingleProduct.fulfilled]: (state, { meta, payload }) => {
      state.singleProduct = payload;
      state.loading = false;
    },
    [getSingleProduct.pending]: (state, { meta }) => {
      state.loading = true;
    },
    [getSingleProduct.rejected]: (state, { meta, payload, error }) => {
      state.loading = false;
      state.error = error;
    },
  },
});

export { getSingleProduct };
export default singleProductDetailsSlice.reducer;
