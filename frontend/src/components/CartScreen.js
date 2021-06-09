import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartListItem from './items/CartListItem';
import { createOrder } from '../redux/orderSlice';
import {
  Grid,
  makeStyles,
  Typography,
  Paper,
  Box,
  List,
} from '@material-ui/core';
import { addToCart, clearCart } from '../redux/cartSlice';
import SpringModal from './utils/SpringModal';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignContent: 'flex-start',
  },
  modalBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2, 1),

    display: 'flex',
    flexDirection: 'column',
    fontStretch: 1,

    alignItems: 'center',
  },
}));

const CartScreen = ({ location, history, match }) => {
  const classes = useStyles();

  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart({ productId, qty }));
    }
  }, [dispatch, productId, qty]);

  const backToMainScreenHandler = () => {
    history.push('/');
    dispatch(
      createOrder({
        orderItems: cartItems,
        totalPrice: Number(calcPrice()),
      })
    );
    dispatch(clearCart());
  };

  const calcPrice = () =>
    cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(0);

  return (
    <Grid container className={classes.root}>
      <Grid item lg={8} sm={12}>
        {cartItems.length ? (
          <List>
            {cartItems.map((item) => (
              <CartListItem
                productId={item.productId}
                key={item.productId}
                image={item.image}
                name={item.name}
                price={item.price}
                countInStock={item.conuntInStock}
                qty={item.qty}
              />
            ))}
          </List>
        ) : (
          <Paper className={classes.paper}>
            <Typography variant={'h5'}>Ваша корзина пуста</Typography>
          </Paper>
        )}
      </Grid>
      <Grid item lg={4} sm={12}>
        <div className={classes.paper}>
          <Typography variant={'h6'}>
            Підсумок:
            {calcPrice() + ' грн'}
          </Typography>
          <Box className={classes.modalBox} m={2}>
            <SpringModal
              name={'Замовлення підтверджую'}
              disabled={cartItems.length === 0}
              backToMainScreenHandler={backToMainScreenHandler}
            />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};

export default CartScreen;
