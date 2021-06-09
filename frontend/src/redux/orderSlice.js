import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const createOrder = createAsyncThunk(
  'order/make',
  async (order, { dispatch, rejectWithValue, getState }) => {
    console.log('order: ', order);
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

      const { data } = await axios.post(`/api/orders`, order, config);

      return data;
    } catch (err) {
      console.error('ERRROR: ', err);
      return err;
    }
  }
);

const getMyOrders = createAsyncThunk(
  'order/get',
  async (userId, { getState }) => {
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

      const { data } = await axios.get(`/api/orders/myorders`, config);
      console.log('FROM SLICE: ', data);
      return data;
    } catch (err) {
      console.error('ERRROR: ', err);
      return err;
    }
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderItems: [],
    myOrders: [],
    loading: 'idle',
    shippingAddress: {},
  },
  reducers: {},
  extraReducers: {
    [createOrder.fulfilled]: (state, { meta, payload }) => {
      state.orderItems.push(payload);
    },
    [createOrder.pending]: (state, { meta }) => {
      state.loading = 'pending';
    },
    [createOrder.rejected]: (state, { meta, payload, error }) => {
      state.error = error;
    },
    [getMyOrders.fulfilled]: (state, { meta, payload }) => {
      state.myOrders = payload;
      console.log('Reducer', payload);
      state.loading = 'pending';
    },
    [getMyOrders.pending]: (state, { meta }) => {
      // state.loading = 'pending';
    },
    [getMyOrders.rejected]: (state, { meta, payload, error }) => {
      state.error = error;
    },
  },
});

export { createOrder, getMyOrders };

export default orderSlice.reducer;
