import React from 'react';
import './camCanvas.css';

import { Grid, Box, Button } from '@material-ui/core';
import Info from './Info/Info';

const tempColor = 'red';
const tempPColor = 'yellow';
const defColor = 'cyan';

export default class CamCanvas extends React.Component {

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.infoRef = React.createRef();
    this.rect = undefined;
    this.action = 0;
    this.setAction = this.setAction.bind(this);
    this.data = {
      lineX: undefined,
      point: undefined
    };
  }

  componentDidMount() {
    this.rect = this.canvasRef.getBoundingClientRect();
    this.canvasRef.height = this.rect.width;
    this.canvasRef.width = this.rect.width;
    this.ctx = this.canvasRef.getContext("2d");
    this.rect = this.canvasRef.getBoundingClientRect();
  }

  drawState() {
    this.ctx.clearRect(0, 0, this.rect.width + 20, this.rect.height + 20);
    if (this.data.lineX) {
      this.drawLine(this.data.lineX, false);
    }
    if (this.data.point) {
      this.drawPoint(this.data.point.x, this.data.point.y, false);
    }
  }

  sketchLine(x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  drawLine(x, temp = true) {
    this.ctx.strokeStyle = temp ? tempColor : defColor;
    if (temp) {
      this.ctx.setLineDash([5, 3])
    } else {
      this.ctx.setLineDash([1, 0])
    }
    this.sketchLine(x, 0, x, this.rect.height + 20);

    if (this.data.point) {
      if (temp) {
        this.ctx.setLineDash([5, 3]);
      }
      this.sketchLine(this.data.point.x, this.data.point.y, x, 0);
      this.sketchLine(this.data.point.x, this.data.point.y, x, this.canvasRef.height);
    }
  };

  drawPoint(x, y, temp = true) {
    this.ctx.strokeStyle = temp ? tempColor : defColor;
    this.ctx.fillStyle = temp ? tempPColor : defColor;
    this.ctx.beginPath();
    this.ctx.arc(x, y, 5, 0, 2 * Math.PI);
    this.ctx.fill();

    if (this.data.lineX) {
      if (temp) {
        this.ctx.setLineDash([5, 3]);
      }
      this.sketchLine(x, y, this.data.lineX, 0);
      this.sketchLine(x, y, this.data.lineX, this.canvasRef.height);
    }
  }

  mouseOverHandler(e) {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    this.drawState();
    switch (this.action) {
      case 1:
        this.drawLine(x);
        break;
      case 2:
        this.drawPoint(x, y);
        break;
      default:
        break;
    }
  }

  mouseClickHandler(e) {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    switch (this.action) {
      case 1:
        this.data.lineX = x;
        break;
      case 2:
        this.data.point = { x, y };
        break;
      default:
        break;
    }
    this.drawState();

    if (this.data.lineX && this.data.point) {
      this.updateAngle();
    }
  }

  setAction(action) {
    return () => this.action = (this.action === action ? 0 : action);
  }

  updateAngle() {
    if (this.data.lineX && this.data.point) {
      const b = this.canvasRef.height;
      const p1 = { x: this.data.lineX, y: b };
      const p2 = { x: this.data.point.x, y: this.data.point.y };

      const c = Math.sqrt((p1.x - p2.x) ** 2 + (p2.y) ** 2);
      const a = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

      const thetaRads = Math.acos(((a ** 2) + (b ** 2) - (c ** 2)) / (2 * a * b));

      this.infoRef.update(0, Math.round((thetaRads * 180 / Math.PI) * 100) / 100);
    }
  }

  render() {
    return (
      <Grid container direction="column">
        <Grid item>
          <Info ref={r => this.infoRef = r} />
        </Grid >
        <Grid item>
          <Grid container direcction="row">
            <Grid item xs={11}>
              <Box
                component="canvas"
                ref={r => this.canvasRef = r}
                onMouseMove={this.mouseOverHandler.bind(this)}
                onClick={this.mouseClickHandler.bind(this)}
                onMouseOut={this.drawState.bind(this)}
              ></Box>
            </Grid>
            <Grid item xs={1}>
              <Grid container direction="column" className="cam-btn-container">
                <Grid item xs={3}>
                  <Button className="cam-btn" color="primary" variant="contained" onClick={this.setAction(1)}>x</Button>
                </Grid>
                <Grid item xs={3}>
                  <Button className="cam-btn" color="primary" variant="contained" onClick={this.setAction(2)}>x</Button>
                </Grid>
                <Grid item xs={3}>
                  <Button className="cam-btn" color="primary" variant="contained">x</Button>
                </Grid>
                <Grid item xs={3}>
                  <Button className="cam-btn" color="primary" variant="contained">x</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

CamCanvas.propTypes = {

}
