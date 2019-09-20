import React, { Component } from 'react';
import { Grid, Typography, Card, CardMedia } from '@material-ui/core';
import defaultImage from '../assets/defaultImage.png';
import './ImageCard.css';
export default class ImageCard extends Component {
  render() {
    return (
      <Card>
        <CardMedia style={{ height: 80 }}
          image={defaultImage}
        // title="Paella dish"
        />
      </Card>
    );
  }
}
