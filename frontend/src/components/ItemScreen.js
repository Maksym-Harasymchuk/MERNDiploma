import React, { useEffect, useState, useRef } from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  Paper,
  Box,
  Button,
  CircularProgress,
  Divider,
  TextField,
} from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { getSingleProduct } from '../redux/singleProductSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 20,
  },

  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: '100%',
  },

  padding: {
    padding: '10px 0',
  },

  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

const ItemScreen = ({ history, match }) => {
  const classes = useStyles();
  const [qty, setQty] = useState(1);
  const { singleProduct, loading } = useSelector(
    (state) => state.singleProduct
  );

  const {
    name,
    description,
    brand,
    price,
    countInStock,
    size,
    color,
    material,
    image,
  } = singleProduct;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleProduct(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}/?qty=${qty}`);
  };

  return !loading ? (
    <Grid container className={classes.root} spacing={2}>
      <Grid container xs={12} sm={7} item direction={'column'}>
        <Grid item xs>
          <Box mb={2}>
            <img className={classes.img} alt='product' src={image} />
          </Box>

          {/* <Grid item xs> */}
          <Paper className={classes.paper} elevation={1}>
            <Typography gutterBottom align={'center'} variant={'h5'}>
              {name}
            </Typography>

            <Typography
              variant='body1'
              gutterBottom
              className={classes.padding}
            >
              Розмір: {size}
            </Typography>
            <Divider />
            <Typography
              variant='body1'
              gutterBottom
              className={classes.padding}
            >
              Колір: {color}
            </Typography>
            <Divider />
            <Typography
              variant='body1'
              gutterBottom
              className={classes.padding}
            >
              Ціна: {price} грн
            </Typography>
            <Divider />
            <Typography
              variant='body1'
              gutterBottom
              className={classes.padding}
            >
              Виробник: {brand}
            </Typography>
            <Divider />
            <Typography
              variant='body1'
              gutterBottom
              className={classes.padding}
            >
              Матеріал: {material}
            </Typography>
            <Divider />
            <Typography
              variant='body1'
              gutterBottom
              className={classes.padding}
            >
              Доступно: {countInStock}
            </Typography>
            <Divider />

            <Grid
              container
              direction='row'
              justify='space-around'
              alignItems='center'
              className={classes.padding}
            >
              {singleProduct.conuntInStock > 0 ? (
                <form noValidate autoComplete='off'>
                  <TextField
                    id='filled-number'
                    label='Кількість:'
                    type='number'
                    value={qty}
                    InputProps={{
                      inputProps: { min: 0, max: singleProduct.conuntInStock },
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => setQty(e.target.value)}
                  />
                </form>
              ) : null}
              <Button
                variant='contained'
                color='primary'
                disabled={singleProduct.conuntInStock <= 0}
                onClick={addToCartHandler}
              >
                {singleProduct.conuntInStock <= 0
                  ? 'Немає в наявності'
                  : 'Купити'}
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={5}>
        <Paper className={classes.paper}>
          <Typography variant='h6' gutterBottom>
            {'Цікаво знати'}
          </Typography>
          <Typography variant='body2' gutterBottom>
            {description}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  ) : (
    <Grid container xs justify='center' alignItems='center'>
      <CircularProgress size={80} />
    </Grid>
  );
};

export default ItemScreen;
