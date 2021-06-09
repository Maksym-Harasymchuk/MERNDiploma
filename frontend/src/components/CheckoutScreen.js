import React from 'react';
import { saveShippingAddress } from '../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import {
  makeStyles,
  withStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import TextField from '@material-ui/core/TextField';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Дані вашої карточки', 'Ваша адреса', 'Тип доставки'];
}

const firstStep = () => (
  <form>
    <TextField
      variant='outlined'
      margin='normal'
      fullWidth
      id='name'
      label="Вашe ім'я"
      name='name'
      // onChange={(e) => setName(e.target.value)}
      autoFocus
    />

    <TextField
      variant='outlined'
      margin='normal'
      fullWidth
      name='confirmPassword'
      label='Підтвердіть пароль'
      type='password'
      id='confirmPassword'
      // onChange={(e) => setConfirmPassword(e.target.value)}
    />
  </form>
);

function getStepContent(step) {
  switch (step) {
    case 0:
      return firstStep;
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

export function CustomizedSteppers() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(1);
  const [address, setAddress] = React.useState(1);
  const [city, setCity] = React.useState(1);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container justify='center'>
        {activeStep === steps.length ? (
          <Grid item>
            <Typography className={classes.instructions}>
              Замовлення оформлено успішно
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Скасувати введені дані
            </Button>
          </Grid>
        ) : (
          <Grid item>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <Grid container justify='space-around'>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Назад
              </Button>
              <Button
                variant='contained'
                color='primary'
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Готово' : 'Дальше'}
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

const CheckoutScreen = () => {
  const classes = useStyles();

  const shippingAddress = useSelector((state) => state.cart.shippingAddress);
  const dispatch = useDispatch();

  const [address, setAddress] = React.useState(shippingAddress.address);
  const [city, setCity] = React.useState(shippingAddress.city);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city }));
  };

  return (
    <Grid container alignItems='center' justify='center' direction='column'>
      <form onSubmit={submitHandler}>
        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          value={address}
          id='address'
          label='Ваша адреса'
          name='address'
          onChange={(e) => setAddress(e.target.value)}
          autoFocus
        />

        <TextField
          variant='outlined'
          margin='normal'
          fullWidth
          value={city}
          name='city'
          label='Ваше місто'
          id='city'
          onChange={(e) => setCity(e.target.value)}
        />

        <Button
          type='submit'
          variant='contained'
          color='primary'
          className={classes.submit}
        >
          {'Підтвердити'}
        </Button>
      </form>
      <Grid item></Grid>
    </Grid>
  );
};

export default CheckoutScreen;
