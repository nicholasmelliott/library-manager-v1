const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
   res.render('home', {title: "Library Manager"});
});

router.use('/books', require('./books.js'));
router.use('/patrons', require('./patrons.js'));
router.use('/loans', require('./loans.js'));

module.exports = router;