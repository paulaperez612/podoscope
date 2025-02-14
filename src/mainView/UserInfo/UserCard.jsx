import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Grid, TextField } from '@material-ui/core';
import { Phone, MailOutline, Cake, Wc } from '@material-ui/icons';
import SvgIcon from '@material-ui/core/SvgIcon';

import { ReactComponent as ShoeIcon } from '../../assets/human-shoes-footprints.svg';

function DaShoeIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 65 65" style={{ fontSize: 20 }}>
      <ShoeIcon />
    </SvgIcon>
  );
}

export default class UserCard extends Component {
  renderDataItem(label, value, icon) {
    return (
      <Grid item xs={6} sm={4} className="data-item">
        {icon}
        <Typography variant="body2" className="data-text">
          <strong>{label}:</strong> {value}
        </Typography>
      </Grid>
    );
  }

  render() {
    return (
      <Card className="user-card">
        <CardContent>
          <Typography variant="h6" className="user-name">
            {this.props.user.name}
          </Typography>
          <Grid
            container
            spacing={2}
            className="user-data-container"
            style={{ marginLeft: '-20px' }} // Mueve todo el contenido hacia la izquierda 10px
          >
            {/* Fila 1 */}
            <Grid item xs={4} className="data-item">
              <Phone className="icon" />
              <Typography variant="body2" className="data-text">
                <strong>Teléfono:</strong> {this.props.user.cellphone}
              </Typography>
            </Grid>
            <Grid item xs={4} className="data-item">
              <Typography variant="body2" className="data-text">
                <strong>Cédula:</strong> CC {this.props.user.cedula}
              </Typography>
            </Grid>
            <Grid item xs={4} className="data-item">
              <MailOutline className="icon" />
              <Typography variant="body2" className="data-text">
                <strong>Email:</strong> {this.props.user.email}
              </Typography>
            </Grid>

            {/* Fila 2 */}
            <Grid item xs={4} className="data-item">
              <Cake className="icon" />
              <Typography variant="body2" className="data-text">
                <strong>Nacimiento:</strong> {this.props.user.dob}
              </Typography>
            </Grid>
            <Grid item xs={4} className="data-item">
              <Wc className="icon" />
              <Typography variant="body2" className="data-text">
                <strong>Sexo:</strong> {this.props.user.sex}
              </Typography>
            </Grid>
            <Grid item xs={4} className="data-item">
              <DaShoeIcon className="icon" />
              <Typography variant="body2" className="data-text">
                <strong>Talla:</strong>
              </Typography>
              <TextField
                value={this.props.shoeSize}
                onChange={(e) => this.props.setShoeSize(parseInt(e.target.value))}
                type="number"
                size="small"
                className="size-input"
              />
            </Grid>
          </Grid>


        </CardContent>
      </Card>
    );
  }
}

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  setShoeSize: PropTypes.func,
  shoeSize: PropTypes.number
};
