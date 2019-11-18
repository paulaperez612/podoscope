import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Typography } from '@material-ui/core';
import './Drops.css';
import PropTypes from 'prop-types';


export default class Drops extends Component {

  constructor(props) {
    super(props);
    this.drops = {
      footprintType: [
        ['SUPINADO_1', 'Supinado 1'],
        ['SUPINADO_2', 'Supinado 2'],
        ['SUPINADO_3', 'Supinado 3'],
        ['NEUTRO', 'Neutro'],
        ['PRONADO_1', 'Pronado 1'],
        ['PRONADO_2', 'Pronado 2'],
        ['PRONADO_3', 'Pronado 3'],
      ],
      footType: [
        ['PLANO_1', 'Plano 1'],
        ['PLANO_2', 'Plano 2'],
        ['PLANO_3', 'Plano 3'],
        ['NEUTRO', 'Neutro'],
        ['CAVO_1', 'Cavo 1'],
        ['CAVO_2', 'Cavo 2'],
        ['CAVO_3', 'Cavo 3'],
      ],
      heelType: [
        ['VALGO', 'Valgo'],
        ['NEUTRO', 'Neutro'],
        ['VARO', 'Varo']
      ]
    };
  }

  setFeetInfo(side, attr, value) {
    const nValue = { ...this.props.feetInfo };
    nValue[side][attr] = value;
    this.props.setFeetInfo(nValue);
  }

  makeDropdown(title, side, attr, options) {
    return (
      <Grid item xs={3} className='dropDown'>
        <FormControl className='dropDown'>
          <InputLabel>{title}</InputLabel>
          <Select
            value={this.props.feetInfo[side][attr]}
            onChange={(e) => this.setFeetInfo(side, attr, e.target.value)}>
            {options.map((e, i) => (
              <MenuItem key={`${attr}_${side}_${i}`} value={e[0]}>{e[1]}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    );
  }

  render() {
    return (
      <Grid container spacing={2} alignItems='center'>
        <br />
        <Grid item xs={2}>
          <Typography variant='subtitle1'> Left</Typography>
        </Grid>
        {this.makeDropdown('Footprint type', 'left', 'footprintType', this.drops.footprintType)}
        {this.makeDropdown('Foot type', 'left', 'footType', this.drops.footType)}
        {this.makeDropdown('Foot type', 'left', 'heelType', this.drops.heelType)}
        <Grid item xs={2}>
          <Typography variant='subtitle1'> Right</Typography>
        </Grid>
        {this.makeDropdown('Footprint type', 'right', 'footprintType', this.drops.footprintType)}
        {this.makeDropdown('Foot type', 'right', 'footType', this.drops.footType)}
        {this.makeDropdown('Foot type', 'right', 'heelType', this.drops.heelType)}
      </Grid>
    );
  }
}

Drops.propTypes = {
  feetInfo: PropTypes.object.isRequired,
  setFeetInfo: PropTypes.func.isRequired
};