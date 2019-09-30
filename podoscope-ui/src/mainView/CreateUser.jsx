import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
// import CakeIcon from '@material-ui/icons/Cake';
// import WcIcon from '@material-ui/icons/Wc';
import DateFnsUtils from '@date-io/date-fns';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import AccountCircle from '@material-ui/icons/AccountCircle';


import { postUser } from '../utils/requestsManager';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import { formatDate, formatSex } from '../utils/valueFormater';

import CircularProgress from '@material-ui/core/CircularProgress';


import './CreateUser.css';

export default class CreateUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      secondName: '',
      firstSurname: '',
      secondSurname: '',
      phoneNumber: '',
      email: '',
      selectedDate: new Date('1990-01-01T21:11:54'),
      sex: 'OTHER',
      cedula: '',

      waiting: false
    };
    this.handleSexChange = this.handleSexChange.bind(this);
    this.createUser = this.createUser.bind(this);
    this.renderCreateCard = this.renderCreateCard.bind(this);
    this.renderWait = this.renderWait.bind(this);
  }

  handleSexChange(event) {
    console.log(event.target);
    this.setState(
      { sex: event.target.value }
    );
  }

  createUser() {
    this.setState({ waiting: true }, () => {
      postUser(this.state,
        //if succesfull
        () => {
          this.props.setUser({
            name: this.state.firstName + ' ' +
              this.state.secondName + ' ' +
              this.state.firstSurname + ' ' +
              this.state.secondSurname,
            cedula: this.state.cedula,
            cellphone: this.state.phoneNumber,
            email: this.state.email,
            dob: formatDate(this.state.selectedDate),
            sex: formatSex(this.state.sex)
          });

          //close modal
          this.props.toggleModal();
        },
        //on error
        () => {
          console.log('error!!');
          //return to create user
          this.setState({ waiting: false });
        });
    });
  }

  renderCreateCard() {
    return (
      <Card >

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Create new user
          </Typography>

          <form
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={1} justify='space-around' >
              <Grid item xs={5}>
                <TextField
                  id="first-name"
                  label="First name"
                  // className={classes.textField}
                  value={this.state.firstName}
                  onChange={(x) => this.setState({ firstName: x.target.value })}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  // id="first-name"
                  label="Second name"
                  // className={classes.textField}
                  value={this.state.secondName}
                  onChange={(x) => this.setState({ secondName: x.target.value })}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  // id="first-name"
                  label="First surname"
                  // className={classes.textField}
                  value={this.state.firstSurname}
                  onChange={(x) => this.setState({ firstSurname: x.target.value })}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  // id="first-name"
                  label="Second surname"
                  // className={classes.textField}
                  value={this.state.secondSurname}
                  onChange={(x) => this.setState({ secondSurname: x.target.value })}
                  margin="normal"
                />
              </Grid>

              <Grid item xs={5}>
                <TextField
                  // className={classes.margin}
                  // id="input-with-icon-textfield"
                  label="Cedula"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  value={this.state.cedula}
                  onChange={(x) => this.setState({ cedula: x.target.value })}
                />
              </Grid>

              <Grid item xs={5}>
                <TextField
                  // className={classes.margin}
                  // id="input-with-icon-textfield"
                  label="Cellphone"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                  value={this.state.phoneNumber}
                  onChange={(x) => this.setState({ phoneNumber: x.target.value })}
                />
              </Grid>




              <Grid item xs={5} >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="MM/dd/yyyy"
                    value={this.state.selectedDate}
                    onChange={(x) => this.setState({ selectedDate: x })}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>

              </Grid>

              <Grid item xs={5} className='formGrid'>
                <FormControl className='formControl'
                >
                  <InputLabel htmlFor="sex-selector">Sex</InputLabel>
                  <Select
                    value={this.state.sex}
                    onChange={this.handleSexChange}
                    inputProps={{
                      name: 'sex',
                      id: 'sex-selector',
                    }}
                    autoWidth
                  >
                    <MenuItem value={'MALE'}>Male</MenuItem>
                    <MenuItem value={'FEMALE'}>Female</MenuItem>
                    <MenuItem value={'OTHER'}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={5}>
                <TextField
                  // className={classes.margin}
                  // id="input-with-icon-textfield"
                  label="Email"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <MailOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                  value={this.state.email}
                  onChange={(x) => this.setState({ email: x.target.value })}
                />
              </Grid>


            </Grid>



          </form >
        </CardContent>

        <CardActions >
          <Button size="small" color="secondary" className='createUserActionButtons' onClick={this.props.toggleModal}>
            Cancel
          </Button>
          <Button size="small" color="primary" className='createUserActionButtons' onClick={this.createUser}>
            Create
          </Button>
        </CardActions>
      </Card>);
  }

  renderWait() {
    return (
      <Card className='waitingCard'>
        <Grid className='gridWaiting'
          container
          spacing={4}
          direction="column"
          alignItems="center"
          justify="space-around" >
          <Grid item xs={12}>
            <Typography variant="h5" component="h2" align='center'>
              Creating user...
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        </Grid>
      </Card >
    );
  }

  render() {

    return !this.state.waiting ? this.renderCreateCard() : this.renderWait();
  }
}


CreateUser.propTypes = {
  toggleModal: PropTypes.func,
  setUser: PropTypes.func
};