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
    this.setState({ selection: id }, () => {
      this.props.selectImage(id);
    });
  }

  updateImage(i, img) {
    this.imgsRefs[i].updateImage(img);
  }

  setImageToDefault(i) {
    console.log(`In selection ref, setting image ${i} to default.`);
    this.imgsRefs[i].setImageToDefaultImage();
  }

  // Función que agrupa la tarjeta con su concepto debajo
  makeCardWithCaption(cardId, caption) {
    return (
      <Grid item key={`card-${cardId}`}>
        <Grid container direction="column" alignItems="center" spacing={1}>
          <Grid item>
            <ImageCard
              ref={r => this.imgsRefs[cardId] = r}
              changeSelect={this.changeSelection}
              cardId={cardId}
              selection={this.state.selection}
              cardCaption={caption} // Se sigue pasando si lo necesitas en el componente
            />
          </Grid>
          <Grid item>
            <Typography variant="body2" align="center">
              {caption}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1010px',      // Se mantiene la separación de 550px entre columnas
          marginTop: '-102px', // Ajusta la posición vertical según tus necesidades
          transform: 'translateX(333px)' // Mueve todos los recuadros hacia la derecha (en este ejemplo 8cm)
        }}
      >

        {/* distancia de los recuadros de la capturas */}
        {/* Columna izquierda */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="subtitle1">Back</Typography>
          <Grid
            container
            direction="column"
            alignItems="center"
            style={{ gap: '60px' }} // Se establece un espacio de 10px entre recuadros verticalmente
          >
            {this.makeCardWithCaption(0, 'Standing Up')}
            {this.makeCardWithCaption(1, '45 °')}
            {this.makeCardWithCaption(2, 'Toes up')}
          </Grid>
        </div>
        {/* Columna derecha */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="subtitle1">Front</Typography>
          <Grid
            container
            direction="column"
            alignItems="center"
            style={{ gap: '60px' }} // Se establece un espacio de 10px entre recuadros verticalmente
          >
            {this.makeCardWithCaption(3, 'Chaplin')}
            {this.makeCardWithCaption(4, 'Chaplin Toes Up')}
            {this.makeCardWithCaption(5, 'With Insoles')}
          </Grid>
        </div>
      </div>
    );
  }
}

ImageSelection.propTypes = {
  selectImage: PropTypes.func.isRequired
};
