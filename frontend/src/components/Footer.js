import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography
      variant='body1'
      color='textSecondary'
      align='center'
      style={{ color: 'white' }}
    >
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Меблевий магазин
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {
  return (
    <Box py={3} bgcolor='primary.main' mt={3} component={'footer'}>
      <Copyright />
    </Box>
  );
}
