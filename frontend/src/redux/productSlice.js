import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getTables = createAsyncThunk(
  'product/getTables',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/products');

      return data;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

const deleteProductByID = createAsyncThunk(
  'product/delete',
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      axios.delete(`/api/products/${id}`, config);

      return true;
    } catch (err) {
      const payloadError =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;

      return rejectWithValue(payloadError);
    }
  }
);

const createProduct = createAsyncThunk(
  'product/create',
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const data = axios.post(`/api/products`, {}, config);

      return data;
    } catch (err) {
      const payloadError =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;

      return rejectWithValue(payloadError);
    }
  }
);

export const productDetailsSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    deleteProduct: {
      loading: true,
      success: false,
      error: null,
    },
    createdProduct: {
      product: {},
      loading: true,
      success: false,
      error: null,
    },
    loading: 'idle',
  },
  reducers: {},
  extraReducers: {
    [getTables.fulfilled]: (state, { meta, payload }) => {
      state.products = payload;
      state.loading = false;
    },
    [getTables.pending]: (state, { meta }) => {
      state.loading = true;
    },
    [getTables.rejected]: (state, { meta, payload, error }) => {
      state.error = error;
      state.loading = false;
    },
    [deleteProductByID.fulfilled]: (state, { meta, payload }) => {
      state.deleteProduct.success = payload;
      state.deleteProduct.loading = false;
    },
    [deleteProductByID.pending]: (state, { meta }) => {
      state.deleteProduct.success = false;
      state.deleteProduct.loading = true;
    },
    [deleteProductByID.rejected]: (state, { meta, payload, error }) => {
      state.deleteProduct.error = error;
      state.deleteProduct.loading = false;
    },
    [createProduct.fulfilled]: (state, { meta, payload }) => {
      console.log(payload);
      state.createdProduct.product = payload.data;
      state.createdProduct.success = true;
      state.createdProduct.loading = false;
    },
    [createProduct.pending]: (state, { meta }) => {
      state.createdProduct.loading = true;
    },
    [createProduct.rejected]: (state, { meta, payload, error }) => {
      state.createdProduct.error = error;
      state.createdProduct.loading = false;
    },
  },
});

export { getTables, deleteProductByID, createProduct };
export default productDetailsSlice.reducer;
