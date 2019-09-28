import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card, CardMedia } from '@material-ui/core';
import defaultImage from '../assets/defaultImage.png';
import './ImageCard.css';
export default class ImageCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: defaultImage
    };
  }

  updateImage(img) {
    this.setState({ image: img });
  }

  render() {
    return (
      <Card
        className={this.props.cardId == this.props.selection ? 'selected' : null}
        onClick={() => this.props.changeSelect(this.props.cardId)}>
        <CardMedia
          style={{ height: 50 }}
          image={this.state.image}
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