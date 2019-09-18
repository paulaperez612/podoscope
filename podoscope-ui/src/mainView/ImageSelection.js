import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import ImageCard from './ImageCard';

export default class ImageSelection extends Component {
  render() {
    return (
      <Grid container spacing={2} alignItems='center'>

        <Grid item xs={12}>
          <Typography variant='h5' align='center'>
            Image select
          </Typography>
        </Grid>


        <Grid item xs={2}>
          <Typography variant='h5'>
            Back
          </Typography>
        </Grid>

        <Grid item xs={3}>
          <ImageCard cardCaption='Chaplin Pos' />
        </Grid>
        <Grid item xs={3}>
          <ImageCard cardCaption='Chaplin Pos Raise Toes Up' />
        </Grid>
        <Grid item xs={3}>
          <ImageCard cardCaption='Insoles' />
        </Grid>

        <Grid item xs={2}>
          <Typography variant='h5'>
            Front
          </Typography>
        </Grid>

        <Grid item xs={3}>
          <ImageCard />
        </Grid>
        <Grid item xs={3}>
          <ImageCard />
        </Grid>
        <Grid item xs={3}>
          <ImageCard />
        </Grid>

        <Grid item xs={2}>

        </Grid>

        <Grid item xs={3}>
          <Typography align='center' variant='body2'>
            Chaplin Pos
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography align='center' variant='body2'>
            Chaplin Pos 
            <br/>
            Raise Toes Up
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography align='center' variant='body2'>
            Insoles
          </Typography>
        </Grid>


      </Grid>

    );
  }
}
