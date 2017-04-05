import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1>The Game of Life. <span className="small">Generation 0</span></h1>
        <button className="btn btn-default" type="button">Run</button>
        <button className="btn btn-default" type="button" onClick={this.props.pause}>Pause</button>
        <button className="btn btn-default" type="button">Clear</button>
      </header>
    );
  }
}

export default Header;
