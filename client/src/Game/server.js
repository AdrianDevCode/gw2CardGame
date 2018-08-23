const Server = require('boardgame.io/server').Server;
const TicTacToe = require('./Game');
const server = Server({ games: [TicTacToe] });
server.run(8000);