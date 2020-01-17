import React from 'react';
import PropTypes from 'prop-types';
import { Button, Drawer, ListItem, ListItemText, ListItemIcon, Typography, TextField, Fab } from '@material-ui/core';
import { Settings as SettingIcon, ExitToApp as ExitToAppIcon, ArrowBack } from '@material-ui/icons';
import './Menu.css';

export default class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.state = {
      open: false
    };
  }

  toggleDrawer(open) {
    return event => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      this.setState({ open });
    };
  }

  logOut() {
    localStorage.setItem('sid', undefined);
    this.toggleDrawer(false);
    this.props.logout();
  }

  render() {
    return (
      <>
        <Fab
          id="open-draw"
          color="primary"
          aria-label="add"
          className="fab"
          onClick={this.toggleDrawer(true)}>
          <SettingIcon />
        </Fab>
        <Drawer open={this.state.open} onClose={this.toggleDrawer(false)}>
          <Button onClick={this.toggleDrawer(false)} color="secondary" id="draw-back">
            <ArrowBack />
          </Button>
          <div
            role="presentation">
            <div>
              <Typography align="center" gutterBottom={true} id="threshold-title">
                Threshold
              </Typography>
              <div id="menu-threshold-sett">
                <TextField
                  required
                  id="outlined-required"
                  label="Both sides"
                  value={this.props.threshold.value}
                  variant="outlined"
                  type="number"
                  onChange={e => {
                    this.props.setThreshold(e.target.value);
                    +e.target.value === 0 && e.target.select();
                  }}
                  onFocus={e => e.target.select()}
                />
              </div>
            </div>
            <ListItem
              button
              id="logout-btn"
              onClick={() => this.logOut()}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={'Log out'} />
            </ListItem>
          </div>
        </Drawer>
      </>
    );
  }
}

Menu.propTypes = {
  logout: PropTypes.func.isRequired,
  threshold: PropTypes.object.isRequired,
  setThreshold: PropTypes.func.isRequired
};
