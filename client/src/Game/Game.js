
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
    p1Deck: Array(5).fill(null),
    cells: Array(9).fill(null),
    p2Deck: Array(5).fill(null),
    hand: null
  }),

  moves: {
    clickBoardCell(G, ctx, id) {
      const cells = [...G.cells];

      if (cells[id] === null) {
        cells[id] = ctx.currentPlayer;
      }

      return { ...G, cells };
    },

    //click on p1deck to choose card and move it to hand.

    drawCard(G, ctx, id){
      let deck = [...G.p1Deck];
      let hand = [...G.hand];
      
      hand = deck[id];
        //turnInvisible(deck[id]); 
      
    }
    

    // click on p2cells to choose card and copy it to holding box.

    //click on cells to put the chosen card inside the cell.


  },

  flow: {
    movesPerTurn: 1,

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