import React, { Component } from 'react';
import Header from './Header';
import Board from './Board';
import './App.css';

class App extends Component {
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
    console.log('game will mount...');

    const innerWidth = window.innerWidth;
    if (innerWidth >= 1000) {
      //this.setDimensions('large', 100);
      this.setDimensions('medium', 70);
    } else if (innerWidth >= 700) {
      this.setDimensions('medium', 70);
    } else {
      this.setDimensions('small', 50);
    }
  }

  incrementGeneration() {
    console.log(undefined ? 1 : this.state.generation + 1);
    this.setState({
      generation: this.state.generation + 1
    });
  }

  handleButtonClick(e) {
    const newValue = e.target.id;
    const newState = {};
    if (newValue !== this.state.value) {
      newState.value = newValue;
      if (newValue === 'cleared') {
        newState.generation = 1;
      }
      this.setState(newState);
    }
  }

  render() {
    return (
      <div className={`App ${this.state.size}`}>
        <Header updateGameState={this.handleButtonClick.bind(this)} generation={this.state.generation}/>
        <Board size={this.state.size} cellsPerRow={this.state.cellsPerRow} cellsPerCol={this.state.cellsPerCol}
          incrementGeneration={this.incrementGeneration.bind(this)} gameState={this.state.value}/>
      </div>
    );
  }
}

export default App;
