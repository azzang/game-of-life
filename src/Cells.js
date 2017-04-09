import React, { Component } from 'react';
import './Cells.css';

class Cells extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.traverse((row, col, cells, newCells) => {
      newCells[row][col] = Math.random() < 0.5;
    });
  }

  componentDidMount() {
    this.run();
  }

  componentWillReceiveProps(nextProps) {
    const {gameState} = nextProps;
    if (gameState === 'running' && !this.state.timerID) {
      this.run();
    }
    if (gameState === 'paused' || gameState === 'cleared') {
      this.pause();
    }
    if (gameState === 'cleared') {
      this.clear();
    }
  }

  toggleAliveness(targetRow, targetCol) {
    const {gameState} = this.props;
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

  run() {
    this.setState({
      timerID: setInterval(this.evolve.bind(this), 500)
    });
  }

  pause() {
    window.clearInterval(this.state.timerID);
    this.setState({timerID: null});
  }

  clear() {
    this.traverse((row, col, cells, newCells) => {
      newCells[row][col] = false;
    });
  }

  evolve() {
    this.props.incrementGeneration();
    this.traverse(this.setCellAliveness.bind(this));
  }

  setCellAliveness(row, col, cells, newCells) {
    const isAlive = cells[row][col];
    let liveCount = isAlive ? -1 : 0;
    for (let neighborRow = row - 1; neighborRow < row + 2; neighborRow++) {
      for (let neighborCol = col - 1; neighborCol < col + 2; neighborCol++) {
        if (cells[neighborRow] && cells[neighborRow][neighborCol]) {
          liveCount += 1;
          if (liveCount > 3) {
            return newCells[row][col] = false;
          }
        }
      }
    }
    newCells[row][col] = liveCount === 3 || (isAlive && liveCount === 2);
  }

  getCells() {
    return this.state.cells.map((row, i) =>
      row.map((col, j) => (<div className={`${col ? 'cell alive' : 'cell'}`}
        onClick={this.toggleAliveness.bind(this, i, j)}></div>)));
  }

  traverse(action) {
    const cells = this.state.cells;
    const newCells = [];
    for (let row = 0; row < this.props.cellsPerCol; row++) {
      newCells[row] = [];
      for (let col = 0; col < this.props.cellsPerRow; col++) {
        action(row, col, cells, newCells);
      }
    }
    this.setState({cells: newCells});
  }

  render() {
    return (
      <div className={`cells ${this.props.size}`}>{this.getCells()}</div>
    );
  }
}

export default Cells;
