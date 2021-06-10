import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../redux/orderSlice';
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
  Tabs,
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Alert from '@material-ui/lab/Alert';
import CssBaseline from '@material-ui/core/CssBaseline';

import Container from '@material-ui/core/Container';
import { update } from '../redux/userSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  table: {
    minWidth: 320,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: '100%',
    flexGrow: 1,
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
  tableBody: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
}));

const UserScreen = ({ history, match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userInfo, success } = useSelector((state) => state.userLogin);
  const { myOrders } = useSelector((state) => state.order);
  const loading = false;

  const [name, setName] = useState(' ');
  const [email, setEmail] = useState(' ');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!userInfo || !userInfo.name) history.push('/login');
    else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
    dispatch(getMyOrders());
  }, [userInfo, history, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) setMessage('Паролі не співпадають');
    else dispatch(update({ id: userInfo._id, name, email, password }));
  };

  return !loading ? (
    <Grid container className={classes.root} spacing={2} justify='center'>
      <Grid container xs={12} md={7} item spacing={0} direction={'column'}>
        <Paper className={classes.root}>
          <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <Typography variant={'h5'} align={'center'}>
              Ваші дані
            </Typography>
            <div className={classes.paper}>
              <form className={classes.form} onSubmit={submitHandler}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  id='name'
                  label="Вашe ім'я"
                  name='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
                <TextField
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  id='email'
                  label='Ваш емейл'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  name='password'
                  label='Ваш пароль'
                  type='password'
                  id='password'
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  name='confirmPassword'
                  label='Підтвердіть пароль'
                  type='password'
                  id='confirmPassword'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Box style={{ textAlign: 'center' }}>
                  {success && (
                    <Alert severity='success'>{'Дані оновлено.'}</Alert>
                  )}
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    style={{ marginTop: '15px' }}
                    className={classes.submit}
                  >
                    {loading ? <CircularProgress /> : 'Оновити дані'}
                  </Button>
                </Box>
              </form>
            </div>
          </Container>
        </Paper>
      </Grid>
      <Grid container xs={12} item direction={'column'}>
        {myOrders[0] ? (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Ваші покупки:</TableCell>
                  <TableCell align='right'>Кількість предметів</TableCell>
                  <TableCell align='right'>Коли</TableCell>
                  <TableCell align='right'>Вартість</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myOrders.map((item) => (
                  <TableRow key={item.orderItems[0].name_id}>
                    <TableCell component='th' scope='row'>
                      {item.orderItems[0].name}
                    </TableCell>
                    <TableCell align='right'>
                      {item.orderItems[0].qty}
                    </TableCell>
                    <TableCell align='right'>
                      {item.date.substring(0, 10)}
                    </TableCell>
                    <TableCell align='right'>{item.totalPrice}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box className={classes.tableBody}>
            <Typography variant={'h6'}>Ви ще нічого не купували.</Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  ) : (
    <Grid container xs alignContent='center'>
      <CircularProgress size={80} />
    </Grid>
  );
};

export default UserScreen;
