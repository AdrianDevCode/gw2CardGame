import React, { Component } from 'react';
import './App.css';
import Board from './Game/Board/BoardGame';
import HomePage from './Home/HomePage';
import LoginPage from './Login/LoginPage';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginPage />
      </div>
    );
  }
}
