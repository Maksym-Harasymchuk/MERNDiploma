import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    minHeight: 300,
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
  },
  secondFlex: {
    display: 'flex',
    flexStretch: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  thirdFlex: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  img: {
    minWidth: 100,
    maxHeight: 'auto',
  },
});

export default function ImgMediaCard({ image, title, desc, id, name }) {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Grid item sm={4} xs={12} className={classes.root}>
      <Card className={classes.secondFlex}>
        <CardActionArea className={classes.thirdFlex}>
          <CardMedia
            component='img'
            alt='Contemplative Reptile'
            image={image}
            title='Contemplative Reptile'
            className={classes.img}
          />
          <CardContent>
            {/* <Typography gutterBottom variant='h5' component='h2'>
              {title}
            </Typography> */}
            <Typography variant='body2' color='textSecondary' component='p'>
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing={true}>
          {/* <Button size='small' color='primary'>
            Share
          </Button> */}
          <Button
            size='small'
            color='primary'
            onClick={() => history.push(`/products/${id}`)}
          >
            Дізнатися більше
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
