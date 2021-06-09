import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const addToCart = createAsyncThunk('cart/add', async ({ productId, qty }) => {
  // console.log('CART: ', productId, qty);
  try {
    let {
      data: { product, name, image, price, conuntInStock },
    } = await axios.get(`/api/products/${productId}`);

    price *= qty;
    return { product, name, image, price, conuntInStock, qty, productId };
  } catch (err) {
    console.error(err);
    return err;
  }
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState: { cartItems: [], loading: 'idle', shippingAddress: {} },
  reducers: {
    removeFromCart(state, { payload }) {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== payload
      );

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    clearCart(state, { payload }) {
      state.cartItems = [];

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    saveShippingAddress(state, { payload }) {
      console.log('address: ', payload);

      state.address = payload;
      localStorage.setItem('shippingAddress', JSON.stringify(payload));
    },
  },
  extraReducers: {
    [addToCart.fulfilled]: (state, { meta, payload }) => {
      const existItem = state.cartItems.findIndex(
        (x) => x.productId === payload.productId
      );

      if (existItem !== -1) state.cartItems[existItem] = payload;
      else state.cartItems.push(payload);

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    [addToCart.pending]: (state, { meta }) => {
      state.loading = 'pending';
    },
    [addToCart.rejected]: (state, { meta, payload, error }) => {
      state.error = error;
    },
  },
});

export { addToCart };
export const { removeFromCart, saveShippingAddress, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
