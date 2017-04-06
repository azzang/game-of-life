import React, { Component } from 'react';
import Header from './Header';
import Cells from './Cells';
import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'running',
      generation: 1
    }
  }

  setDimensions(size, cellsPerRow) {
    this.setState({
      size,
      cellsPerRow,
      cellsPerCol: cellsPerRow - 20
    });
  }

  componentWillMount() {
    const innerWidth = window.innerWidth;
    if (innerWidth >= 1000) {
      this.setDimensions('large', 100);
    } else if (innerWidth >= 700) {
      this.setDimensions('medium', 70);
    } else {
      this.setDimensions('small', 50);
    }
  }

  incrementGeneration() {
    this.setState({
      generation: this.state.generation + 1
    });
  }

  handleButtonClick(e) {
    const newGameState = e.target.id;
    const newState = {};
    if (newGameState !== this.state.value) {
      newState.value = newGameState;
      if (newGameState === 'cleared') {
        newState.generation = 1;
      }
      this.setState(newState);
    }
  }

  render() {
    return (
      <div className={`game ${this.state.size}`}>
        <Header updateGameState={this.handleButtonClick.bind(this)} generation={this.state.generation}/>
        <Cells size={this.state.size} cellsPerRow={this.state.cellsPerRow} cellsPerCol={this.state.cellsPerCol}
          incrementGeneration={this.incrementGeneration.bind(this)} gameState={this.state.value}/>
      </div>
    );
  }
}

export default Game;
