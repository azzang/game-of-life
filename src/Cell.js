import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
  render() {
    return (
      <div className={`cell${this.props.isAlive ? ' alive' : ''}`}
        onClick={this.props.toggleAliveness}></div>
    );
  }
}

export default Cell;
