import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Fab } from '@material-ui/core';
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
      this.setState(
        prevState => ({
          action: prevState.action === action ? 0 : action
        }),
        () => {
          this.props.setAction(action);
          if (action === 4) {
            this.setState({ action: 0 });
          }
        });
    };
  }

  makeButton(action, icon, alt) {
    return (
      <Grid item xs={3}>
        <Fab
          variant="extended"
          color={(this.state.action === action ? 'secondary' : 'primary')}
          aria-label={alt}
          className={'cam-btn'}
          onClick={this.setAction(action)}>
          {icon}
        </Fab>
      </Grid>
    );
  }

  render() {
    return (
      <Grid container direction="column" className="cam-btn-container">
        {this.makeButton(1, <MoreVertIcon />, 'Draw line')}
        {this.makeButton(2, <FiberManualRecordIcon />, 'Draw point')}
        {this.makeButton(3, <CreateIcon />, 'Draw')}
        {this.makeButton(4, <UndoIcon />, 'Undo draw')}
      </Grid>
    );
  }
}

Side.propTypes = {
  setAction: PropTypes.func.isRequired
};
