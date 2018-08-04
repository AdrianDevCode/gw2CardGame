var express = require('express');
var router = express.Router();
const ensureAuthenticated = require('../auth').ensureAuthenticated;
const models = require('../models');

router.all('*', ensureAuthenticated);

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.findById(req.user)
  .then((user) => {
    res.send(user);
  })
});

module.exports = router;
