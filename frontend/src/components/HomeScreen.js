import React from 'react';
import ImageGallery from 'react-image-gallery';
import { Grid, Box, makeStyles, Typography } from '@material-ui/core';
import Item from './items/Item';
import { useSelector, useDispatch } from 'react-redux';
import { getTables } from '../redux/productSlice';
import { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import slider1 from '../slider1.jpg';
import slider2 from '../slider2.jpg';
import slider3 from '../slider3.jpg';

const images = [
  {
    original: slider1,
  },
  {
    original: slider2,
  },
  {
    original: slider3,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const HomeScreen = () => {
  const classes = useStyles();

  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTables());
  }, [dispatch]);

  return products ? (
    <Grid container spacing={0} direction={'column'} alignItems={'center'}>
      <Grid item md={9}>
        <Box m={1}>
          <ImageGallery
            items={images}
            showThumbnails={false}
            showFullscreenButton={false}
            showPlayButton={false}
            showBullets={true}
            autoPlay={true}
          />
        </Box>
      </Grid>
      <Grid container item spacing={1} className={classes.root}>
        <Typography align={'center'} variant={'subtitle1'} gutterBottom>
          Виберіть щось своє
        </Typography>
        <Grid container spacing={1}>
          {products.map((item) => (
            <Item
              image={item.image}
              name={item.name}
              desc={item.description}
              id={item._id}
              key={item._id}
            />
          ))}
        </Grid>
      </Grid>

      {/* <Grid container item spacing={1} className={classes.root}>
        <Typography align={'center'} variant={'subtitle1'} gutterBottom>
          Найпопулярніші серед столів
        </Typography>
        <Grid container spacing={1}>
          <Item />
          <Item />
          <Item />
        </Grid>
      </Grid> */}
    </Grid>
  ) : (
    <Grid container xs justify='center' alignItems='center'>
      <CircularProgress size={80} />
    </Grid>
  );
};

export default HomeScreen;
