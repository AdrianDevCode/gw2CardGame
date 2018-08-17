import React from 'react';
import PropTypes from 'prop-types';
import './BoardGame.css';
import '../Card/Card.css';
import renderHTML from 'react-render-html';

const sortCards = cards =>{
  let sortedCards = cards.map(card => {
    return({id: card.id, attacks: card.attackNumbers})
    }
  )
  return sortedCards;
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Component BOARD GAME ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class Board extends React.Component { 
  constructor() {
    super();
    this.state= {
      allCards: null,
    }
  }
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
  playerDrawCard = id => {
    this.props.moves.drawCard(id);
  }
  renderCardOnBoard = (id) => {
    if(id !== null){
    let card = document.querySelectorAll(`[data-key="${id}"]`)[0].innerHTML;
    return renderHTML(card);
    
    }
  }
componentWillMount(){
  const aiCards = sortCards(this.props.aiCards);
  const playerCards = sortCards(this.props.playerCards)
  this.props.G.p2Deck = aiCards;
  this.props.G.p1Deck = playerCards;
  this.setState({
    allCards: this.props.playerCards.concat(this.props.aiCards)
  })
}
  isActive(id) {
    return this.props.isActive && this.props.G.cells[id] === null;
  };

  render() {
    let cardJSX = '';

    let tbody = [];
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
          <div>
            {this.renderCardOnBoard(this.props.G.cells[id])}</div>
          </td>
        );
        
      }
      tbody.push(<tr key={i}>{cells}</tr>);
    }
    const createJSXCards = cards => {
      const cardsJSX = cards.map((card) => {         
        let petName = card.petName.replace(/juvenile/i, "");
        return(
            <div className="card-container" onClick={() => {this.playerDrawCard(card.id)}} data-key={card.id}  key={card.id}>
                <div className="handle board-card" >
                    <div className="cardBorder">
                        <div className="cardImage" style={{backgroundImage: `url(${card.petIcon})`}}>
                            <div className="numbers">
                                <div>{card.attackNumbers[0]}</div>
                                <div>{card.attackNumbers[1]} {card.attackNumbers[2]}</div>
                                <div>{card.attackNumbers[3]}</div>
                            </div> 
                        </div>
                        <div className="frame-header">
                        <h4 className="name">{petName}</h4>
                        </div>
                    </div>       
                </div>
            </div>
            )
      })
      return cardsJSX;
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
          <div className="cards">
            {createJSXCards(this.props.aiCards)}
          </div>
        </div>
       <div className="board">
          <table className="table">
            <tbody className="tableBody">{tbody}</tbody>
          </table>
       </div>
        <div className="deckPlayer1">
          <div className="cards">
            {createJSXCards(this.props.playerCards)}
          </div>
        </div>  
      </div>
    );
  }
}

export default Board;