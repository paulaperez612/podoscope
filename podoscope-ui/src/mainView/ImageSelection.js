import React, { Component } from 'react';
import { Grid, Container, Typography, Paper } from '@material-ui/core';

export default class ImageSelection extends Component {
  render() {
    return (
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <Typography variant='h5' align='center'>
            Image select
          </Typography>
        </Grid>


        <Grid item xs={3}>
          <Typography variant='h5'>
            Back
          </Typography>
        </Grid>

        <Grid item xs={3}>
          <Paper>
            Im1
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            Im2
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            Im3
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Typography variant='h5'>
            Front
          </Typography>
        </Grid>

        <Grid item xs={3}>
          <Paper>
            Im1
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            Im2
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper>
            Im3
          </Paper>
        </Grid>

      </Grid>

    );
  }
}
