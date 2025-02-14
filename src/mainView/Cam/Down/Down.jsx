import React from 'react';
import PropTypes from 'prop-types';

import { Fab } from '@material-ui/core';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';
import './Down.css';

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
        {!this.state.photo
          ? <Fab className="Botonesimg"

            color="primary"
            aria-label="take picture"
            onClick={this.click(true)}>
            <CameraAltIcon />
          </Fab>
          : (<>
            <Fab className="Botonesimg"

              color="secondary"
              aria-label="cancel"
              onClick={this.click(false)}>
              <ClearIcon />
            </Fab>
            <Fab className="Botonesimg"

              color="secondary"
              aria-label="save"
              onClick={this.props.savePicture}
              disabled={this.props.patientCedula === '-'}>
              <SaveIcon />
            </Fab>
          </>)
        }
      </>
    );
  }
}

Down.propTypes = {
  takePicture: PropTypes.func.isRequired,
  cancelPicture: PropTypes.func.isRequired,
  savePicture: PropTypes.func.isRequired,
  patientCedula: PropTypes.string.isRequired

};
