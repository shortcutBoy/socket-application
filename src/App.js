import React from 'react';
import logo from './logo.svg';
import io from 'socket.io-client';
import './App.css';

export class App extends React.Component {
  handleClick = () => {
    io.connect('http://localhost:4000');
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="header-click" onClick={this.handleClick}>
            Click here to connect the socket server.
          </p>
        </header>
      </div>
    );
  }
}
