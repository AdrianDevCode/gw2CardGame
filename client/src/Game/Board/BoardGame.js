import React, {Component} from 'react';
import Card from '../Card/Card';
import Square from '../Square/Square';
import "./BoardGame.css";
import PlayerCards from '../Deck/PlayerCards';

export default class Board extends Component {
    constructor() {
      super()
      this.state = {pos: [0,0]}
    }
  renderSquare(i) {
    const x = i % 3;
    const y = Math.floor(i / 3);
  
    const [cardX, cardY] = this.state.pos;
    const piece = (x === cardX && y === cardY) ? <Card /> : null;
    
    return (
      <div >
        <Square >
          {piece}
        </Square>
        </div>
    );
  } 
  
    render() {
      const squares = [];
      for (let i = 0; i < 9; i++) {
        squares.push(this.renderSquare(i));
      }
    
      return (
        <div className="board">
           <div className="squaresGrid">
           <PlayerCards /> 
                <div className="squares">
                {squares[0]}
                {squares[1]}
                {squares[2]}
                </div>
                <div className="squares">
                {squares[3]}
                {squares[4]}
                {squares[5]}
                </div>
                <div className="squares">
                {squares[6]}
                {squares[7]}
                {squares[8]}
                </div>
                <PlayerCards />  
            </div>
        </div>
      );
    }
  }