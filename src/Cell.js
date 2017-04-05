import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAlive: props.isAlive
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isAlive: nextProps.isAlive });
  }

  toggleAliveness() {
    this.setState({ isAlive: !this.state.isAlive });
  }

  render() {
    return (
      <div className={`cell row-${this.props.row} col-${this.props.col} ${this.state.isAlive ? 'alive' : ''}`} onClick={this.toggleAliveness.bind(this)}></div>
    );
  }
}

export default Cell;
