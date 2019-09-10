import React from 'react';
import './App.css';
import SignIn from './signIn/SignIn';
import Grid from '@material-ui/core/Grid';


function App() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
      <SignIn />

    </Grid>

    
  );
}

export default App;
