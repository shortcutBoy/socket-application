import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export class BtnBack extends React.Component {

  render() {
    return (
      <Link className="btn-back" to='/'>Back</Link>
    );
  }
}
