import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

export default class Down extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      photo: undefined
    };
    this.reset = this.reset.bind(this);
  }

  updateButtons(action) {
    this.setState({ hasPhoto: action });
  }

  click(action) {
    return () => {
      action ? this.props.takePicture() : this.props.cancelPicture();
      this.setState({ photo: action });
    };
  }

  reset(hasPhoto) {
    this.setState({ photo: hasPhoto });
  }

  render() {
    return (
      <>
        {
          !this.state.photo
            ? <Button color="secondary" variant="contained" onClick={this.click(true)}>Snap</Button>
            : (
              <>
                <Button color="secondary" variant="contained" onClick={this.click(false)}>Cancel</Button>
                <Button color="secondary" variant="contained" onClick={this.props.savePicture}>Save</Button>
              </>
            )
        }
      </>
    );
  }
}

Down.propTypes = {
  takePicture: PropTypes.func.isRequired,
  cancelPicture: PropTypes.func.isRequired,
  savePicture: PropTypes.func.isRequired
};
