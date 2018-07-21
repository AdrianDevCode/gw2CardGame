import React, { Component } from 'react';
import './App.css';
import Card from './Card/Card';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Card />
        <img className="boardBG" src="../img/boardWallPaper.jpg" alt=""/>
        
      </div>
    );
  }
}

export default App;
