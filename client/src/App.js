import React, { Component } from 'react';
import './App.css';
import Board from './Game/Board/BoardGame';
import HomePage from './Home/HomePage';
import LoginPage from './Login/LoginPage';
import Register from "./Login/Register/Register";
import LoginSelection from "./Login/LoginSelection/LoginSelection";
import { Route} from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={LoginPage} />
        <Route path="/loginSelection" component={LoginSelection} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={HomePage} />
        <Route path="/board" component={Board} />
        
      </div>
    );
  }
}
