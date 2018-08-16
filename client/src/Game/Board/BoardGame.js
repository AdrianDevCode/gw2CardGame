import React from 'react';
import PropTypes from 'prop-types';
import './BoardGame.css';
import Card from "../Card/Card";


class Board extends React.Component {
  
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool
  };
  onBoardClick = id => {
    if (this.isActive(id)) {
      this.props.moves.clickBoardCell(id);
      this.props.events.endTurn();
    }
  };

  isActive(id) {
    return this.props.isActive && this.props.G.cells[id] === null;
  };

  render() {
    
    let tbody = [];
    let player1Deck = [];
    let player2Deck = [];

    for (let i = 0; i < 3; i++) {
      let cells = [];
      for (let j = 0; j < 3; j++) {
        const id = 3 * i + j;
        cells.push(
          <td
            key={id}
            className={this.isActive(id) ? 'active' : ''}
            onClick={() =>  {
              this.onBoardClick(id)
              
             }}
          >
            {id}
          </td>
        );
        
      }
      tbody.push(<tr key={i}>{cells}</tr>);
      
    }
    for(let i = 0; i < 5; i++){
     const id = i;
      player1Deck.push( <td
        key={id}
        onClick={() => {
           this.props.moves.drawCard(id)
           
          }}
      >
        {this.props.G.p1Deck[i]}
        </td>)   
    }
    for(let i = 0; i < 5; i++){
      const id = i;
       player2Deck.push( <td
         key={id}
         onClick={() => {
            this.props.moves.drawCard(id)
            
           }}
       >
         {this.props.G.p2Deck[i]}
         </td>)   
     }

    let winner = null;
    if (this.props.ctx.gameover) {
      winner =
        this.props.ctx.gameover.winner !== undefined ? (
          <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
        ) : (
          <div id="winner">Draw!</div>
        );
    }

    let player = null;
    if (this.props.playerID) {
      player = <div id="player">Player: {this.props.playerID}</div>;
    }


    return (
      <div className="border">
        <div className="deckPlayer2">
          <Card cards={this.props.aiCards}/>
        </div>
       <div className="board">
        <table className="table">
          <tbody className="tableBody">{tbody}</tbody>
        </table>
       </div>
        <div className="deckPlayer1">
          <Card cards={this.props.playerCards}/>
        </div>
        
      </div>
    );
  }
}

export default Board;