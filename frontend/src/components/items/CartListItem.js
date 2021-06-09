import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/cartSlice';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { Divider, Box, TextField, Paper } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // maxWidth: 752,
    margin: theme.spacing(1),
  },
  box: {
    display: 'flex',

    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  itemImg: {
    width: '45%',
    maxWidth: 200,
    height: 'auto',
    borderRadius: '5px',
  },

  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

export default function CartListItem({
  productId,
  image,
  name,
  price,
  qty,
  countInStock,
}) {
  console.log(productId, image, name, price, qty, countInStock);

  const dispatch = useDispatch();
  const classes = useStyles();

  const removeFromCartHandler = () => {
    dispatch(removeFromCart(productId));
  };
  const addToCartHandler = (e) => {
    qty = Number(e.target.value);
    if (qty < 1 || qty > countInStock) return;
    else dispatch(addToCart({ productId, qty }));
  };

  return (
    <Paper className={classes.root}>
      <ListItem>
        <img src={'../' + image} alt={'item img'} className={classes.itemImg} />

        <Box className={classes.box} p={2}>
          <ListItemText primary={name} />

          <ListItemText variant='subtitle1'>
            {Math.round(price) + ' грн'}
          </ListItemText>

          <ListItemText variant='body2' color='textSecondary'>
            <form noValidate autoComplete='off'>
              <TextField
                id='filled-number'
                label='Кількість:'
                type='number'
                value={qty}
                InputProps={{
                  inputProps: {
                    min: 1,
                    max: Number(countInStock),
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  addToCartHandler(e);
                }}
              />
            </form>
          </ListItemText>
        </Box>

        <ListItemSecondaryAction>
          <IconButton
            edge='end'
            aria-label='delete'
            onClick={removeFromCartHandler}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Paper>
  );
}
