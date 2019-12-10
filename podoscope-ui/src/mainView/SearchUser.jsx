import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';

import { genericGet, genericPostUrlParams } from '../utils/requestsManager';

export default class SearchUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCedula: '',
      loading: false
    };
    this.cedulaFound = true;
    this.searchUser = this.searchUser.bind(this);
    this.onEnter = this.onEnter.bind(this);
  }

  setMainViewState(newPatient,patientExam){
    this.props.setUser(newPatient);

    // set feet state in main view
    this.props.setFeetInfo(patientExam.feet);
    
    // set shoe size state in main view
    this.props.obsRefReal.setObservation(patientExam.observations);

    // set obs state in main view
    this.props.setShoeSize(parseInt(patientExam.shoeSize));
    
    this.props.toggleModal();
  }

  searchUserExam(pid, sid, newPatient) {



    genericGet(
      //todo unify urls
      'http://podosys.soel.com.co/index.php?sid=' + sid + '&entryPoint=list_efp&pid=' + pid,
      (data) => {
        let patientExam;
        if (data.rta.length > 0) {
          //get first and only exam
          let exam = data.rta[0];
          patientExam = {
            eid: exam.id,
            feet: {
              left: {
                footprintType: exam.tipo_huella_i,
                heelType: exam.tipo_talon_i,
                footType: exam.tipo_pie_i
              },
              right: {
                footprintType: exam.tipo_huella_d,
                heelType: exam.tipo_talon_d,
                footType: exam.tipo_pie_d
              }
            },
            observations: exam.observaciones,
            shoeSize: exam.talla_plantillas

          };


          this.setMainViewState(newPatient,patientExam);
        }
        else {
          const defaultType = 'NEUTRO';
          const defaultObs = '';
          const defaultShoesize = 40;
          //create exam
          genericPostUrlParams('http://podosys.soel.com.co/index.php',
            {
              entryPoint: 'save_efp',
              sid: sid,
              thi: defaultType,
              thd: defaultType,
              tpi: defaultType,
              tpd: defaultType,
              tti: defaultType,
              ttd: defaultType,
              obs: defaultObs,
              tp: defaultShoesize,
              pid: pid
            },
            (data) => {
              console.log('Sucessfully created exam for patient ', newPatient.cedula);
              console.log(data);

              //success, eid in data.rta
              patientExam = {
                eid: data.rta,
                feet: {
                  left: {
                    footprintType: defaultType,
                    heelType: defaultType,
                    footType: defaultType
                  },
                  right: {
                    footprintType: defaultType,
                    heelType: defaultType,
                    footType: defaultType
                  }
                },
                observations: defaultObs,
                shoeSize: defaultShoesize

              };

              this.setMainViewState(newPatient,patientExam);

            },
            (e) => {
              if (e.type === 'fetch') {
                console.log('Failed to fetch');
                // todo snackbar try again later
              } else if (e.type === 'session_expired') {
                console.log('Session Expired');
                // todo modal for relogin
              }
            });
        }


      },
      (e) => {
        if (e.type === 'fetch') {
          console.log('Failed to fetch');
        } else if (e.type === 'session_expired') {
          console.log('Session Expired');
        }
      }
    );


  }

  searchUser() {
    this.setState({ loading: true });
    // session id
    let currentSessionID = localStorage.getItem('sid');


    genericGet(
      //todo unify urls
      'http://podosys.soel.com.co/index.php?sid=' + currentSessionID + '&entryPoint=obtener_paciente&cedula=' + this.state.userCedula,
      (data) => {

        if (data.rta.id == null) {
          this.cedulaFound = false;
          this.setState({ loading: false });
        }
        else {
          // patient exists
          let newPatient = {
            name: data.rta.nombre + ' ' + data.rta.apellidos,
            cedula: this.state.userCedula,
            cellphone: data.rta.celular,
            email: data.rta.email,
            dob: data.rta.nacimiento,
            sex: data.rta.genero,
            //patient id in the db
            pid: data.rta.id,
            left: {},
            right: {}
          };

          // get exam with shoe size, type of foot, etc. 
          this.searchUserExam(newPatient.pid, currentSessionID, newPatient);
        }

      },
      //todo make snackbar
      (e) => {
        if (e.type === 'fetch') {
          console.log('Failed to fetch');
        } else if (e.type === 'session_expired') {
          console.log('Session Expired');
        }
      }
    );

  }

  onEnter(e) {
    if (e.key === 'Enter') {
      this.searchUser();
    }
  }

  renderSearchCard(cedulaFound) {
    return (
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Search user
          </Typography>
          <Grid container justify='center' alignItems='flex-end'>
            <Grid item>
              <TextField
                id="username"
                label="Cédula"
                // className={classes.textField}
                value={this.state.userCedula}
                onChange={(x) => this.setState({ userCedula: x.target.value })}
                autoFocus={true}
                onKeyDown={this.onEnter.bind(this)}
                type="number"
              // margin="auto"
              />

            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={this.searchUser}>
                <SearchIcon />
              </Button>
            </Grid>
            {!cedulaFound ?

              <Grid item xs={12}>
                <br />
                <Typography component="h2" color='error' align='center'>
                  Cedula not found
                </Typography>
              </Grid>
              :
              <br />
            }

          </Grid>
        </CardContent>

        <CardActions >
          <Button size="small" color="secondary" onClick={this.props.toggleModal}>
            Cancel
          </Button>
        </CardActions>
      </Card>);
  }

  renderLoading() {
    return (
      <Card className='waitingCard'>
        <Grid className='gridWaiting'
          container
          spacing={4}
          direction="column"
          alignItems="center"
          justify="space-around" >
          <Grid item xs={12}>
            <br />
            <Typography variant="h5" component="h2" align='center'>
              Searching user...
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        </Grid>
        <br />
      </Card >
    );
  }

  render() {
    return (
      <div>
        {!this.state.loading ? this.renderSearchCard(this.cedulaFound) : this.renderLoading()}
      </div>
    );
  }
}

SearchUser.propTypes = {
  toggleModal: PropTypes.func,
  setUser: PropTypes.func,
  setFeetInfo: PropTypes.func,
  // shoeRef: PropTypes.any,
  obsRefReal: PropTypes.any,
  setShoeSize: PropTypes.func
};