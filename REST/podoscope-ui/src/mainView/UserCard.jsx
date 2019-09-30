import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';

import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CakeIcon from '@material-ui/icons/Cake';
import WcIcon from '@material-ui/icons/Wc';

import { ReactComponent as ShoeIcon } from '../assets/human-shoes-footprints.svg';
import SvgIcon from '@material-ui/core/SvgIcon';

import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';


function DaShoeIcon(props) {
  return (
    <SvgIcon {...props}>
      <ShoeIcon />
    </SvgIcon>
  );
}

export default class UserCard extends Component {

  constructor(props){
    super(props);
    this.state  = {shoeSize:40};
  }


  render() {
    return (
      <Card style={{ minWidth: 400 }} >
        <CardContent>

          <Typography variant="h5" component="h2" align='center' style={{ maxWidth: 400 }}>
            {this.props.user.name}
          </Typography>

          <Typography variant='body2' align='center'>
            CC {this.props.user.cedula}
          </Typography>

          <List >
            <ListItem>

              <ListItemAvatar>
                <PhoneIcon color='primary' />
              </ListItemAvatar>

              <ListItemText secondary={this.props.user.cellphone} />

            </ListItem>

            <Divider variant="inset" component="li" />

            <ListItem>

              <ListItemAvatar>
                <MailOutlineIcon color='primary' />
              </ListItemAvatar>

              <ListItemText secondary={this.props.user.email} />

            </ListItem>

            <Divider variant="inset" component="li" />

            <ListItem>

              <ListItemAvatar>
                <CakeIcon color='primary' />
              </ListItemAvatar>

              <ListItemText secondary={this.props.user.dob} />

            </ListItem>

            <Divider variant="inset" component="li" />

            <ListItem>

              <ListItemAvatar>
                <WcIcon color='primary' />
              </ListItemAvatar>

              <ListItemText secondary={this.props.user.sex} />

            </ListItem>

            <Divider variant="inset" component="li" />

            <ListItem>

              <ListItemAvatar>
                <DaShoeIcon color='primary' viewBox='0 0 65 65' />
              </ListItemAvatar>

              {/* <ListItemText secondary={'laksdlak'} /> */}
              <TextField
                // id="standard-number"
                // label="Shoe size"
                value={this.state.shoeSize}
                onChange={(x)=>{
                  this.setState({shoeSize:x.target.value});
                }}
                type="number"
                // className={classes.textField}
                // InputLabelProps={{
                //   shrink: true,
                // }}
                margin="dense"
                inputRef={this.props.shoeRef}
              />

            </ListItem>


          </List>
        </CardContent>

      </Card>
    );
  }
}


UserCard.propTypes={
  user: PropTypes.object.isRequired
};