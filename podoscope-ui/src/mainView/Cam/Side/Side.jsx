import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, IconButton, Fab } from '@material-ui/core';

import CreateIcon from '@material-ui/icons/Create';
import UndoIcon from '@material-ui/icons/Undo';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
        if (action === 4) {
          this.setState({ action: 0 });
        }
      });
    };
  }

  render() {
    return (
      <Grid container direction="column" className="cam-btn-container">
        <Grid item xs={3}>

          <Fab
            variant="extended"
            color={(this.state.action === 1 ? 'secondary' : 'primary')}
            aria-label="Draw point"
            className={'cam-btn'}
            onClick={this.setAction(1)}>
            <MoreVertIcon />
          </Fab>
        </Grid>
        <Grid item xs={3}>

          <Fab
            variant="extended"
            color={(this.state.action === 2 ? 'secondary' : 'primary')}
            aria-label="Draw point"
            className={'cam-btn'}
            onClick={this.setAction(2)}>
            <FiberManualRecordIcon />
          </Fab>
        </Grid>
        <Grid item xs={3}>


          <Fab
            variant="extended"
            color={(this.state.action === 3 ? 'secondary' : 'primary')}
            aria-label="draw"
            className={'cam-btn'}
            onClick={this.setAction(3)}>
            <CreateIcon />
          </Fab>
        </Grid>
        <Grid item xs={3}>
          <Fab
            variant="extended"
            color={('primary')}
            aria-label="undo draw"
            className={'cam-btn'}
            onClick={this.setAction(4)}>
            <UndoIcon />
          </Fab>
        </Grid>
      </Grid>
    );
  }
}

Side.propTypes = {
  setAction: PropTypes.func.isRequired
};
