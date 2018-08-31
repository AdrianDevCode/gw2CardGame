import React, { Component } from 'react';
import './App.css';
//import Multiplayer from './Game/Board/multiplayer';
import HomePage from './Home/HomePage';
import LoginPage from './Login/LoginPage';
import Register from "./Login/Register/Register";
import LoginSelection from "./Login/LoginSelection/LoginSelection";
import { Route } from 'react-router-dom';
import axios from 'axios';
import SinglePlayer from './Game/Board/singleplayer';

export default class App extends Component {
  
  componentWillMount() {
    axios({
      method: 'get',
      url: 'https://api.guildwars2.com/v2/pets?ids=all', //gets an array of objects of pets
    }).then(res => {
      
      return axios({
        method: 'post',
        url: '/cards/cards', //route to backend to store pets on database
        data: res.data
      })
    })
  }
  render() {
  
    return (
      <div className="App">
        <Route path="/singleplayer" component={SinglePlayer} />
        <Route exact path="/" component={LoginPage} />
        <Route path="/loginSelection" component={LoginSelection} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={HomePage} />
         
        
      </div>
    );
  }
}
