import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';


import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import UserCard from './UserCard';
import ImageSelection from './ImageSelection';
import CamCanvas from "./Cam/CamCanvas";
import CreateUser from './CreateUser';

import './MainView.css';




export default class MainView extends Component {

  constructor(props) {
    super(props);

    this.state = { open: false };
  }

  // classes = useStyles();  

  render() {


    return (
      // try justify center and space around
      <div className='mainViewDiv'>
        <Grid container spacing={0} justify='space-around' >

          <Grid item xs={4} >

            <Grid container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center">
              <Grid item xs={12}>

                <UserCard />
              </Grid>
              <br />
              <Grid item xs={12}>

                <ImageSelection />
              </Grid>
            </Grid>

          </Grid>
          <Grid item xs={5}>
            <CamCanvas />
          </Grid>

        </Grid>

        <Fab
          color="primary"
          aria-label="add"
          className="fab"
          onClick={() => this.setState({ open: true })}
        >
          <AddIcon />
        </Fab>


        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className="modal"
          open={this.state.open}
          onClose={() => this.setState({ open: true })}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade 
            in={this.state.open}
            className='modalContent'
          >
            <CreateUser />

          </Fade>
        </Modal>
      </div>
    );
  }
}
