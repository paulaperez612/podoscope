import React from 'react';
import './camCanvas.css';

import { Grid, Box } from '@material-ui/core';
import Info from './Info/Info';
import Side from './Side/Side';

const tempColor = 'red';
const tempPColor = 'yellow';
const defColor = 'cyan';

export default class CamCanvas extends React.Component {

  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.infoRef = React.createRef();

    this.setAction = this.setAction.bind(this);

    this.action = 0;
    this.rect = undefined;
    this.data = {
      left: {
        lineX: undefined,
        point: undefined
      },
      right: {
        lineX: undefined,
        point: undefined
      }
    };
    this.side = this.data.left;
  }

  componentDidMount() {
    this.rect = this.canvasRef.getBoundingClientRect();
    this.canvasRef.height = this.rect.width;
    this.canvasRef.width = this.rect.width;
    this.ctx = this.canvasRef.getContext("2d");
    this.rect = this.canvasRef.getBoundingClientRect();
  }

  drawState() {
    const drawSide = (side) => {
      if (side.lineX) {
        this.drawLine(side.lineX, false, side.point);
      }
      if (side.point) {
        this.drawPoint(side.point.x, side.point.y, false, side.line);
      }
    };

    this.ctx.clearRect(0, 0, this.rect.width + 20, this.rect.height + 20);
    drawSide(this.data.left);
    drawSide(this.data.right);
  }

  sketchLine(x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  drawLine(x, temp, point) {
    this.ctx.strokeStyle = temp ? tempColor : defColor;
    if (temp) {
      this.ctx.setLineDash([5, 3])
    } else {
      this.ctx.setLineDash([1, 0])
    }
    this.sketchLine(x, 0, x, this.rect.height + 20);


    if (point) {
      if (temp) {
        this.ctx.setLineDash([5, 3]);
      }
      this.sketchLine(point.x, point.y, x, 0);
      this.sketchLine(point.x, point.y, x, this.canvasRef.height);
    }
  };

  drawPoint(x, y, temp, lineX) {
    this.ctx.strokeStyle = temp ? tempColor : defColor;
    this.ctx.fillStyle = temp ? tempPColor : defColor;
    this.ctx.beginPath();
    this.ctx.arc(x, y, 5, 0, 2 * Math.PI);
    this.ctx.fill();

    if (lineX) {
      if (temp) {
        this.ctx.setLineDash([5, 3]);
      }
      this.sketchLine(x, y, lineX, 0);
      this.sketchLine(x, y, lineX, this.canvasRef.height);
    }
  }

  mouseOverHandler(e) {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    this.drawState();
    switch (this.action) {
      case 1:
        this.drawLine(x, true, this.side.point);
        break;
      case 2:
        this.drawPoint(x, y, true, this.side.lineX);
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
        this.side.lineX = x;
        break;
      case 2:
        this.side.point = { x, y };
        break;
      default:
        break;
    }
    if (this.action === 1 || this.action === 2) {
      this.drawState();
      this.updateAngle();
    }
  }

  setAction(action) {
    this.action = (this.action === action ? 0 : action);
  }

  updateAngle() {
    if (this.side.lineX && this.side.point) {
      const b = this.canvasRef.height;
      const p1 = { x: this.side.lineX, y: b };
      const p2 = { x: this.side.point.x, y: this.side.point.y };

      const c = Math.sqrt((p1.x - p2.x) ** 2 + (p2.y) ** 2);
      const a = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

      const thetaRads = Math.acos(((a ** 2) + (b ** 2) - (c ** 2)) / (2 * a * b));

      this.infoRef.update(this.side === this.data.left ? 0 : 1, Math.round((thetaRads * 180 / Math.PI) * 100) / 100);
    }
  }

  onSideChange(side) {
    if (side) {
      this.side = this.data.right;
    } else {
      this.side = this.data.left;
    }
  }

  render() {
    return (
      <Grid container direction="column">
        <Grid item>
          <Info ref={r => this.infoRef = r} onSideChange={this.onSideChange.bind(this)} />
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
              <Side setAction={this.setAction} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

CamCanvas.propTypes = {

}
