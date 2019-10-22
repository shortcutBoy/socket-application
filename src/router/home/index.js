import React from 'react';
import './index.css';

export class Home extends React.Component {
  componentDidMount () {}
  render() {
    return (
      <div className="home">
        <header className="home-header">
          <p className="header-click">
            Home page.
          </p>
        </header>
      </div>
    );
  }
}
