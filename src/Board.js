import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //cells: []
    };
    console.log('board constructor called...');
  }

  componentWillMount() {
    //console.log('component will mount...');
    this.traverse((row, col, cells, newCells) => {
      newCells[row][col] = Math.random() < 0.5;
    });
  }

  componentDidMount() {
    //console.log('component mounted...')
    this.run();
  }

  componentWillReceiveProps(nextProps) {
    console.log('board getting new props...');
    const gameState = nextProps.gameState;

    if (gameState === 'running' && !this.state.timerID) {
      this.run();
    }

    if (gameState === 'paused') {
      this.pause();
    }

    if (gameState === 'cleared') {
      this.clear();
    }
  }

  toggleAliveness(targetRow, targetCol) {
    const gameState = this.props.gameState;
    if (gameState === 'paused' || gameState === 'cleared') {
      this.traverse((row, col, cells, newCells) => {
        if (row === targetRow && col === targetCol) {
          newCells[row][col] = !cells[row][col];
        } else {
          newCells[row][col] = cells[row][col];
        }
      });
    }
  }

  clear() {
    //this.props.setGeneration(true);
    this.pause();
    this.traverse((row, col, cells, newCells) => {
      newCells[row][col] = false;
    });
    //this.props.setGeneration(true);
  }

  run() {
    this.setState({
      timerID: setInterval(this.evolve.bind(this), 500)
    });
  }

  pause() {
    window.clearInterval(this.state.timerID);
    this.setState({timerID: null});
  }

  evolve() {
    this.props.incrementGeneration();
    this.traverse(this.setCellAliveness.bind(this));
  }

  setCellAliveness(row, col, cells, newCells) {
    const isAlive = cells[row][col];
    let count = isAlive ? -1 : 0;
    for (let neighborRow = row - 1; neighborRow < row + 2; neighborRow++) {
      for (let neighborCol = col - 1; neighborCol < col + 2; neighborCol++) {
        if (cells[neighborRow] && cells[neighborRow][neighborCol]) {
          count += 1;
          if (count > 3) {
            return newCells[row][col] = false;
          }
        }
      }
    }
    newCells[row][col] = count === 3 || (isAlive && count === 2);
  }

  getCellComponents() {
    console.log('getting cell components...');
    return this.state.cells.map((row, i) =>
      row.map((col, j) => <Cell toggleAliveness={this.toggleAliveness.bind(this, i, j)} isAlive={col}/>));
  }

  traverse(action) {
    const cells = this.state.cells;
    const newCells = [];
    for (let row = 0; row < this.props.cellsPerCol; row++) {
      for (let col = 0; col < this.props.cellsPerRow; col++) {
        if (col === 0) {
          newCells.push([]);
        }
        action(row, col, cells, newCells);
      }
    }
    this.setState({cells: newCells});
  }

  render() {
    return (
      <main className={`board ${this.props.size}`}>{this.getCellComponents()}</main>
    );
  }
}

export default Board;
