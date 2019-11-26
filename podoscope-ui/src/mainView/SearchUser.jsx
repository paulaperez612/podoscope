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

import { genericGet } from '../utils/requestsManager';

export default class SearchUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCedula: '',
      loading: false
    };
    this.cedulaFound = true;
    this.searchUser = this.searchUser.bind(this);
  }

  searchUser() {
    this.setState({ loading: true });
    // session id
    let currentSessionID = localStorage.getItem('sid');
    console.log(currentSessionID);

    genericGet(
      'http://podosys.soel.com.co/index.php?sid=' + currentSessionID + '&entryPoint=obtener_paciente&cedula=' + this.state.userCedula,
      (data) => {
        console.log(data);


        if (data.rta.id == null) {
          this.cedulaFound = false;
          this.setState({ loading: false });
        }
        else {
          // patient exists
          let newPatient = {
            name: data.rta.nombre,
            cedula: this.state.userCedula,
            cellphone: data.rta.celular,
            email: data.rta.email,
            dob: data.rta.nacimiento,
            sex: data.rta.genero,
            left: {},
            right: {}
          }

          this.props.setUser(newPatient);
          this.props.toggleModal();
        }
        //loading =true 
        // check if user exists 
        //if exists, then exit modal and input info in main view
        //loading to true either way (valid or invalid user) 
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
  setUser: PropTypes.func
};