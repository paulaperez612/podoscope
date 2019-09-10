import React, { Component } from 'react';
import './App.css';
import SignIn from './signIn/SignIn';
import Grid from '@material-ui/core/Grid';
import MainView from './mainView/MainView';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: false };
    this.setAuthenticatedTrue = this.setAuthenticatedTrue.bind(this); 
  }

  setAuthenticatedTrue(){
    console.log('authenticated!');
    this.setState({authenticated:true});
  }

  render() {

    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >

        {
          this.state.authenticated ?
            <MainView/>
            :
            <SignIn authTrue={this.setAuthenticatedTrue} />

        }

      </Grid>


    );
  }
}

