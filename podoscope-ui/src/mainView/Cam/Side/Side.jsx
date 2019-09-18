import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core';

export default class Side extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      action: 0
    };
    this.setAction = this.setAction.bind(this);
  }

  setAction(action) {
    return () => {
      this.setState((prevState) => ({
        action: prevState.action === action ? 0 : action
      }), () => {
        this.props.setAction(action);
      });
    }
  }

  render() {
    return (
      <Grid container direction="column" className="cam-btn-container">
        <Grid item xs={3}>
          <Button
            className={"cam-btn"}
            color={(this.state.action === 1 ? 'secondary' : 'primary')}
            variant="contained"
            onClick={this.setAction(1)}>x</Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            className={"cam-btn"}
            color={(this.state.action === 2 ? 'secondary' : 'primary')}
            variant="contained"
            onClick={this.setAction(2)}>x</Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            className={"cam-btn"}
            color={(this.state.action === 3 ? 'secondary' : 'primary')}
            variant="contained"
            onClick={this.setAction(3)}>x</Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            className={"cam-btn"}
            color={(this.state.action === 4 ? 'secondary' : 'primary')}
            variant="contained">x</Button>
        </Grid>
      </Grid>
    );
  }
}

Side.propTypes = {
  setAction: PropTypes.func.isRequired
}
