const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const books = require('../models/books');
const Books = require("../models").Books;
const Loans = require("../models").Loans;
const Patrons = require("../models").Patrons;

const d = new Date()
const ye = d.getFullYear();
const mo = d.getMonth() + 1;
const da = d.getDate();
const dt = `${ye}-${mo}-${da}`;

// All books page
router.get('/', function(req, res, next) {
  Books.findAll({order: [["title", "DESC"]]}).then(function(books){
    res.render('all_books', {books: books, title: 'Books' });
  });
});

//new book page
router.get('/new', function(req, res, next) {
  res.render('new_book', {books: Books.build(), title: "New Book"});
});

//create new book
router.post('/new', function(req, res, next) {
  const bodyProp = req.body;
  Books.create(req.body).then(function(books) {
    res.redirect("/books");
  }).catch(function(err){
    res.render('new_book', {bodyProp: bodyProp, err: err, title: "New Book"});
    console.log(err);
  });
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

//Update book
router.put('/details/:id', function(req, res, next){
  const bodyProp = req.body;
  console.log('REQ PARAMS ID: ' + req.body.id);
  Books.findByPk(req.params.id).then(function(books) {
    return books.update(req.body);
  }).then(function(books){
    res.redirect("/books");    
  }).catch(function(err){
    console.log(err);
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
          res.render('book_detail',{bodyProp: bodyProp, loans: loans, books: books, err: err});
        });
    });
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



// Return book page
router.get('/return/:id', function(req, res, next) {
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
      res.render('return_book', {date: dt, loans: loans, title: "Return Book"});
    });
  });
});

//Return book
router.put('/return/:id', function(req, res, next){
  Loans.findByPk(req.params.id).then(function(loans) {
    return loans.update(req.body);
  }).then(function(loans){
    res.redirect("/loans");    
  });
});


module.exports = router;