import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { list, deleteUser } from '../redux/userSlice';
import { CircularProgress } from '@material-ui/core';
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
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const UserScreen = ({ history }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const {
    userList,
    userInfo,
    loading = true,
  } = useSelector((state) => state.userLogin);
  // const { list, loading } = userList;
  console.log(userList);

  // const userDelete = useSelector((state) => state.userDelete);
  // const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(list());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  const deleteHandler = (id) => {
    console.log(id);
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id));
    }
    console.log('delete!');
  };

  return !userList ? (
    <Grid container xs justify='center' alignItems='center'>
      <CircularProgress size={80} />
    </Grid>
  ) : (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Користувачі</TableCell>
            <TableCell align='right'>ID</TableCell>
            <TableCell align='right'>Емейл</TableCell>
            <TableCell align='right'>Права</TableCell>
            <TableCell align='right' />
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((user) => (
            <TableRow key={user._id}>
              <TableCell component='th' scope='row'>
                {user.name}
              </TableCell>
              <TableCell align='right'>{user._id}</TableCell>
              <TableCell align='right'>{user.email}</TableCell>
              <TableCell align='right'>
                {user.isAdmin ? 'Адмін' : 'Користувач'}
              </TableCell>
              <TableCell align='right'>
                {
                  <IconButton
                    aria-label='delete'
                    color='secondary'
                    onClick={() => deleteHandler(user._id)}
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
  );
};
export default UserScreen;
