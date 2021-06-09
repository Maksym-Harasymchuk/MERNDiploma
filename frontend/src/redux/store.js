import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import singleProductReducer from './singleProductSlice';
import cartSliceReducer from './cartSlice';
import userLogin from './userSlice';
import orderData from './orderSlice';

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingInfoFromLocalStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : { address: '', city: '' };

const preloadedState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: shippingInfoFromLocalStorage,
  },
  userLogin: { userInfo: userInfoFromLocalStorage },
};

export default configureStore({
  reducer: {
    products: productReducer,
    singleProduct: singleProductReducer,
    cart: cartSliceReducer,
    userLogin: userLogin,
    order: orderData,
  },
  preloadedState,
});
