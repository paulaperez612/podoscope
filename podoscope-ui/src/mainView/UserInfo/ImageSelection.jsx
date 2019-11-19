import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography } from '@material-ui/core';

import ImageCard from './ImageCard/ImageCard';

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
    this.setState({ selection: id },
      () => {
        this.props.selectImage(id);
      });
  }

  updateImage(i, img) {
    this.imgsRefs[i].updateImage(img);
  }

  makeImageCard(cardId, caption) {
    return (
      <Grid item xs={3}>
        <ImageCard
          ref={r => this.imgsRefs[cardId] = r}
          changeSelect={this.changeSelection}
          cardId={cardId}
          selection={this.state.selection}
          cardCaption={caption} />
      </Grid>
    );
  }

  makeCaption(caption, variant = 'body2', size = 3, align = 'center') {
    return (
      <Grid item xs={size}>
        <Typography align={align} variant={variant}>
          {caption}
        </Typography>
      </Grid>
    );
  }

  render() {
    return (
      <Grid container spacing={2} alignItems='center'>
        <>
          {this.makeCaption('Back', 'subtitle1', 2)}

          {this.makeImageCard(0, 'Standing Up')}
          {this.makeImageCard(1, '45 °')}
          {this.makeImageCard(2, 'Toes up')}

          <Grid item xs={2} />
          
          {this.makeCaption('Standing Up')}
          {this.makeCaption('45 °')}
          {this.makeCaption('Toes up')}
        </>
        <>
          {this.makeCaption('Front', 'subtitle1', 2)}

          {this.makeImageCard(3, 'Chaplin')}
          {this.makeImageCard(4, 'Chaplin Toes Up')}
          {this.makeImageCard(5, 'With Insoles')}

          <Grid item xs={2} />

          {this.makeCaption('Chaplin')}
          {this.makeCaption(<>Chaplin<br />Toes Up</>)}
          {this.makeCaption('With Insoles')}
        </>
      </Grid>
    );
  }
}

ImageSelection.propTypes = {
  selectImage: PropTypes.func.isRequired
};
