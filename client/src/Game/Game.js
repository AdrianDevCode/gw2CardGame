
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
        //console.log(currentPlayerAttack);
      }else if(position === currentCardPos[i]){
        adjacentPlayerAttack = card.attacks[index] // adjacent player card attack digit
        //console.log(adjacentPlayerAttack)
      }
      
    })
    if(currentPlayerAttack > adjacentPlayerAttack){
      console.log("flip" + card.id);
    }else if(currentPlayerAttack < adjacentPlayerAttack){
      console.log("flip" + currentCardAttack.id)
    }else {
      console.log("dont do anything")
    }
  })
}

// check board if current card gets flipped or flip adjacent cards on board
function boardCheck(allCards, cells, currentCardOnBoard, cardAttack){
  // check if there are any null boxes left. if there is none, use isVictory() and end game
  //   const board = G.cells.find(cell => {return cell === null});
  // if(board === undefined){
  //   //isVictory()
  //   // gameEnd()
  // }
  //allCards.sort((a, b) => a - b);
  const boardId = currentCardOnBoard; //integer 0 thru 8
  const boardCells = cells;
  const currentCardAttack = cardAttack;
  let adjacentCardsAttack = [];
  let adjacentCardsIDs = []; // ids of adjacent cards
  let adjacentCardsPos = []; // positions of above adjacent cards
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
  
  cardsAttack(currentCardAttack, adjacentCardsAttack, adjacentCardsPos, currentCardPos);

   //cardsAttack(currentCardAttack,adjacentCardsIDs, adjacentCardsPos)

  // for(let i = 0; i < possibleCombinations[boardId].length; i + 2){  
  //   if(i !== null){
  //     const adjacentCardPos = i + 1;
  //     let adjacentCard = 2; //get the card object in position [i] and its attacknumbers

  //     let result = cardsAttack(currentCardOnBoard, adjacentCard, adjacentCardPos);
  //     if(result === true){
  //       // change color of adjacent card to currentplayer's color card
  //     }else if(result === false){
  //       // change color of current player's card to to other player's color
  //     }
  //   }
  // }

}

function IsVictory(cells) {
  const positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let pos of positions) {
    const symbol = cells[pos[0]];
    let winner = symbol;
    for (let i of pos) {
      if (cells[i] !== symbol) {
        winner = null;
        break;
      }
    }
    if (winner !== null) return true;
  }

  return false;
}

const TicTacToe = Game({
  name: 'tic-tac-toe',

  setup: () => ({
    
    p1Deck: Array(5).fill(null),
    cells: Array(9).fill(null),
    p2Deck: Array(5).fill(null),
    allDecks: Array(10).fill(null),
    hand: [null],
  }),

  moves: {
    clickBoardCell(G,ctx, id) {
      const cells = [...G.cells];
      let hand = [...G.hand];
      let allDecks = [...G.allDecks];
      
      if (cells[id] === null) {
        cells[id] = hand[0].id;
        
      }
      boardCheck(allDecks, cells, id, hand[0]);
      hand = [null]
      return { ...G, cells, hand };
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
      if (IsVictory(G.cells)) {
        return { winner: ctx.currentPlayer };
      }
      if (G.cells.filter(c => c === null).length === 0) {
        return { draw: true };
      }
    },
  },
});

export default TicTacToe;