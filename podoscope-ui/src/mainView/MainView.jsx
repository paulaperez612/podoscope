import React, { Component } from 'react';
import './MainView.css';

import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import InfoIcon from '@material-ui/icons/Info';

import UserCard from './UserInfo/UserCard';
import ImageSelection from './UserInfo/ImageSelection';
import CamCanvas from './Cam/CamCanvas';
import SearchUser from './SearchUser';
import Drops from './UserInfo/Drops/Drops';
import MyObservations from './UserInfo/MyObservations';
import ImageModal from './ImageModal/ImageModal';

import { postPodImage } from '../utils/requestsManager';


export default class MainView extends Component {

  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
    this.imageselRef = React.createRef();
    this.obsRef = React.createRef();
    this.obsRefReal = React.createRef();
    this.shoeRef = React.createRef();
    this.dropsRef = React.createRef();

    this.state = {
      open: false,
      openImage: false,
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
      },
      shoeSize: 40
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toogleImageModal = this.toogleImageModal.bind(this);
    this.savePhoto = this.savePhoto.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this.setUser = this.setUser.bind(this);
    this.setFeetInfo = this.setFeetInfo.bind(this);
    this.setShoeSize = this.setShoeSize.bind(this);

    this.imageIndex = -1;
    this.images = [{}, {}, {}, {}, {}, {}];
    this.observations = '--';
  }

  setShoeSize(newShoeSize) {
    this.setState({ shoeSize: newShoeSize });
  }

  setFeetInfo(data) {
    this.setState({ feet: data });
  }

  toogleImageModal() {
    this.setState(prevState => ({ openImage: !prevState.openImage }));
  }

  selectImage(index) {
    this.imageIndex = index;
    this.canvasRef.setImg(this.images[this.imageIndex]);
  }

  toggleModal() {
    this.setState((prevState) => ({ open: !prevState.open }));
  }

  setUser(newUser) {
    this.setState(
      {
        user: newUser,
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
      },
      () => {
        this.canvasRef.resetInfo();
        this.obsRefReal.resetInfo('');
      });
  }

  savePhoto(data) {
    if (this.imageIndex >= 0) {
      this.images[this.imageIndex] = data;
      this.imageselRef.updateImage(this.imageIndex, data.image);

      postPodImage(Object.assign(this.state,
        {
          imgData: data,
          observations: this.obsRef.current,
          shoeSize: this.shoeRef.current,
          imId: this.imageIndex
        }), () => { }, () => { });
    }
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
                <UserCard user={this.state.user} setShoeSize={this.setShoeSize} shoeSize={this.state.shoeSize} />
              </Grid>
              <br />
              <Grid item xs={12}>
                <ImageSelection selectImage={this.selectImage} ref={r => this.imageselRef = r} />
              </Grid>
              <br />
              <Grid item xs={12}>
                <Drops feetInfo={this.state.feet} setFeetInfo={this.setFeetInfo} ref={r => this.dropsRef = r} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <CamCanvas savePhoto={this.savePhoto} ref={r => this.canvasRef = r} patientCedula={this.state.user.cedula} />
            <MyObservations obsRef={this.obsRef} ref={r => this.obsRefReal = r} />
          </Grid>
        </Grid>
        <Fab
          color="primary"
          aria-label="add"
          className="fab"
          onClick={() => this.setState({ open: true })}>
          <SearchIcon />
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
            <SearchUser
              toggleModal={this.toggleModal}
              setUser={this.setUser}
              setFeetInfo={this.setFeetInfo}
              obsRefReal={this.obsRefReal}
              setShoeSize={this.setShoeSize}
            />
          </Fade>
        </Modal>
        <Fab
          color="primary"
          aria-label="info"
          className="fabImage"
          onClick={() => this.setState({ openImage: true })}>
          <InfoIcon />
        </Fab>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className="imageModal"
          open={this.state.openImage}
          onClose={() => this.setState({ openImage: true })}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{ timeout: 200 }}>
          <Fade
            in={this.state.openImage}
            className='imageModalContent'>
            <ImageModal toggleModal={this.toogleImageModal} />
          </Fade>
        </Modal>
      </div>
    );
  }
}
