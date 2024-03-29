import React from 'react';
import { Slides } from './router/slides';
import { Editor } from './router/editor';
import { Chatroom } from './router/chatroom';
import { Whiteboard } from './router/whiteboard';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';

export class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/">
              <Slides />
            </Route>
            <Route exact path="/chatroom">
              <Chatroom />
            </Route>
            <Route path="/whiteboard">
              <Whiteboard />
            </Route>
            <Route path="/editor">
              <Editor />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
