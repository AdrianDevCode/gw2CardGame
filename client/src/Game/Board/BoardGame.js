import React from 'react';
import PropTypes from 'prop-types';
import './BoardGame.css';
import '../Card/Card.css';
import renderHTML from 'react-render-html';

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Component BOARD GAME ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class Board extends React.Component { 
  constructor() {
    super();
    this.state= {
      allCards: null,
      p1Cards: null,
      p2Cards: null,
    }
  }
  
sortCards = cards =>{
  let color = ""; 
  cards === this.props.playerCards ? color= "blue" : color= "red";
 
  let sortedCards = cards.map(card => { 
    return({id: card.id, attacks: card.attackNumbers, color: color })
    }
  )
  return sortedCards;
}
  componentWillMount(){
    const aiCards = this.sortCards(this.props.aiCards);
    const playerCards = this.sortCards(this.props.playerCards)
    this.props.G.p2Deck = aiCards;
    this.props.G.p1Deck = playerCards;
    this.props.G.allDecks = this.sortCards(this.props.playerCards.concat(this.props.aiCards));
    this.setState({
      allCards: this.props.playerCards.concat(this.props.aiCards),
      p1Cards: this.props.playerCards,
      p2Cards: this.props.aiCards
    })
  }
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool
  };
  // removeCard = id => {
  //   let p1Cards = this.state.p1Cards;
   
  //   for(let i = 0; i < 5; i++){
  //    let newDeck = p1Cards.splice(p1Cards[i].id === id);
     
  //    return newDeck;
  //   }
  // }
  onBoardClick = id => {
    if (this.isActive(id)) {
      this.props.moves.clickBoardCell(id);
      
      this.props.events.endTurn();
    }
  };
  playerDrawCard = id => {
    document.querySelectorAll(`[data-key="${id}"]`)[0].className = "card-container"
    this.props.moves.drawCard(id);
}
  renderCardOnBoard = (id) => {  
    if(id !== null){ 
    let card = document.querySelectorAll(`[data-key="${id}"]`)[0].innerHTML;
    return renderHTML(card);
    }
  }

  isActive(id) {
    
    return this.props.isActive && this.props.G.cells[id] === null;
  };
  
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~RENDER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
      let colorCards= "";
      this.props.aiCards === cards ?  colorCards = `linear-gradient(to bottom right, rgb(150, 1, 14), rgb(238, 241, 242))`
      : colorCards = `linear-gradient(to bottom right, rgb(4, 52, 182), rgb(238, 241, 242))`;

      const cardsJSX = cards.map((card) => {         
        let petName = card.petName.replace(/juvenile/i, "");
        return( 
            <div className='card-container active' onClick={() => {{this.playerDrawCard(card.id)}}} data-key={card.id}  key={card.id}>
                <div className="handle board-card"  style={{background: colorCards}} >
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
            {createJSXCards(this.state.p2Cards)}
          </div>
        </div>
       <div className="board">
          <table className="table">
            <tbody className="tableBody">{tbody}</tbody>
          </table>
       </div>
        <div className="deckPlayer1">
          <div className="cards">
            {createJSXCards(this.state.p1Cards)}
          </div>
        </div>  
      </div>
    );
  }
}

export default Board;