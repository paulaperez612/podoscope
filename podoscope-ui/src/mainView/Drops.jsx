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
    // this.state = {
    //   left: {
    //     footprintType: 'NEUTRO',
    //     heelType: 'NEUTRO',
    //     footType: 'NEUTRO'
    //   },
    //   right: {
    //     footprintType: 'NEUTRO',
    //     heelType: 'NEUTRO',
    //     footType: 'NEUTRO'
    //   }
    // };
  }
  render() {
    return (
      <Grid container spacing={2} alignItems='center'>
        {/* <Grid item xs={12} className='dropTitle'>
          <Typography align='center' variant='h6'>
            Feet characteristics
          </Typography>
        </Grid> */}
        <br />
        <Grid item xs={2} >
          <Typography variant='subtitle1'> Left</Typography>
        </Grid>
        <Grid item xs={3} className='dropDown'>

          <FormControl className='dropDown' >
            <InputLabel >Footprint type</InputLabel>
            <Select
              value={this.props.feetInfo.left.footprintType}
              onChange={(e) => this.props.setFeetInfo({
                left: {
                  footprintType: e.target.value,
                  heelType: this.props.feetInfo.left.heelType,
                  footType: this.props.feetInfo.left.footType
                },
                right:{
                  footprintType: this.props.feetInfo.right.footprintType,
                  heelType: this.props.feetInfo.right.heelType,
                  footType: this.props.feetInfo.right.footType
                }
              })}
            >
              <MenuItem value={'SUPINADO_1'}>Supinado 1</MenuItem>
              <MenuItem value={'SUPINADO_2'}>Supinado 2</MenuItem>
              <MenuItem value={'SUPINADO_3'}>Supinado 3</MenuItem>
              <MenuItem value={'NEUTRO'}>Neutro</MenuItem>
              <MenuItem value={'PRONADO_1'}>Pronado 1</MenuItem>
              <MenuItem value={'PRONADO_2'}>Pronado 2</MenuItem>
              <MenuItem value={'PRONADO_3'}>Pronado 3</MenuItem>

            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3} className='dropDown'>

          <FormControl className='dropDown' >
            <InputLabel >Foot type</InputLabel>
            <Select
              value={this.props.feetInfo.left.footType}
              onChange={(e) => this.props.setFeetInfo({
                left: {
                  footprintType: this.props.feetInfo.left.footprintType,
                  heelType: this.props.feetInfo.left.heelType,
                  footType: e.target.value
                },
                right:{
                  footprintType: this.props.feetInfo.right.footprintType,
                  heelType: this.props.feetInfo.right.heelType,
                  footType: this.props.feetInfo.right.footType
                }
              })}
            >
              <MenuItem value={'PLANO_1'}>Plano 1</MenuItem>
              <MenuItem value={'PLANO_2'}>Plano 2</MenuItem>
              <MenuItem value={'PLANO_3'}>Plano 3</MenuItem>
              <MenuItem value={'NEUTRO'}>Neutro</MenuItem>
              <MenuItem value={'CAVO_1'}>Cavo 1</MenuItem>
              <MenuItem value={'CAVO_2'}>Cavo 2</MenuItem>
              <MenuItem value={'CAVO_3'}>Cavo 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3} className='dropDown'>

          <FormControl className='dropDown' >
            <InputLabel >Heel type</InputLabel>
            <Select
              value={this.props.feetInfo.left.heelType}
              onChange={(e) => this.props.setFeetInfo({
                left: {
                  footprintType: this.props.feetInfo.left.footprintType,
                  heelType: e.target.value,
                  footType: this.props.feetInfo.left.footType
                },
                right:{
                  footprintType: this.props.feetInfo.right.footprintType,
                  heelType: this.props.feetInfo.right.heelType,
                  footType: this.props.feetInfo.right.footType
                }
              })}
            >
              <MenuItem value={'VALGO'}>Valgo</MenuItem>
              <MenuItem value={'NEUTRO'}>Neutro</MenuItem>
              <MenuItem value={'VARO'}>Varo</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={2} >
          <Typography variant='subtitle1'> Right</Typography>
        </Grid>
        <Grid item xs={3} className='dropDown'>

          <FormControl className='dropDown' >
            <InputLabel >Footprint type</InputLabel>
            <Select
              value={this.props.feetInfo.right.footprintType}
              onChange={(e) => this.props.setFeetInfo({
                left: {
                  footprintType: this.props.feetInfo.left.footprintType,
                  heelType: this.props.feetInfo.left.heelType,
                  footType: this.props.feetInfo.left.footType
                },
                right:{
                  footprintType: e.target.value,
                  heelType: this.props.feetInfo.right.heelType,
                  footType: this.props.feetInfo.right.footType
                }
              })}
            >
              <MenuItem value={'SUPINADO_1'}>Supinado 1</MenuItem>
              <MenuItem value={'SUPINADO_2'}>Supinado 2</MenuItem>
              <MenuItem value={'SUPINADO_3'}>Supinado 3</MenuItem>
              <MenuItem value={'NEUTRO'}>Neutro</MenuItem>
              <MenuItem value={'PRONADO_1'}>Pronado 1</MenuItem>
              <MenuItem value={'PRONADO_2'}>Pronado 2</MenuItem>
              <MenuItem value={'PRONADO_3'}>Pronado 3</MenuItem>

            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3} className='dropDown'>

          <FormControl className='dropDown' >
            <InputLabel >Foot type</InputLabel>
            <Select
              value={this.props.feetInfo.right.footType}
              onChange={(e) => this.props.setFeetInfo({
                left: {
                  footprintType: this.props.feetInfo.left.footprintType,
                  heelType: this.props.feetInfo.left.heelType,
                  footType: this.props.feetInfo.left.footType
                },
                right:{
                  footprintType: this.props.feetInfo.right.footprintType,
                  heelType: this.props.feetInfo.right.heelType,
                  footType: e.target.value
                }
              })}
            >
              <MenuItem value={'PLANO_1'}>Plano 1</MenuItem>
              <MenuItem value={'PLANO_2'}>Plano 2</MenuItem>
              <MenuItem value={'PLANO_3'}>Plano 3</MenuItem>
              <MenuItem value={'NEUTRO'}>Neutro</MenuItem>
              <MenuItem value={'CAVO_1'}>Cavo 1</MenuItem>
              <MenuItem value={'CAVO_2'}>Cavo 2</MenuItem>
              <MenuItem value={'CAVO_3'}>Cavo 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={3} className='dropDown'>

          <FormControl className='dropDown' >
            <InputLabel >Heel type</InputLabel>
            <Select
              value={this.props.feetInfo.right.heelType}
              onChange={(e) => this.props.setFeetInfo({
                left: {
                  footprintType: this.props.feetInfo.left.footprintType,
                  heelType: this.props.feetInfo.left.heelType,
                  footType: this.props.feetInfo.left.footType
                },
                right:{
                  footprintType: this.props.feetInfo.right.footprintType,
                  heelType: e.target.value,
                  footType: this.props.feetInfo.right.footType
                }
              })}
            >
              <MenuItem value={'VALGO'}>Valgo</MenuItem>
              <MenuItem value={'NEUTRO'}>Neutro</MenuItem>
              <MenuItem value={'VARO'}>Varo</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}

Drops.propTypes = {
  feetInfo : PropTypes.object.isRequired,
  setFeetInfo: PropTypes.func.isRequired
};