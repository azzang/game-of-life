import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <h1>The Game of Life. <span className="small">Generation {this.props.generation}</span></h1>
        <button className="btn btn-primary btn-xs" type="button" id="running" onClick={this.props.updateGameState}>Run</button>
        <button className="btn btn-primary btn-xs" type="button" id="paused" onClick={this.props.updateGameState}>Pause</button>
        <button className="btn btn-primary btn-xs" type="button" id="cleared" onClick={this.props.updateGameState}>Clear</button>
      </header>
    );
  }
}

export default Header;
