import React from 'react';

import { Typography, Grid, Switch } from '@material-ui/core';

export default class Info extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      leftAngle: undefined,
      rightAngle: undefined
    };
  }

  update(side, angle) {
    if (side === 0) {
      this.setState({ leftAngle: angle });
    } else {
      this.setState({ rightAngle: angle });
    }
  }

  render() {
    return (
      <Grid item xs={11} className="switch-container">
        <Grid item >
          <Typography>{this.state.leftAngle || '-'}°</Typography>
          <Typography>Left</Typography>
        </Grid>
        <Switch color="primary" />
        <Grid item>
          <Typography>{this.state.rightAngle || '-'}°</Typography>
          <Typography>Right</Typography>
        </Grid>
      </Grid>
    );
  }
}

Info.propTypes = {

}
