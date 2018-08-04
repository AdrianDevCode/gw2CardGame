var express = require('express');
var router = express.Router();
// const ensureAuthenticated = require('../auth').ensureAuthenticated;
const models = require('../models');

// router.all('*', ensureAuthenticated);

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.findById(req.user)
  .then((user) => {
    res.send(user);
  })
});

// this is a simple API to check if there is a user
router.get('/current', (req, res, next) => {
    if (req.user) {
        // req.user will have been deserialized at this point, so we need
            // to get the values and remove any sensitive ones
            const cleanUser = {...req.user};
            let userID = cleanUser.id;
            // find all cards that belong to this user and put them in array
            models.UserCards.findAll({raw: true, where: {UserId: userID}}).then(card => {
                let petCards = []
                for(let i = 0; i < 5; i++){
                    
                    card[i].attackNumbers = card[i].attackNumbers.split(",")
                    petCards.push(card[i]);
                }
                console.log(petCards)
                res.json({ username: cleanUser, cards: petCards });
            })   
    } else {
        return res.json({ username: null, cards: [] })
    }
})

module.exports = router;
