import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import UserCard from './UserCard';
import ImageSelection from './ImageSelection';
import CamCanvas from "./Cam/CamCanvas";

export default class MainView extends Component {

  render() {

    return (
      // try justify center and space around
      <Grid container spacing={0} justify='space-around' >

        <Grid item xs={4} >

          <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center">
            <Grid item xs={12}>

              <UserCard/>
            </Grid>
            <br/>
            <Grid item xs={12}>

              <ImageSelection/>
            </Grid>
          </Grid>

        </Grid>
        <Grid item xs={5}>
          <CamCanvas/>
        </Grid>

      </Grid>
    );
  }
}
