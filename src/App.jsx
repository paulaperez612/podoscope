import React, { Component } from 'react';
import './App.css';
import SignIn from './signIn/SignIn';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import MainView from './mainView/MainView';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: false };
    this.setAuthenticated = this.setAuthenticated.bind(this);
  }

  setAuthenticated(auth) {
    this.setState({ authenticated: auth }, () => {
      console.log(auth ? 'authenticated!' : 'logout!');
    });
  }

  render() {
    return (
      <Container width='100%' className='appContainer' >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}>
          {this.state.authenticated
            ? <MainView logout={() => this.setAuthenticated(false)} />
            : <SignIn authTrue={this.setAuthenticated} />
          }


        </Grid>
      </Container>



    );
  }
}
