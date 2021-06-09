import { FormHelperText, Grid, Paper } from '@material-ui/core';
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Item from './components/items/Item';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import ItemScreen from './components/ItemScreen';
import CartScreen from './components/CartScreen';
import LoginScreen from './components/LoginScreen';
import UsersScreen from './components/UsersScreen';
import RegisterScreen from './components/RegisterScreen';
import UserScreen from './components/UserScreen';
import ProductsScreen from './components/ProductsScreen';
import CustomizedSteppers from './components/CheckoutScreen';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    // [theme.breakpoints.down('sm')]: {
    //   overflowY: 'scroll',
    //   '&::-webkit-scrollbar': {
    //     width: 0,
    //   },
    // },
    overflowX: 'hidden',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: 0,
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
}));

function App() {
  const classes = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Router>
      <Grid container direction='column' className={classes.root}>
        <Grid item>
          <Header />
        </Grid>
        <Grid item container spacing={isSmall ? 0 : 4} wrap='nowrap'>
          <Grid item xs={false} md={2} />

          <Grid item xs={12} md={8} container>
            <Route path='/' component={HomeScreen} exact />
            {/* <Route path='/lizka' component={Item} />
            <Route path='/krisla' component={Item} /> */}
            <Route path='/products/:id' component={ItemScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={UserScreen} />
            <Route path='/edit/users' component={UsersScreen} />
            <Route path='/edit/products' component={ProductsScreen} />
            <Route path='/shipping' component={CustomizedSteppers} />
            <Route path='*' render={() => <Redirect to='/' />} />
          </Grid>

          <Grid item xs={false} md={2} />
        </Grid>

        <Grid item className={classes.footer}>
          <Footer />
        </Grid>
      </Grid>
    </Router>
  );
}

export default App;
