const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('all_books', {title: "Books"});
});

router.get('/new', function(req, res, next) {
  res.render('new_book', {title: "New Book"});
});

router.get('/overdue', function(req, res, next) {
  res.render('overdue_books', {title: "Overdue Books"});
});

router.get('/checked', function(req, res, next) {
  res.render('checked_books', {title: "Checked Out Books"});
});


module.exports = router;