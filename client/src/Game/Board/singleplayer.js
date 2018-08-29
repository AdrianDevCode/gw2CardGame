import React, {Component} from 'react';
import { Client } from 'boardgame.io/react';
import TicTacToe from '../Game';
import Board from './BoardGame';
import { AI } from 'boardgame.io/ai';

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
const App = Client({
  game: TicTacToe,
  board: Board,
  ai: AI({
    enumerate: (G, ctx) => {
      let moves = [];
      G.p2Deck.forEach((card) => {
        moves.push({ move: 'drawCard', args: [card.id] });
      });
      for (let i = 0; i < 9; i++) {
        if (G.cells[i] === null) {
          moves.push({ move: 'clickBoardCell', args: [i] });
        }
      };
     
      return moves;
    },
  }),
  //debug: false,
});
export default class Singleplayer extends Component {
  
  render(){
    let playerCards = shuffle(this.props.location.state.referrer.playerCards); // randomize the cards and pull only 5
    let selectedPlayerCards = [];
    for(let i = 0; i < 5; i++){
      selectedPlayerCards.push(playerCards[i]);
    }
    let aiCards = this.props.location.state.referrer.aiCards;
    for(let i = 0; i < selectedPlayerCards.length; i++){
      playerCards[i].color = "blue";
      aiCards[i].color = "red"; 
    }
    
    return(
      <div>
        <App  playerCards={selectedPlayerCards} aiCards={aiCards} allPlayerCards={playerCards} />
       
      </div>
    )
  }
}
