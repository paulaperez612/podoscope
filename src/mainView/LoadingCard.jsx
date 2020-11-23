import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class LoadingCard extends Component {

    render (){
        return (
            <div>
                <Card className='waitingCard'>
                  <Grid className='gridWaiting'
                    container
                    spacing={4}
                    direction="column"
                    alignItems="center"
                    justify="space-around" >
                    <Grid item xs={12}>
                      <br />
                      <Typography variant="h5" component="h2" align='center'>
                        {this.props.renderText}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <CircularProgress />
                    </Grid>
                  </Grid>
                  <br />
                </Card >
            </div>
        )
    }
}

LoadingCard.propTypes = {
    renderText : PropTypes.string,
}