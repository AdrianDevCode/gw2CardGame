import React from 'react';
import './BoardGame.css';
import '../Card/Card.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Component BOARD GAME ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class Board extends React.Component { 
  constructor() {
    super();
    this.state= {
      allCards: null,
      p1Cards: null,
      p2Cards: null,
      cards: null,
      redirect: false,
    }
  }
  
sortCards = cards =>{
  let color = "";
  cards === this.props.playerCards ? color= "blue" : color= "red";
 
  let sortedCards = cards.map(card => { 
    return({id: card.id, attacks: card.attackNumbers, color: color, userId : card.UserId })
    }
  )
  return sortedCards;
}

componentWillMount(){
  let winnerCard = [];
    axios({
      method: 'get',
      url: '/cards/getCards'
    }).then(randomCards => {
        winnerCard.push(randomCards.data[0]); 
    })
  this.props.G.cardWon = winnerCard;
  const aiCards = this.sortCards(this.props.aiCards);
  const playerCards = this.sortCards(this.props.playerCards)
  this.props.G.p2Deck = aiCards;
  this.props.G.p1Deck = playerCards;
  this.props.G.allDecks = this.props.playerCards.concat(this.props.aiCards)
  this.setState({
    allCards: this.props.playerCards.concat(this.props.aiCards),
    p1Cards: this.props.playerCards,
    p2Cards: this.props.aiCards
  })
}
 
  onBoardClick = id => {
    if (this.isActive(id)) {
      this.props.moves.clickBoardCell(id);
      this.props.events.endTurn();
    }
  };
  playerDrawCard = id => {
    if(this.props.ctx.currentPlayer === "0"){
    let newCards = null;
    this.state.p1Cards.forEach(card => {
      if(card.id === id){
        newCards = this.state.p1Cards.filter((card) => {
          if(card.id !== id){
            return card;
          }
        })
        this.setState({
          p1Cards: newCards     
        })
      }
    })
  }else{
    this.state.p2Cards.forEach(card => {
      let newCards = null;
      if(card.id === id){
        newCards = this.state.p2Cards.filter((card) => {
          if(card.id !== id){
            return card;
          }
        })
        this.setState({
          p2Cards: newCards
        })
      }
    })
   
  }

  // document.querySelectorAll(`[data-key="${id}"]`)[0].className = "card-container"
    this.props.moves.drawCard(id);
}
  

  isActive(id) {
    
    return this.props.isActive && this.props.G.cells[id] === null;
  };
  
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~RENDER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  render() {

    let createJSXCard = card => {
      let colorCard = "";
      card.color === "red" ? colorCard = "linear-gradient(to bottom right, rgb(150, 1, 14), rgb(238, 241, 242))" 
      : colorCard = "linear-gradient(to bottom right, rgb(4, 52, 182), rgb(238, 241, 242))"   
      let petName = card.petName.replace(/juvenile/i, "");
      return( 
          <div className='card-container active'  key={card.id}>
              <div className="handle board-card"  style={{background: colorCard}} >
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
  }
   let renderCardOnBoard = (id) => {  
      if(id !== null){
        let newCard = ""; 
        this.props.G.allDecks.forEach(card => {
          if(id === card.id){     
             newCard = createJSXCard(card);     
          }
        }
      )
      return newCard;
      }
    }
   
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
            {renderCardOnBoard(this.props.G.cells[id])}</div>
          </td>
        );
        
      }
      tbody.push(<tr key={i}>{cells}</tr>);
    }
    
    const createJSXCards = cards => {
      let colorCards= "";
      this.state.p2Cards === cards ?  colorCards = `linear-gradient(to bottom right, rgb(150, 1, 14), rgb(238, 241, 242))`
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
      winner = this.props.ctx.gameover.winner; 
      let card = this.props.G.cardWon[0];
      let petName = card.petName.replace(/juvenile/i, "");
      let colorCard = "linear-gradient(to bottom right, rgb(2, 133, 72), rgb(238, 241, 242))";
      if(winner === false){
        Swal({
          title: "Sorry, You lost!",
          confirmButtonText: "Back to Home"
        }).then(result => {
          if(result.value){
            this.setState({
              cards: this.props.playerCards,
              redirect: true,
            })
          }
        })
      }else {
        Swal({
        title: "You Won new Card!", 
        html:`<div class="card-container active centerWonCard"  key=${card.id}> ` +
            ` <div class="handle board-card"  style="background: ${colorCard}" > ` +
                ` <div class="cardBorder"> ` +
                    ` <div class="cardImage" style="background-image: url(${card.petIcon})" > ` +
                        ` <div class="numbers"> ` +
                            `<div>${card.attackNumbers[0]}</div> ` +
                            `<div>${card.attackNumbers[1]} ${card.attackNumbers[2]}</div> ` +
                            `<div>${card.attackNumbers[3]}</div> ` +
                        `</div>` + 
                    `</div> ` +
                    `<div class="frame-header"> ` +
                    `<h4 class="name">${petName}</h4> ` +
                    `</div> ` +
                `</div>` +       
            `</div> ` +
        `</div>`, 
        confirmButtonText: "Back to Home"
        }).then(result => {
        if(result.value) {
          axios({
            method: 'post',
            url: '/cards/addCardToUser',
            data: {
                card: card,
                UserId: winner.toString(),  
            }
          })
        }
      }).then(() => {
        this.setState({
          cards: this.props.playerCards.concat(this.props.G.cardWon),
          redirect: true,
        })
      })
    }
  }

     if (this.state.redirect) {
      return <Redirect to={{
          pathname: '/home',
          state: { referrer: this.state }
        }}/>
  }
  // let disconnected = null;
  //   if (this.props.isMultiplayer && !this.props.isConnected) {
  //     disconnected = <div>Disconnected!</div>;
  //   }

  let player = null;
    if (this.props.playerID) {
      console.log("player name is " + this.props.playerID);
    }

    // if (this.props.isPreview) {
    //   disconnected = player = null;
    // }
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