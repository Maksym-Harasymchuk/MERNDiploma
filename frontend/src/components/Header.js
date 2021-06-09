import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { logout } from '../redux/userSlice';

import clsx from 'clsx';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  makeStyles,
  MenuItem,
  Menu,
  fade,
  InputBase,
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
  Badge,
} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

const Header = () => {
  const {
    cart: { cartItems },
    userLogin: { userInfo },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [sideBar, setSideBar] = React.useState(false);
  let history = useHistory();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setSideBar(open);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const loginHandler = () => history.push('/login');
  const profileHandler = () => history.push('/profile');
  const usersHandler = () => history.push('/edit/users');
  const productsHandler = () => history.push('/edit/products');
  const logoutHandler = () => dispatch(logout());

  const itemsList = [
    {
      icon: '',
      text: 'МебліТОП',
      align: 'center',
      description: '',
      handleClick: () => history.push('/'),
      divider: true,
    },
    {
      icon: <ChevronRightIcon />,
      text: 'Профіль',
      align: '',
      description: 'Перевірте свої деталі',
      handleClick: () => profileHandler(),
      divider: false,
    },
    {
      icon: <ChevronRightIcon />,
      text: 'Корзина',
      align: '',
      description: 'Оформіть замовлення',
      handleClick: () => history.push('/cart'),
      divider: false,
    },
  ];

  const list = () => (
    <div
      className={classes.list}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {itemsList.map((item, index) => {
          const { text, align, description, handleClick, divider, icon } = item;
          return (
            <React.Fragment key={index}>
              <ListItem button onClick={handleClick} key={index}>
                {icon && (
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                )}
                <ListItemText
                  primary={text}
                  secondary={description}
                  align={align}
                />
              </ListItem>
              {divider && <Divider />}
            </React.Fragment>
          );
        })}
      </List>
    </div>
  );

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {userInfo ? (
        <>
          <MenuItem onClick={profileHandler}>Профіль</MenuItem>
          {userInfo.isAdmin && (
            <>
              <MenuItem onClick={usersHandler}>Користувачі</MenuItem>
              <MenuItem onClick={productsHandler}>Продукти</MenuItem>
            </>
          )}
          <MenuItem onClick={logoutHandler}>Вийти</MenuItem>
        </>
      ) : (
        <MenuItem onClick={loginHandler}>Увійти</MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Профіль</p>
      </MenuItem>
    </Menu>
  );
  return (
    <Box className={classes.grow} mb={1}>
      <AppBar position='static'>
        <Toolbar style={{ overflow: 'hidden' }}>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={sideBar} onClose={toggleDrawer(false)}>
            {list(sideBar)}
          </Drawer>
          <Typography className={classes.title} variant='h6' noWrap>
            Меблевий магазин
          </Typography>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
          <div className={classes.grow} />

          <IconButton aria-label='cart' onClick={() => history.push('/cart')}>
            <StyledBadge badgeContent={cartItems.length} color='secondary'>
              <ShoppingCartIcon style={{ fill: 'white' }} />
            </StyledBadge>
          </IconButton>

          <IconButton
            edge='end'
            aria-label='account of current user'
            aria-controls={menuId}
            aria-haspopup='true'
            onClick={handleProfileMenuOpen}
            color='inherit'
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Header;
