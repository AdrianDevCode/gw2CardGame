import React, {Component} from 'react';
import Card from '../Card/Card';
import Square from '../Square/Square';
import PropTypes from 'prop-types';
import PlayerCards from '../Deck/PlayerCards';
import "./BoardGame.css";

export default class Board extends Component {
  
  renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);
  
    const [cardX, cardY] = this.props.cardPosition;
    const piece = (x === cardX && y === cardY) ? <Card /> : null;

    return (
        <Square >
          {piece}
        </Square> 
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
               
                
               
            </div>
        </div>
      );
    }
  }

  Board.propTypes = {
    cardPosition: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  };

  // work on numbers cooridnates messed up.