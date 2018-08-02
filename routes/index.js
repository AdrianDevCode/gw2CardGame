const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/cardsID', function(req, res, next) {
  let cardsID = req.data;
});


module.exports = router;
