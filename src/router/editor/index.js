import React from 'react';
import { socket } from '../../index';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BtnBack } from '../../components/btn-back';
import './index.css';

export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: '<p>Hello!</p>'};
  }
  componentDidMount() {
    socket.on('editing', (msg) => {
      this.setState({
        data: msg.data,
      });
    });
  }
  onChange = ( event, editor ) => {
    const data = editor.getData();
    socket.emit('editing', {
      data: data,
    });
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
      <div className="editor">
        <CKEditor
          data={this.state.data}
          editor={ClassicEditor}
          onChange={this.throttle(this.onChange, 500)}/>
        <BtnBack />
      </div>
    );
  }
}
