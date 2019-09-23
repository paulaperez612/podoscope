import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CakeIcon from '@material-ui/icons/Cake';
import WcIcon from '@material-ui/icons/Wc';
import DateFnsUtils from '@date-io/date-fns';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';



import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';


import './CreateUser.css';

export default class CreateUser extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      selectedDate: new Date('1990-01-01T21:11:54'),
      sex: 'OTHER' 
    };
    this.handleSexChange = this.handleSexChange.bind(this); 
  }

  handleSexChange (event) {
    console.log(event.target);
    this.setState(
      {sex:event.target.value}
    );
  }

  render() {
    
    return (
      <Card >

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Create new user
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">
            Please fill out all of the following fields:
          </Typography> */}
          <form
            // className={classes.container} 
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={1} justify='space-around' >
              <Grid item xs={5}>
                <TextField
                  // id="first-name"
                  label="First name"
                  // className={classes.textField}
                  // value={'laksdjas'}
                  // onChange={handleChange('name')}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  // id="first-name"
                  label="Second name"
                  // className={classes.textField}
                  // value={'laksdjas'}
                  // onChange={handleChange('name')}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  // id="first-name"
                  label="First surname"
                  // className={classes.textField}
                  // value={'laksdjas'}
                  // onChange={handleChange('name')}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  // id="first-name"
                  label="Second surname"
                  // className={classes.textField}
                  // value={'laksdjas'}
                  // onChange={handleChange('name')}
                  margin="normal"
                />
              </Grid>

              <Grid item xs={5}>
                <TextField
                  // className={classes.margin}
                  // id="input-with-icon-textfield"
                  label="Phone Number"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
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
                  <InputLabel htmlFor="sex-selector">Age</InputLabel>
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

            </Grid>



          </form >
        </CardContent>

        <CardActions >
          <Button size="small" color="secondary" className='createUserActionButtons'>
            Cancel
          </Button>
          <Button size="small" color="primary" className='createUserActionButtons'>
            Create
          </Button>
        </CardActions>
      </Card>
    );
  }
}
