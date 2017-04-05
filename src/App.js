import React, { Component } from 'react';
import Header from './Header';
import Board from './Board';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 'large'
    }
  }

  getCellCount() {
    switch(this.state.size) {
      case 'small':
        return { across: 50, tall: 30 };
      case 'medium':
        return { across: 70 , tall: 50 };
      case 'large':
        return { across: 100, tall: 80 };
      default: return;
    }
  }

  pause() {
    this.setState({ headerState: 'paused' });
  }


  render() {
    return (
      <div className={'App ' + this.state.size}>
        <Header pause={this.pause.bind(this)} />
        <Board size={this.state.size} cellsPerRow={this.getCellCount().across} cellsPerCol={this.getCellCount().tall} headerState={this.state.headerState}/>
      </div>
    );
  }
}

export default App;
