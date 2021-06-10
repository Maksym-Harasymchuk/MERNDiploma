import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { login } from '../redux/userSlice';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import { green } from '@material-ui/core/colors';
import starsky from '../starsky.jpg';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 420,
    height: 580,
    margin: '100px auto',
    borderRadius: '15px',
  },

  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    // backgroundColor: 'black',
    borderRadius: '25px',
    height: '50px',
    width: '150px',
    fontSize: '15px',
    '&:hover': {
      backgroundColor: 'black',
      borderColor: 'black',
      boxShadow: 'none',
    },
  },
  footerLinks: {
    color: 'black',
  },
  cardMedia: {
    position: 'relative',
  },
}));

export default function LoginScreen({ location, history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        component='img'
        alt='Contemplative Reptile'
        height='160'
        image={starsky}
        title='Contemplative Reptile'
      />
      {error && <Alert severity='error'>{error}</Alert>}
      <CardContent>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <div className={classes.paper}>
            <form className={classes.form} onSubmit={submitHandler}>
              <ThemeProvider>
                <TextField
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  id='email'
                  label='Ваш емейл'
                  name='email'
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
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
              </ThemeProvider>
              <Box style={{ textAlign: 'center' }}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                >
                  {loading ? <CircularProgress /> : 'Увійти'}
                </Button>
              </Box>
              <Box mt={2}>
                <Grid container justify={'center'}>
                  <Link
                    to={
                      redirect ? `/register?redirect=${redirect}` : '/register'
                    }
                  >
                    Зареєструватися
                  </Link>
                </Grid>
              </Box>
            </form>
          </div>
        </Container>
      </CardContent>
    </Card>
  );
}
