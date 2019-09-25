import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Switch, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';

const huella = {
  'SUPINADO_1': 'SUPINADO 1',
  'SUPINADO_2': 'SUPINADO 2',
  'SUPINADO_3': 'SUPINADO 3',
  'NEUTRO': 'NEUTRO',
  'PRONADO_1': 'PRONADO 1',
  'PRONADO_2': 'PRONADO 2',
  'PRONADO_3': 'PRONADO 3',
};

const tipoTalon = {
  'VALGO': 'VALGO',
  'NEUTRO': 'NEUTRO',
  'VARO': 'VARO',
};

const tipo = {
  'PLANO_1': 'PLANO 1',
  'PLANO_2': 'PLANO 2',
  'PLANO_3': 'PLANO 3',
  'NEUTRO': 'NEUTRO',
  'CAVO_1': 'CAVO 1',
  'CAVO_2': 'CAVO 2',
  'CAVO_3': 'CAVO 3',
};

export default class Info extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      leftAngle: undefined,
      rightAngle: undefined,
      drops: {
        huellaL: { name: 'Huella', value: huella.NEUTRO, values: huella },
        huellaR: { name: 'Huella', value: huella.NEUTRO, values: huella },
        tipoTalonL: { name: 'Tipo Talon', value: tipoTalon.NEUTRO, values: tipoTalon },
        tipoTalonR: { name: 'Tipo Talon', value: tipoTalon.NEUTRO, values: tipoTalon },
        tipoL: { name: 'Tipo', value: tipo.NEUTRO, values: tipo },
        tipoR: { name: 'Tipo', value: tipo.NEUTRO, values: tipo },
      }
    };

    this.selectedValues = [0, 0, 0, 0, 0, 0];

    this.changeValue = this.changeValue.bind(this);
  }

  update(side, angle) {
    if (side === 0) {
      this.setState({ leftAngle: angle });
    } else {
      this.setState({ rightAngle: angle });
    }
  }

  changeValue(type) {
    return (e) => {
      this.setState(prevState => {
        const s = JSON.parse(JSON.stringify(prevState.drops));
        s[type].value = e.target.value;
        return { drops: s };
      });
    };
  }

  getState() {
    const data = {};
    data.leftAngle = this.state.leftAngle;
    data.rightAngle = this.state.rightAngle;
    data.drops = Object
      .entries(this.state.drops)
      .reduce((o, [k, v]) => {
        o[k] = v.value;
        return o;
      }, {});
    return data;
  }

  render() {
    return (
      <Grid item xs={11} className="switch-container">
        <Grid container direcction="row">
          {Object.entries(this.state.drops).map(([k, v], i) => (
            <Grid item key={i}>
              <FormControl className='formControl'>
                <InputLabel htmlFor={`${k}-selector`}>{v.name}</InputLabel>
                <Select
                  value={this.state.drops[k].value}
                  onChange={this.changeValue(k)}
                  inputProps={{ name: k, id: `${k}-selector` }}>
                  {Object.entries(v.values).map(([k1, v1], i1) => (
                    <MenuItem value={v1} key={`${k}-${k1}-${i1}`}>{v1}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ))}
        </Grid>
        <Grid item>
          <Grid item >
            <Typography>{this.state.leftAngle || '-'}°</Typography>
            <Typography>Left</Typography>
          </Grid>
          <Switch color="primary" onChange={(e) => this.props.onSideChange(e.target.checked)} />
          <Grid item>
            <Typography>{this.state.rightAngle || '-'}°</Typography>
            <Typography>Right</Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Info.propTypes = {
  onSideChange: PropTypes.func.isRequired
};
