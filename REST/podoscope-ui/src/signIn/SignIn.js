import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Copyright from './Copyright';

import PropTypes from 'prop-types';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', failed: false };



    this.verifyAuth = this.verifyAuth.bind(this);
  }

  verifyAuth() {
    console.log(process.env.REACT_APP_USERNAME);
    console.log(process.env.REACT_APP_PASSWORD);
    if (this.state.username === process.env.REACT_APP_USERNAME && this.state.password === process.env.REACT_APP_PASSWORD) {
      this.props.authTrue();
    }
    else {
      console.log('pailas');
      this.setState({username:'',password:'',failed:true});
    }
    // if(process.env.DB_HOST == )
  }


  render() {
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div>

          <Typography component='h1' variant='h5' align='center'>
            Sign in
          </Typography>
          {/* <form
            // className={classes.form} 
            noValidate
          > */}
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='username'
            label='User name'
            name='username'
            // autoComplete='email'
            value={this.state.username}
            onChange={(x) => this.setState({ username: x.target.value })}
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
            value={this.state.password}
            onChange={(x) => this.setState({ password: x.target.value })}

          // autoComplete='current-password'

          />


          <Button
            // type='submit'
            fullWidth
            variant='contained'
            color='primary'
            onClick={this.verifyAuth}
          >
            Sign In
          </Button>
          <br />
          <br />
          {this.state.failed ?
            <Typography color='error' align='center'>
              Incorrect username or password, please try again
            </Typography> :
            <br />
          }

          {/* </form> */}
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

SignIn.propTypes = {
  authTrue: PropTypes.func.isRequired,
}
