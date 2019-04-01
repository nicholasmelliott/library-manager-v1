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

router.get('/details', function(req, res, next) {
  res.render('book_detail', {title: "Book Details"});
});

router.get('/return', function(req, res, next) {
  res.render('return_book', {title: "Return Book"});
});


module.exports = router;