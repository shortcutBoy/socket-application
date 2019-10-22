import React from 'react';
import './index.css';

export class Whiteboard extends React.Component {
  render() {
    return (
      <div className="whiteboard">
        <header className="whiteboard-header">
          <p className="header-click">
            Whiteboard page.
          </p>
        </header>
      </div>
    );
  }
}
