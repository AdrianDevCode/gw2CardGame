
import { Game } from 'boardgame.io/core';

function cardsAttack(currentCardAttack, adjacentCardsAttack, adjacentCardsPos, currentCardPos) {
  
  let currentPlayerAttack  = null;
  let adjacentPlayerAttack = null;
  const attackPositions   = ["top", "left", "right", "bottom"]; // [5,8,2,9]
  let outcome = [];
  adjacentCardsAttack.forEach((card, i) => {
    
    attackPositions.forEach((position, index) => {  
      if(position === adjacentCardsPos[i]){
        currentPlayerAttack = currentCardAttack.attacks[index]//current player  card attack digit
        
      }else if(position === currentCardPos[i]){
        adjacentPlayerAttack = card.attackNumbers[index] // adjacent player card attack digit
        
      }  
    })
    if(currentCardAttack.color === card.color){
      outcome.push(false);
     // console.log("same colors!")
    }else if(currentPlayerAttack > adjacentPlayerAttack){
      outcome.push(card.id);
     // console.log("flip" + card.id);
    }else if(currentPlayerAttack < adjacentPlayerAttack){
      outcome.push(currentCardAttack.id);
     // console.log("flip" + currentCardAttack.id)
    }else {
      outcome.push(false);
      //console.log("dont do anything")
    }
  })
  return outcome;
}
function IsVictory(cells){
  // check if there are any null boxes left
  let board = cells.find(cell => {return cell === null});
  if(board === undefined){
    return true; 
  }
}
// check board if current card gets flipped or flip adjacent cards on board
function boardCheck(G, allCards, cells, currentCardOnBoard, cardAttack){

  let flipCards = null;
  const boardId = currentCardOnBoard; //integer 0 thru 8
  const boardCells = cells;
  const currentCardAttack = cardAttack;
  let adjacentCardsAttack = [];
  let adjacentCardsIDs = []; // ids of adjacent cards
  let adjacentCardsPos = []; // positions of adjacent cards
  let currentCardPos = [];
  const possibleCombinations = [
    {otherCardsIDs: [1, 3], pos1: ["right", "bottom"], pos2: ["left", "top"] },
    {otherCardsIDs: [0, 2, 4 ], pos1: ["left", "right","bottom"], pos2: ["right", "left", "top"]},
    {otherCardsIDs: [1, 5], pos1: ["left", "bottom"], pos2: ["right", "top"]},
    {otherCardsIDs: [0, 4, 6], pos1: ["top", "right", "bottom"], pos2: ["bottom", "left", "top"]},
    {otherCardsIDs: [1, 3, 5, 7], pos1: ["top", "left", "right", "bottom"], pos2: ["bottom", "right", "left", "top"]},
    {otherCardsIDs: [2, 4, 8], pos1: ["top", "left", "bottom"], pos2: ["bottom", "right", "top"]},
    {otherCardsIDs: [3, 7], pos1: ["top","right"], pos2: ["bottom", "left"]},
    {otherCardsIDs: [4, 6, 8], pos1: ["top", "left", "right"], pos2: ["bottom", "right", "left"]},
    {otherCardsIDs: [5, 7], pos1: ["top", "left"], pos2: ["bottom", "right"]}
  ]
    // get adjacent cards id's and positions
  possibleCombinations.map(adjacentCards => { 
    if(adjacentCards === possibleCombinations[boardId]) {
        for(let i = 0; i < adjacentCards.otherCardsIDs.length; i++ ){
          let id = adjacentCards.otherCardsIDs[i];

          if(boardCells[id] !== null) {  
            adjacentCardsIDs.push(boardCells[id]);
            adjacentCardsPos.push(adjacentCards.pos1[i]);
            currentCardPos.push(adjacentCards.pos2[i]);
          }
        }
      }
    }
  )
// get adjacent cards attack numbers
  adjacentCardsIDs.forEach(id => {
    allCards.forEach(card => {
      if(id === card.id){
        adjacentCardsAttack.push(card)
      }
    })
  })
  
  return flipCards =(cardsAttack(currentCardAttack, adjacentCardsAttack, adjacentCardsPos, currentCardPos));
  
}

const TicTacToe = Game({
  name: 'tic-tac-toe',

  setup: () => ({
    
    p1Deck: Array(5).fill(null),
    cells: Array(9).fill(null),
    p2Deck: Array(5).fill(null),
    allDecks: Array(10).fill(null),
    hand: [null],
    cardWon: [null]
  }),

  moves: {
    clickBoardCell(G,ctx, id) {
      const cells = [...G.cells];
      let outcome = null;
      let hand = [...G.hand];
      const allDecks = [...G.allDecks]; 
      if (cells[id] === null) {
        cells[id] = hand[0].id;
      }
      outcome = (boardCheck(G, allDecks, cells, id, hand[0]));
      hand = [null];
      outcome.forEach(cardToFlip => {
        
        if(cardToFlip){
          allDecks.forEach(card => {  
            if(cardToFlip === card.id){
              card.color === "red" ? card.color = "blue" : card.color = "red";
            }
          })
        }
      })
      
      return { ...G, cells, hand, allDecks };
    },

    drawCard(G, ctx, id){
      let deck = [];
      ctx.currentPlayer === "0" ? deck = [...G.p1Deck] : deck = [...G.p2Deck];
      let hand = deck.filter(card => {
        if(card.id === id){
          return card;
        }
      })
      return {...G, hand} 
    }
  },

  flow: {
    // phases: [
    //   {
    //     name: 'draw phase',
    //     allowedMoves: ['drawCard'],
    //     endPhaseIf: G => G.hand !== null
    //   },
    //   {
    //     name: 'play phase',
    //     allowedMoves: ['clickBoardCell'],
    //     endTurnIf: G => G.hand === null
    //   }
    //  ],

   // movesPerTurn: 2,

   endGameIf: (G, ctx) => {
    if (IsVictory(G.cells)) { //IsVictory(G.cells)
      let winner = null;
      let blue = 0;
      let red = -1;
      G.allDecks.forEach(card => {
        card.color === "blue" ? blue++ : red++;
      })
      blue > red ? winner = G.p1Deck[0].userId : false;
      return { winner: winner};
    }
    if (G.cells.filter(c => c === null).length == 0) {
      return { draw: true };
    }
  },
  },
});

export default TicTacToe;