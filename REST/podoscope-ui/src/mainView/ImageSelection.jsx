import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import ImageCard from './ImageCard';

export default class ImageSelection extends Component {

  constructor(props) {
    super(props);
    this.state = { selection: -1 };
    this.changeSelection = this.changeSelection.bind(this);

    this.imgsRefs = [
      React.createRef(), React.createRef(), React.createRef(),
      React.createRef(), React.createRef(), React.createRef()
    ];
  }

  changeSelection(id) {
    this.setState({ selection: id }, () => {
      this.props.selectImage(id);
    });
  }

  updateImage(i, img) {
    this.imgsRefs[i].updateImage(img);
  }

  render() {
    return (
      <Grid container spacing={2} alignItems='center'>
        {/* <Grid item xs={12}>
          <Typography variant='h6' align='center'>
            Image select
          </Typography>
        </Grid> */}
        <Grid item xs={2}>
          <Typography variant='subtitle1'>
            Back
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <ImageCard ref={r => this.imgsRefs[0] = r} changeSelect={this.changeSelection} cardId={0} selection={this.state.selection} cardCaption='Chaplin Pos' />
        </Grid>
        <Grid item xs={3}>
          <ImageCard ref={r => this.imgsRefs[1] = r} changeSelect={this.changeSelection} cardId={1} selection={this.state.selection} cardCaption='Chaplin Pos Raise Toes Up' />
        </Grid>
        <Grid item xs={3}>
          <ImageCard ref={r => this.imgsRefs[2] = r} changeSelect={this.changeSelection} cardId={2} selection={this.state.selection} cardCaption='Insoles' />
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={3}>
          <Typography align='center' variant='body2'>
            Standing Up 
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography align='center' variant='body2'>
            45 ° 
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography align='center' variant='body2'>
          Toes up
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant='subtitle1'>
            Front
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <ImageCard ref={r => this.imgsRefs[3] = r} changeSelect={this.changeSelection} cardId={3} selection={this.state.selection} />
        </Grid>
        <Grid item xs={3}>
          <ImageCard ref={r => this.imgsRefs[4] = r} changeSelect={this.changeSelection} cardId={4} selection={this.state.selection} />
        </Grid>
        <Grid item xs={3}>
          <ImageCard ref={r => this.imgsRefs[5] = r} changeSelect={this.changeSelection} cardId={5} selection={this.state.selection} />
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={3}>
          <Typography align='center' variant='body2'>
            Chaplin 
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography align='center' variant='body2'>
            Chaplin
            <br />
            Toes Up
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography align='center' variant='body2'>
            With Insoles
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

ImageSelection.propTypes = {
  selectImage: PropTypes.func.isRequired
};
