import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: []
    }
    console.log(this.state.cells, 'CELLS');
  }

  componentWillReceiveProps(nextProps) {
    const newState = {};
    if (nextProps.headerState === 'paused') {
      window.clearInterval(this.state.gameID);
      newState.gameID = null;
    }
    //this.setState({ isAlive: nextProps.isAlive });
  }

  componentWillMount() {
    console.log('component will mount...');
    this.init();
    //this.start();
    /*this.setState({
      cells: this.init(),
      gameID: setInterval(this.evolve.bind(this), 1000)
    });*/
  }

  componentDidMount() {
    console.log('component mounted...')
    this.start();
  }

  /*start() {
    this.setState({
      gameID: setInterval(this.getEvolvedCells.bind(this), 1000)
    });
  }*/

  start() {
    this.setState({
      gameID: setInterval(this.evolve.bind(this), 500)
    });
  }

  evolve() {
    this.traverse(this.setCellAliveness.bind(this));
    //this.setState({
      //cells: this.traverse()
    //});
  }



  /*
  Any live cell with fewer than two live neighbours dies
  Any live cell with two or three live neighbours lives
  Any live cell with more than three live neighbours dies,
  Any dead cell with exactly three live neighbours becomes a live cell,
  */

  countLiveNeighbors(row, col, cells) {
    let count = 0;
    let neighborRow;
    let neighborCol;
    for (var i = 0; i < 9; i++) {
      neighborRow = row + Math.floor(i / 3) - 1;
      neighborCol = col + i % 3 - 1;
      if (i !== 4 && cells[neighborRow] && cells[neighborRow][neighborCol]) {
        count += 1;
      }
    }
    return count;
  }

  setCellAliveness(row, col, cells, newCells) {
    const liveCount = this.countLiveNeighbors(row, col, cells);
    if (liveCount === 3 || (cells[row][col] && liveCount === 2)) {
      newCells[row][col] = true;
    } else {
      newCells[row][col] = false;
    }
  }

  init() {
    this.traverse((row, col, cells, newCells) => {
      newCells[row][col] = Math.random() < 0.5;
    });
  }

  /*getCellComponents() {
    return this.traverse((row, col, cells, newCells) => {
      //newCells.push(<Cell row={row} col={col} isAlive={cells[row][col]}/>);
      newCells[row][col] = <Cell row={row} col={col} isAlive={cells[row][col]}/>;
    });
  }*/

  stuff() {
    return this.state.cells.map((row, i) =>
      row.map((col, j) => <Cell row={i} col={j} isAlive={col}/>));
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
    this.setState({ cells: newCells });
  }

  render() {
    return (
      <main className={"board " + this.props.size}>{this.stuff()}</main>
    );
  }
}

export default Board;
