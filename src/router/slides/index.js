import React from 'react';
import { socket } from '../../index';
import './index.css';
import '../../static/css/svg-icons.css';
import '../../static/css/webslides.css';

export class Slides extends React.Component {
  slides = [
    <section className="bg-apple aligncenter">
      <div className="wrap">
        <h1>WebSocket</h1>
      </div>
    </section>,
    <section className="bg-apple">
      <div className="wrap size-50">
        <h1>Make a Keynote presentation using HTML</h1>
        <p className="text-intro">WebSlides is an open source framework for building HTML presentations, landings, and portfolios.</p>
        <p><code>.bg-apple</code></p>
      </div>
    </section>,
    <section className="bg-apple aligncenter">
      <div className="wrap">
        <h2>HTML presentations can be easy</h2>
      </div>
    </section>
  ];
  constructor(props) {
    super(props);
    this.state = {current: 0};
  }
  componentDidMount() {
    localStorage.getItem('current') &&
    this.setState({current: localStorage.getItem('current')});
    socket.on('change_slide', (msg) => {
      this.set_storage(msg.num);
      this.setState({current: msg.num});
    });
  }
  handle_previous_slide = () => {
    const { current } = this.state;
    const num = current - 1 <= 0 ? 0 : current - 1;
    socket.emit('previous', {num});
    this.set_storage(num);
    this.setState({current: num});
  }
  handle_next_slide = () => {
    const { current } = this.state;
    const num = current + 1 >= this.slides.length - 1 ? this.slides.length - 1 : current + 1;
    socket.emit('next', {num});
    this.set_storage(num);
    this.setState({current: num});
  }
  set_storage = (num) => {
    localStorage.setItem('current', num);
  }
  render() {
    return (
      <div className="slides">
        <article id="webslides">{ this.slides[this.state.current] }</article>
        <div className="slides-btn">
          <span onClick={this.handle_previous_slide} className="btn-left"></span>
          <span onClick={this.handle_next_slide} className="btn-right"></span>
        </div>
      </div>
    );
  }
}
