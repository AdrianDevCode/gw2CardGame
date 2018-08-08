
import { Game } from 'boardgame.io/core';

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
    p1Deck: [10,11,12,13,14],
    cells: Array(9).fill(null),
    p2Deck: [20,21,22,23,24],
    hand: [null]
  }),

  moves: {
    clickBoardCell(G,ctx, id) {
      const cells = [...G.cells];
      let hand = [...G.hand];

      if (cells[id] === null) {
        cells[id] = hand[0];
      }
      
      return { ...G, cells, hand };
    },

    drawCard(G, ctx, id){
      let deck = [];
      ctx.currentPlayer === "0" ? deck = [...G.p1Deck] : deck = [...G.p2Deck]
      let hand = [...G.hand];
      
      hand = [];
      hand.push(deck[id]);
        console.log(hand.length)
      return {...G, hand}
      //turnInvisible(deck[id]); 
          
    }
  },

  flow: {
    // phases: [
    //   {
    //     name: 'draw phase',
    //     allowedMoves: ['drawCard'],
    //     endPhaseIf: G => G.hand.length = 1
    //   },
    //   {
    //     name: 'play phase',
    //     allowedMoves: ['clickBoardCell'],
    //     endPhaseIf: G => G.hand.length = 0
    //   }
    // ],

    movesPerTurn: 2,

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