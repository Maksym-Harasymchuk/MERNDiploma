import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import lizard from '../../lizard.jpg';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { removeFromCart } from '../../redux/cartSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: '10px auto',
  },
  image: {
    width: 200,
    height: 200,
  },
  img: {
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function CartItem({
  productId,
  image,
  name,
  price,
  qty,
  countInStock,
  id,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  console.log('countInStock', countInStock);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt='complex' src={'../' + image} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction='column' spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant='subtitle1'>
                  Standard license
                </Typography>
                <Typography variant='body2' gutterBottom>
                  Full resolution 1920x1080 • JPEG
                </Typography>
                <Typography variant='body2' color='textSecondary'>
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
                        qty = Number(e.target.value);
                        if (qty < 1 || qty > countInStock) return;
                        else dispatch(addToCart({ productId, qty }));
                      }}
                    />
                  </form>
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant='outlined'
                  onClick={() => {
                    console.log('click');
                  }}
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant='subtitle1'>
                {Math.round(price) + ' $'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
