const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const Books = require("../models").Books;
const Loans = require("../models").Loans;
const Patrons = require("../models").Patrons;

// All books page
router.get('/', function(req, res, next) {
  Books.findAll({order: [["title", "DESC"]]}).then(function(books){
    res.render('all_books', {books: books, title: 'Books' });
  });
});


router.get('/new', function(req, res, next) {
  res.render('new_book', {title: "New Book"});
});

// Books overdue page
router.get('/overdue', function(req, res, next) {
  Loans.findAll({
    where: {
      return_by: {
        [Op.lte]:  new Date()
      },
      returned_on: null
    }, 
    order: [["book_id", "DESC"]],
    include: [
    {
        association: "books",
        attributes: ["title", "author", "genre", "first_published"]
    }
  ]}).then(function(loans){
    res.render('overdue_books', {loans: loans, title: "Overdue Books"});
  });
});

// Books checked out page
router.get('/checked', function(req, res, next) {
  Loans.findAll({
    where: {
      loaned_on: {
        [Op.ne]:  null
      },
      returned_on: null
    }, 
    order: [["book_id", "DESC"]],
    include: [
    {
        association: "books",
        attributes: ["title", "author", "genre", "first_published"]
    }
  ]}).then(function(loans){
    res.render('checked_books', {loans: loans, title: "Checked Out Books"});
  });
});

// Book details page
router.get("/details/:id", function(req, res, next){
  Books.findByPk(req.params.id).then(function(books){
    Loans.findAll({
      where: {
        book_id: books.id
      }, 
      order: [["book_id", "DESC"]],
      include: [
      {
          association: "books",
          attributes: ["title"]
      },
      {
        association: "patrons",
        attributes: ["first_name", "last_name"]
      }
    ]}).then(function(loans){
        res.render("book_detail", {books: books, loans: loans,  title: books.title});
    });
  });
});

// router.get('/details', function(req, res, next) {
//   res.render('book_detail', {title: "Book Details"});
// });

router.get('/return', function(req, res, next) {
  res.render('return_book', {title: "Return Book"});
});


module.exports = router;