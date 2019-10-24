import React from 'react';
import { socket } from '../../index';
import { BtnBack } from '../../components/btn-back';
import './index.css';

const COLORS = ['black', 'red', 'green', 'blue', 'yellow'];
export class Whiteboard extends React.Component {

  // Params
  canvas;
  colors;
  context;
  drawing = false;
  current = { color: 'black' };

  componentDidMount() {
    this.context = this.canvas.getContext('2d');
    socket.on('drawing', this.onDrawingEvent);
    window.addEventListener('resize', this.onResize, false);
    this.onResize();
  }

  drawLine = (x0, y0, x1, y1, color, emit) => {
    this.context.beginPath();
    this.context.moveTo(x0, y0);
    this.context.lineTo(x1, y1);
    this.context.strokeStyle = color;
    this.context.lineWidth = 2;
    this.context.stroke();
    this.context.closePath();

    if (!emit) { return; }
    var w = this.canvas.width;
    var h = this.canvas.height;

    socket.emit('drawing', {
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color: color
    });
  }

  onMouseDown = (e) => {
    this.drawing = true;
    this.current.x = e.clientX || e.touches[0].clientX;
    this.current.y = e.clientY || e.touches[0].clientY;
  }

  onMouseUp = (e) => {
    if (!this.drawing) { return; }
    this.drawing = false;
    let clientX = typeof e.clientX === 'number' ? e.clientX : e.touches[0].clientX;
    let clientY = typeof e.clientY === 'number' ? e.clientY : e.touches[0].clientY;
    this.drawLine(this.current.x, this.current.y, clientX, clientY, this.current.color, true);
  }

  onMouseMove = (e) => {
    if (!this.drawing) { return; }
    let clientX = typeof e.clientX === 'number' ? e.clientX : e.touches[0].clientX;
    let clientY = typeof e.clientY === 'number' ? e.clientY : e.touches[0].clientY;
    this.drawLine(this.current.x, this.current.y, clientX, clientY, this.current.color, true);
    this.current.x = clientX;
    this.current.y = clientY;
  }

  onColorUpdate = (e) => {
    this.current.color = e.target.className.split(' ')[1];
  }

  onDrawingEvent = (data) => {
    var w = this.canvas.width;
    var h = this.canvas.height;
    this.drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
  }

  onResize = () => {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  throttle = (cb, delay) => {
    let previousCall = new Date().getTime();
    return function() {
      let time = new Date().getTime();
      if ((time - previousCall) >= delay) {
        previousCall = time;
        cb.apply(null, arguments);
      }
    };
  }
  render() {
    return (
      <div className="whiteboard">
        <canvas
          className="whiteboard"
          onMouseUp={this.onMouseUp}
          onMouseOut={this.onMouseUp}
          onTouchEnd={this.onMouseUp}
          onTouchCancel={this.onMouseUp}
          onMouseDown={this.onMouseDown}
          onTouchStart={this.onMouseDown}
          onMouseMove={this.throttle(this.onMouseMove, 10)}
          onTouchMove={this.throttle(this.onMouseMove, 10)}
          ref={(el) => { this.canvas = el }}></canvas>
        <div ref={(el) => { this.colors = el }} className="colors">
          {
            COLORS.map((name, index) => (
              <div key={index} className={`color ${name}`} onClick={this.onColorUpdate}></div>
            ))
          }
          <div onClick={this.onResize} className="btn-clear">Clear</div>
        </div>
        <BtnBack />
      </div>
    );
  }
}
