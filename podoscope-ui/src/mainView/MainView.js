import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

export default class MainView extends Component {
  render() {
    return (
      <Grid container spacing={3}>

        <Grid item xs={6}>
          <Paper >Lo de Mauro</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper >Lo de Millos</Paper>
        </Grid>

      </Grid>
    );
  }
}
