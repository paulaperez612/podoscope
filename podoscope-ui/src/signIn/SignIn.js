import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Copyright from './Copyright';


export default class SignIn extends Component {
  constructor(props) {
    super(props);

  }



  render() {
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div>

          <Typography component='h1' variant='h5' align='center'>
            Sign in
          </Typography>
          <form
          // className={classes.form} 
          // noValidate
          >
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />


            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              onClick={this.props.authTrue}
            >
              Sign In
            </Button>

          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
        <Typography variant='body2' color='textSecondary' align='center'>
          Icons made by Freepik from https://www.flaticon.com
        </Typography>


      </Container>);
  }
}
