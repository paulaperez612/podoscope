import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import { makeStyles, useTheme } from '@material-ui/core/styles';


import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import UserCard from './UserCard';
import ImageSelection from './ImageSelection';
import CamCanvas from './Cam/CamCanvas';
import CreateUser from './CreateUser';
import Drops from './Drops';
import MyObservations from './MyObservations';
import { postPodImage } from '../utils/requestsManager';

import './MainView.css';


export default class MainView extends Component {

  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
    this.imageselRef = React.createRef();
    this.obsRef = React.createRef();
    this.shoeRef = React.createRef();

    this.state = {
      open: false,
      user: {
        name: '-',
        cedula: '-',
        cellphone: '-',
        email: '-',
        dob: '-',
        sex: '-',
        left: {},
        right: {}
      },
      feet: {
        left: {
          footprintType: 'NEUTRO',
          heelType: 'NEUTRO',
          footType: 'NEUTRO'
        },
        right: {
          footprintType: 'NEUTRO',
          heelType: 'NEUTRO',
          footType: 'NEUTRO'
        }
      }

    };
    this.toggleModal = this.toggleModal.bind(this);
    this.savePhoto = this.savePhoto.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this.setUser = this.setUser.bind(this);
    this.setFeetInfo = this.setFeetInfo.bind(this);

    this.imageIndex = 0;
    this.images = [{}, {}, {}, {}, {}, {}];
    this.observations = 'aaaaa';
  }

  setFeetInfo(data) {
    this.setState({ feet: data });
  }



  selectImage(index) {
    this.imageIndex = index;
    this.canvasRef.setImg(this.images[this.imageIndex]);
  }

  toggleModal() {
    this.setState((prevState) => ({ open: !prevState.open }));
  }

  setUser(newUser) {
    this.setState({ user: newUser });
  }

  savePhoto(data) {
    if (this.imageIndex >= 0) {
      this.images[this.imageIndex] = data;
      this.imageselRef.updateImage(this.imageIndex, data.image);
    }
    postPodImage(Object.assign(this.state,
      {
        imgData: data,
        observations: this.obsRef.current,
        shoeSize: this.shoeRef.current,
        imId:this.imageIndex
      }), () => { }, () => { });


  }

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
                <UserCard user={this.state.user} shoeRef={this.shoeRef} />
              </Grid>
              <br />
              <Grid item xs={12}>
                <ImageSelection selectImage={this.selectImage} ref={r => this.imageselRef = r} />
              </Grid>
              <br />
              <Grid item xs={12}>
                <Drops feetInfo={this.state.feet} setFeetInfo={this.setFeetInfo} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <CamCanvas savePhoto={this.savePhoto} ref={r => this.canvasRef = r} />

            <MyObservations obsRef={this.obsRef} />

          </Grid>

        </Grid>

        <Fab
          color="primary"
          aria-label="add"
          className="fab"
          onClick={() => this.setState({ open: true })}>
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
          BackdropProps={{ timeout: 200 }}>
          <Fade
            in={this.state.open}
            className='modalContent'>
            <CreateUser toggleModal={this.toggleModal} setUser={this.setUser} />
          </Fade>
        </Modal>
      </div>
    );
  }
}
