
import { Game } from 'boardgame.io/core';

function cardsAttack(currentCard, adjacentCard, adjacentCardPos) {
  let currentCardAttack = 0;
  let adjacentCardAttack = 0; 
  const pos = adjacentCardPos; // ex. "right"
  const attackPositions = ["top", "right", "bottom", "left"]; // [5,8,2,9]
  
  for(let i = 0; i < 4; i++){
    if(pos === attackPositions[i]){
      if(i < 2){
        currentCardAttack = currentCard.attackNumbers[i];
        adjacentCardAttack = adjacentCard.attackNumbers[i + 2];
      }else if(i >= 2){
        currentCardAttack = currentCard.attackNumbers[i];
        adjacentCardAttack = adjacentCard.attackNumbers[i - 2];
      }
    }
  }
  if(currentCardAttack > adjacentCardAttack){
    return true;
  }else return false;
}

// check board if current card gets flipped or flip adjecent cards on board
function boardCheck(G, ctx,currentCardOnBoard){
  // check if there are any null boxes left. if there is none, use isVictory() and end game
    const board = G.cells.find(cell => {return cell === null});
  if(board === undefined){
    //isVictory()
    // gameEnd()
  }

  let boardId = currentCardOnBoard.id; //integer 0 thru 8
  const possibleCombinations = {
    0: [1, "right", 3, "bottom"],
    1: [0, "left", 2, "right", 4, "bottom"],
    2: [1, "left", 5, "bottom"],
    3: [0, "top", 4, "right", 6, "bottom"],
    4: [1, "top", 3, "left", 5, "right", 7, "bottom"],
    5: [2, "top", 4, "left", 8, "bottom"],
    6: [3, "top", 7, "right"],
    7: [4, "top", 6, "left", 8, "right"],
    8: [5, "top", 7, "left"]
  }
  
  for(let i = 0; i < possibleCombinations.boardId.length; i + 2){
    if(i !== null){
      const adjacentCardPos = i + 1;
      let adjacentCard = 2; //get the card object in position [i] and its attacknumbers

      let result = cardsAttack(currentCardOnBoard, adjacentCard, adjacentCardPos);
      if(result === true){
        // change color of adjacent card to currentplayer's color card
      }else if(result === false){
        // change color of current player's card to to other player's color
      }
    }
  }

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
    p1Deck: [],
    cells: Array(9).fill(null),
    p2Deck: [20,21,22,23,24],
    hand: [null],
  }),

  moves: {
    clickBoardCell(G,ctx, id) {
      const cells = [...G.cells];
      let hand = [...G.hand];

      if (cells[id] === null) {
        cells[id] = hand[0];
      }
      hand = [null]
      return { ...G, cells, hand };
    },

    drawCard(G, ctx, id){
      let deck = [];
      ctx.currentPlayer === "0" ? deck = [...G.p1Deck] : deck = [...G.p2Deck]
      let hand = [...G.hand];
      
      hand[0] = deck[id];
        
      return {...G, hand}
      //turnInvisible(deck[id]); 
          
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