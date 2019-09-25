import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card, CardMedia, Container } from '@material-ui/core';
import defaultImage from '../assets/defaultImage.png';
import './ImageCard.css';
export default class ImageCard extends Component {
  render() {
    return (

      <Card className={this.props.cardId == this.props.selection ? 'selected' : null}
        onClick={() => this.props.changeSelect(this.props.cardId)}>
        <CardMedia style={{ height: 80 }}
          image={defaultImage}
        // title="Paella dish"
        />
      </Card>

    );
  }
}

ImageCard.propTypes = {
  cardId: PropTypes.number.isRequired,
  selection: PropTypes.number.isRequired,
  changeSelect: PropTypes.func.isRequired
};