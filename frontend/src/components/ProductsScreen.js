import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { list, deleteUser } from '../redux/userSlice';
import {
  getTables,
  deleteProductByID,
  createProduct,
} from '../redux/productSlice';
import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Grid from '@material-ui/core/Grid';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  typographyAligh: {
    display: 'inline-flex',
    alignItems: 'center',
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const ProductsScreen = ({ history }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const { open, vertical, horizontal } = state;
  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    loading = 'true',
    products,
    deleteProduct,
  } = useSelector((state) => state.products);
  const createdProduct = useSelector((state) => state.products.createdProduct);
  console.log(createdProduct);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getTables());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, deleteProduct, createdProduct]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProductByID(id));
      setState({ ...state, open: true });
    }
  };
  const createProductHandler = (id) => {
    console.log('create');

    dispatch(createProduct());
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setState({ ...state, open: false });
  };

  return loading ? (
    <Grid container xs justify='center' alignItems='center'>
      <CircularProgress size={80} />
    </Grid>
  ) : (
    <>
      <Snackbar
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        key={vertical + horizontal}
      >
        <Alert severity='success' onClose={handleClose}>
          Товар видалено!
        </Alert>
      </Snackbar>
      <Box className={classes.box} p={3}>
        <Typography className={classes.typographyAligh} variant={'h5'}>
          Товари
        </Typography>
        <IconButton onClick={() => createProductHandler()}>
          <AddCircleOutlineIcon color={'primary'} fontSize={'large'} />
        </IconButton>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>Назва</TableCell>
              <TableCell align='left'>Матеріл</TableCell>
              <TableCell align='left'>Розмір</TableCell>
              <TableCell align='left'>Вартість</TableCell>
              <TableCell align='left' />
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell align='left'>{product.name}</TableCell>
                <TableCell align='left'>{product.material}</TableCell>
                <TableCell align='left'>{product.size}</TableCell>
                <TableCell align='left'>{product.price} грн</TableCell>
                <TableCell align='right'>
                  {
                    <IconButton
                      aria-label='delete'
                      color='secondary'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProductsScreen;
