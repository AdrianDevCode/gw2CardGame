let express = require("express");
const models = require('../models');
let router = express.Router();
let Sequelize = require("sequelize");

let randomNumbers = () => {
    let numbers = [];
     for(let i = 0; i < 4; i++){
        numbers.push(Math.floor(Math.random() * 10) + 1);
     }
     return numbers;  
 }

router.post('/cards', function(req, res, next) {
     let allCards = req.body;
    
     allCards.forEach(card => {
         models.AllCards.create({
            petID: card.id,
            petName: card.name,
            petDescription: card.description,
            petIcon: card.icon
         })
     })
     
  });

router.get("/getCards", function(req, res, next){ 
    // add random attack numbers to each card.
    models.AllCards.findAll({raw: true, order: Sequelize.literal('random()'), limit: 5  }).then(card => {
        let petCards = []
        for(let i = 0; i < 5; i++){
            card[i].attackNumbers = randomNumbers();
            petCards.push(card[i]);
        }
        console.log(petCards)
         res.json(petCards)
       
      })
})

  
  module.exports = router;