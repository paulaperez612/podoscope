import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Switch } from '@material-ui/core';


export default class Info extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      leftAngle: undefined,
      rightAngle: undefined,
      action: false
    };

    this.setAction = this.setAction.bind(this);
  }

  update(side, angle) {
    if (side === 0) {
      this.setState({ leftAngle: angle });
    } else {
      this.setState({ rightAngle: angle });
    }
  }

  getState() {
    const data = {};
    data.leftAngle = this.state.leftAngle;
    data.rightAngle = this.state.rightAngle;
    return data;
  }

  updateState(data) {
    this.setState(prevState => {
      const rta = prevState;

      rta.leftAngle = data && data.leftAngle;
      rta.rightAngle = data && data.rightAngle;
      rta.action = false;

      return rta;
    });
  }

  setAction(e) {
    this.props.onSideChange(e.target.checked);
    this.setState({ action: e.target.checked });
  }

  resetInfo() {
    this.setState({
      leftAngle: undefined,
      rightAngle: undefined,
      action: false
    });
  }

  render() {
    return (
      <Grid container className="switch-container" alignItems='center' justify='center'>
        <Grid item xs={4} >
          <Typography align='center' >{this.state.leftAngle || '-'}°</Typography>
          <Typography align='center' variant="h5" component="h3">Left</Typography>
        </Grid>

        <Switch color="primary" onChange={this.setAction} checked={this.state.action} />

        <Grid item xs={4}>
          <Typography align='center'>{this.state.rightAngle || '-'}°</Typography>
          <Typography align='center' variant="h5" component="h3">Right</Typography>
        </Grid>
      </Grid>
    );
  }
}

Info.propTypes = {
  onSideChange: PropTypes.func.isRequired
};
