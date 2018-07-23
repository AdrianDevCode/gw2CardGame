import React, { Component } from 'react';
import './App.css';
import Board from "./Board/BoardGame";


export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Board cardPosition={[1,0]} />
      </div>
    );
  }
}
