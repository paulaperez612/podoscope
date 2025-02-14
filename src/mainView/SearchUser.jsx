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

import { baseUrl, genericGet, genericPostUrlParams } from '../utils/requestsManager';

export default class SearchUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCedula: '',
      loading: false,
      sessionExpired: false,
      cedulaFound: true,
    };
    // this.cedulaFound = true;
    this.searchUser = this.searchUser.bind(this);
    this.onEnter = this.onEnter.bind(this);
  }

  setMainViewState(newPatient, patientExam) {
    const examID = patientExam.eid;
    newPatient.eid = examID;

    this.props.setUser(newPatient);

    // set feet state in main view
    this.props.setFeetInfo(patientExam.feet);

    // set shoe size state in main view
    this.props.obsRefReal.setObservation(patientExam.observations);

    // set obs state in main view
    this.props.setShoeSize(parseInt(patientExam.shoeSize));

    this.searchUserImages(examID);

    // this.props.toggleModal();


  }

  searchUserExam(pid, sid, newPatient) {



    genericGet(
      baseUrl + '/index.php?sid=' + sid + '&entryPoint=list_efp&pid=' + pid,
      (data) => {
        console.log('Obtained patient exams:', data);
        let patientExam;
        if (data.rta.length > 0) {
          // user has exams

          //get first and only exam
          const exam = data.rta[0];
          console.log('Using exam:', exam);
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


          this.setMainViewState(newPatient, patientExam);
        }
        else {
          // user does not have an exam.
          const defaultType = 'NEUTRO';
          const defaultObs = '';
          const defaultShoesize = 0;
          //create exam
          genericPostUrlParams(baseUrl + '/index.php',
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

              this.setMainViewState(newPatient, patientExam);

            },
            (e) => {
              if (e.type === 'fetch') {
                console.log('Failed to fetch');
                // TODO snackbar try again later
              } else if (e.type === 'session_expired') {
                console.log('Session Expired');
                // TODO modal for relogin
                this.setState({ sessionExpired: true });
              }
            });
        }


      },
      (e) => {
        if (e.type === 'fetch') {
          console.log('Failed to fetch');
        } else if (e.type === 'session_expired') {
          console.log('Session Expired');
          this.setState({ sessionExpired: true });
        }
      }
    );


  }

  getImageAndID(rawImageString) {
    console.log('Splitting string:')
    const strLength = rawImageString.length;
    console.log(`Raw string length: ${strLength}`)
    const index = rawImageString.indexOf("@");
    console.log(`Found @ char in ${index}`);
    const imID = rawImageString.substring(index + 1, strLength);
    const im = rawImageString.substring(0, index);
    console.log('Split string.')
    return [imID, im]
  }

  searchUserImages(examID) {
    console.log('In search user images');
    let currentSessionID = localStorage.getItem('sid');
    console.log(`Searching for exams with examid: ${examID}`)
    const endpointURL = baseUrl + '/index.php?sid=' + currentSessionID + '&entryPoint=list_img&efp_id=' + examID;
    genericGet(endpointURL,
      (data) => {
        console.log(`Obtained images with examid ${examID}:`);
        console.log(`Recieved ${data.rta.length} images.`);

        //clear previous image data
        console.log('Clearing image data');
        for (let i = 0; i < 6; i++) {
          console.log(`Clearing image ${i}`);
          this.props.setImageInMainView(i, {});
          console.log('Main view cleared');
          this.props.selectImageRef.setImageToDefault(i);
          console.log('Image ref cleared');
        }

        console.log('Iterating over data:')
        for (let i = 0; i < data.rta.length; i++) {
          const imObject = data.rta[i];
          console.log(imObject);
          const [imID, image] = this.getImageAndID(imObject.imagen);
          console.log(`Image # ${i} Image ID: ${imID} End of string ${image.substring(image.length - 20, image.length)}`)
          console.log('Setting image...')
          const imageData = {
            data: {
              free: {
                path: JSON.parse(imObject.traza.replace(/&quot;/g, `"`)),
                down: false
              },
              left: {
                lineX: imObject.u_x_i || undefined,
                point: {
                  x: imObject.x_i || undefined,
                  y: imObject.y_i || undefined
                }
              },
              right: {
                lineX: imObject.u_x_d || undefined,
                point: {
                  x: imObject.x_d || undefined,
                  y: imObject.y_d || undefined
                }
              }
            },
            extra: {
              leftAngle: imObject.angulo_i || undefined,
              rightAngle: imObject.angulo_d || undefined
            },
            image: image
          };

          this.props.setImageInMainView(imID, imageData);
          this.props.selectImageRef.updateImage(imID, image);
          console.log('Image set succesfully');

        }
        this.setState({ loading: false });
        this.props.toggleModal();
      },
      () => { }
    )
  }

  searchUser() {
    this.setState({ loading: true });
    // session id
    let currentSessionID = localStorage.getItem('sid');

    // get patient info
    genericGet(
      baseUrl + '/index.php?sid=' + currentSessionID + '&entryPoint=obtener_paciente&cedula=' + this.state.userCedula,
      (data) => {

        if (data.rta.id == null) {
          // this.cedulaFound = false;
          this.setState({ cedulaFound: false, loading: false });
          console.log('Cedula not found')
        }
        else {
          // patient exists
          console.log('Patient found: ', data)
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

          console.log('Getting exam id')
          // get exam with shoe size, type of foot, etc. 
          this.searchUserExam(newPatient.pid, currentSessionID, newPatient);
          // get exam images
        }

      },
      //TODO make snackbar
      (e) => {
        if (e.type === 'fetch') {
          console.log('Failed to fetch');
        } else if (e.type === 'session_expired') {
          console.log('Session Expired');
          this.setState({ sessionExpired: true });
        }
      }
    );

  }

  logOut() {
    localStorage.setItem('sid', undefined);
    this.props.logout();
  }

  onEnter(e) {
    if (e.key === 'Enter') {
      this.searchUser();
    }
  }

  renderSearchCard() {
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
            {!this.state.cedulaFound ?

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

  renderLogout() {
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
              Your session has expired.
              <br />
              Please login again.
            </Typography>
          </Grid>
          <CardActions >
            <Button size="small" variant="contained" color="primary" onClick={() => this.logOut()}>
              Log out
            </Button>
          </CardActions>
        </Grid>
        <br />
      </Card >
    )
  }

  render() {
    let renderedComponent;
    if (this.state.sessionExpired) {
      renderedComponent = this.renderLogout();
    }
    else {
      if (!this.state.loading) {
        renderedComponent = this.renderSearchCard();
      }
      else {
        renderedComponent = this.renderLoading();
      }
    }

    return (
      <div>
        {renderedComponent}
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