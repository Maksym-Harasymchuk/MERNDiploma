import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { register } from '../redux/userSlice';
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
// import Link from '@material-ui/core/Link';
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
    height: 550,
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

const theme = createMuiTheme({
  // palette: {
  //   primary: { 500: '#337ab7' },
  // },
});

export default function RegisterScreen({ location, history }) {
  const [name, setName] = useState(' ');
  const [email, setEmail] = useState(' ');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  // console.log('email: ', email);
  // console.log('password: ', password);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  // console.log(userLogin.error);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) setMessage('Паролі не збігаються');
    else if (password === confirmPassword) {
      dispatch(register({ name, email, password }));
      setMessage(null);
    }
  };

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {/* <CardMedia
        component='img'
        alt='Contemplative Reptile'
        height='160'
        image={starsky}
        title='Contemplative Reptile'
      /> */}
      <CardContent>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <div className={classes.paper}>
            <form className={classes.form} onSubmit={submitHandler}>
              <ThemeProvider theme={theme}>
                <TextField
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  id='name'
                  label="Вашe ім'я"
                  name='name'
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
                {/* <Box mt={2}>
                  <FormControlLabel
                    control={<Checkbox value='remember' color='primary' />}
                    label='Remember me'
                  />
                </Box> */}
              </ThemeProvider>
              <Box style={{ textAlign: 'center' }}>
                {error && <Alert severity='error'>{error}</Alert>}
                {message && <Alert severity='error'>{message}</Alert>}
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                >
                  {loading ? <CircularProgress /> : 'Зареєструватися'}
                </Button>
              </Box>
              <Box mt={2}>
                <Grid container justifyContent={'center'}>
                  <Grid item xs>
                    {/* <Link
                      href='#'
                      variant='body2'
                      className={classes.footerLinks}
                    > */}
                    <Link
                      to={redirect ? `/login?redirect=${redirect}` : '/login'}
                    >
                      Увійти
                    </Link>
                    {/* </Link> */}
                  </Grid>
                  {/* <Grid item>
                    <Link
                      href='#'
                      variant='body2'
                      className={classes.footerLinks}
                    >
                      Forgot Password?
                    </Link>
                  </Grid> */}
                </Grid>
              </Box>
            </form>
          </div>
        </Container>
      </CardContent>
    </Card>
  );
}
