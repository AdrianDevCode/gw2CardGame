import React, {Component} from 'react';
import { Client } from 'boardgame.io/react';
import { AI } from 'boardgame.io/ai';
import TicTacToe from '../Game';
import Board from './BoardGame';
import axios from 'axios';

const App = Client({
  game: TicTacToe,
  board: Board,
  ai: AI({
    enumerate: G => {
      let r = [];
      for (let i = 0; i < 9; i++) {
        if (G.cells[i] === null) {
          r.push({ move: 'clickCell', args: [i] });
        }
      }
      return r;
    }
  }),
  debug: false,

});
export default class Singleplayer extends Component {
  render(){
    let playerCards = this.props.location.state.referrer.playerCards;
    let aiCards = this.props.location.state.referrer.aiCards;
    return(
      <div>
        <App gameID="single" playerCards={playerCards} aiCards={aiCards} />
      </div>
    )
  }
}
