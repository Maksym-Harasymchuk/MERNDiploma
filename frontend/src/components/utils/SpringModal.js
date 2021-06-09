import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Paper, Backdrop, Button, Typography } from '@material-ui/core';
import { useSpring, animated } from 'react-spring';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    flexDirection: 'column',
  },
  textColor: {
    color: '#179054',
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

export default function SpringModal({
  name,
  disabled,
  backToMainScreenHandler,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant='contained'
        color='primary'
        disabled={disabled}
        onClick={handleOpen}
      >
        {name}
      </Button>
      <Modal
        aria-labelledby='spring-modal-title'
        aria-describedby='spring-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Paper className={classes.paper}>
            <Typography
              variant={'h6'}
              align={'center'}
              id='spring-modal-title'
              gutterBottom={true}
              className={classes.textColor}
            >
              Замовлення успішно підтверджено!
            </Typography>
            {/* <p id='spring-modal-description'>react-spring animates me.</p> */}
            <Button
              variant='outlined'
              color='primary'
              onClick={backToMainScreenHandler}
            >
              Повернутися на головний екран
            </Button>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}
