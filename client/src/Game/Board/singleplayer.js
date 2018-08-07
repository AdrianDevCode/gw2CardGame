import React from 'react';
import { Client } from 'boardgame.io/react';
import { AI } from 'boardgame.io/ai';
import TicTacToe from '../Game';
import Board from './BoardGame';

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
    },
    
  }),
  
});

const Singleplayer = () => (
  <div style={{ padding: 50 }}>
    <h1>Singleplayer</h1>
    <App gameID="single" />
  </div>
);

export default Singleplayer;