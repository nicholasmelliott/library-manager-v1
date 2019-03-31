const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('all_patrons', {title: "Patrons"});
});

router.get('/new', function(req, res, next) {
  res.render('new_patron', {title: "New Patron"});
});

module.exports = router;