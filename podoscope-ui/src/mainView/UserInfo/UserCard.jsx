import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CakeIcon from '@material-ui/icons/Cake';
import WcIcon from '@material-ui/icons/Wc';
import SvgIcon from '@material-ui/core/SvgIcon';
import TextField from '@material-ui/core/TextField';

import { ReactComponent as ShoeIcon } from '../../assets/human-shoes-footprints.svg';

function DaShoeIcon(props) {
  return (
    <SvgIcon {...props}>
      <ShoeIcon />
    </SvgIcon>
  );
}

export default class UserCard extends Component {

  constructor(props) {
    super(props);
    this.state = { shoeSize: 40 };
  }

  makeListItem(attr, icon, withDivider = true, overrideItem = undefined) {
    return (
      <>
        <ListItem>
          <ListItemAvatar>
            {icon}
          </ListItemAvatar>
          {overrideItem || <ListItemText secondary={this.props.user[attr]} />}
        </ListItem>
        {withDivider && <Divider variant="inset" component="li" />}
      </>
    );
  }

  render() {
    return (
      <Card style={{ minWidth: 400 }}>
        <CardContent>
          <Typography variant="h5" component="h2" align='center' style={{ maxWidth: 400 }}>
            {this.props.user.name}
          </Typography>
          <Typography variant='body2' align='center'>
            CC {this.props.user.cedula}
          </Typography>
          <List>
            {this.makeListItem('cellphone', <PhoneIcon color='primary' />)}
            {this.makeListItem('email', <MailOutlineIcon color='primary' />)}
            {this.makeListItem('dob', <CakeIcon color='primary' />)}
            {this.makeListItem('sex', <WcIcon color='primary' />)}
            {this.makeListItem('sex', <DaShoeIcon color='primary' viewBox='0 0 65 65' />, false, (
              <TextField
                value={this.state.shoeSize}
                onChange={(x) => this.setState({ shoeSize: x.target.value })}
                type="number"
                margin="dense"
                inputRef={this.props.shoeRef} />)
            )}
          </List>
        </CardContent>
      </Card>
    );
  }
}


UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  shoeRef: PropTypes.any
};
