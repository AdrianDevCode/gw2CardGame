
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    
    return array[0];
  }
const BotAI = (deck,cells) => {
    let nullCells = [];
    let card = shuffle(deck);
    let cell = 0;
    cells.forEach((cell, index) => {
        if(cell === null){
            nullCells.push(index);
        }
    });
    cell = shuffle(nullCells);
    console.log(cell)
    let aiChoices = [card.id, cell];
    return aiChoices;
    
}

export default BotAI;