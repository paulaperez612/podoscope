import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Copyright from './Copyright';
import CryptoJS from 'crypto-js';

import PropTypes from 'prop-types';
import { genericGet } from '../utils/requestsManager';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', failed: false };
    this.verifyAuth = this.verifyAuth.bind(this);
  }

  serializeObject(obj) {
    const str = [];
    Object.entries(obj).forEach(e => {
      if (Object.prototype.hasOwnProperty.call(obj, e[0])) {
        if (typeof e[1] === 'object') {
          str.push(encodeURIComponent(e[0]) + '=' + JSON.stringify(e[1]));
        } else {
          str.push(encodeURIComponent(e[0]) + '=' + encodeURIComponent(e[1]));
        }
      }
    });
    return str.join('&');
  }

  verifyAuth() {
    const host = 'http://podosys.soel.com.co/service/v2/rest.php';
    const queries = {
      method: 'login',
      input_type: 'JSON',
      response_type: 'JSON',
      rest_data: {
        user_auth: {
          user_name: this.state.username,
          password: CryptoJS.MD5(this.state.password).toString()
        },
        application_name: '',
        name_value_list: [{
          name: 'notifyonsave',
          value: 'true'
        }]
      }
    };

    const endpoint = `${host}?${this.serializeObject(queries)}`;
    genericGet(endpoint, (rta) => {
      rta.json()
        .then((data) => {
          localStorage.setItem('sid', data.id);
          this.props.authTrue();
        });
    }, () => {
      this.setState({ username: '', password: '', failed: true });
    });

    // TODO: Remove when CORS available
    this.props.authTrue();
  }

  render() {
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div>
          <Typography component='h1' variant='h5' align='center'>
            Sign in
          </Typography>
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
            fullWidth
            variant='contained'
            color='primary'
            onClick={this.verifyAuth}>
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
};
