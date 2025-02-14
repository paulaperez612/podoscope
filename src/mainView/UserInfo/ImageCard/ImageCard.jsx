import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ImageCard.css';

import { Card, CardMedia } from '@material-ui/core';

import defaultImage from '../../../assets/defaultImage.png';

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

  setImageToDefaultImage() {
    console.log(`Inside the image ref itself`);
    this.setState({ image: defaultImage });
  }

  handleClick = () => {
    console.log(`Presionaste el recuadro con ID: ${this.props.cardId}`);
    this.props.changeSelect(this.props.cardId);
  };

  render() {
    const isSelected = this.props.cardId === this.props.selection;

    return (
      <Card
        style={{
          width: '150px',
          backgroundColor: '  #1f4e7c',
          border: isSelected ? '3px solid white' : '3px solid transparent',
          cursor: 'pointer',
        }}
        className={isSelected ? 'selected' : ''}
        onClick={this.handleClick}
      >
        <CardMedia
          style={{ height: 100, backgroundColor: '  #1f4e7c' }}
          image={this.state.image || ''}
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
