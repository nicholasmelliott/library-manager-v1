const express = require('express');
const books = require('../models/books');
const router = express.Router();
const { Op } = require("sequelize");
const Loans = require("../models").Loans;
const Books = require("../models").Books;
const Patrons = require("../models").Patrons;
const dt = require("../time");

// All loans page
router.get('/', function(req, res, next) {
  Loans.findAll({order: [["book_id", "DESC"]], include: [
    {
        association: "books",
        attributes: ["title"]
    },
    {
      association: "patrons",
      attributes: ["first_name", "last_name"]
  }
  ]}).then(function(loans){
    res.render('all_loans', {loans: loans, title: 'Loans' });
  });
});

// New Loan page
router.get('/new', function(req, res, next) {
  Books.findAll({order: [["title", "DESC"]]}).then(function(books){
    Patrons.findAll({order: [["last_name", "DESC"]]}).then(function(patrons){
      res.render('new_loan', {loans: Loans.build(), date: dt, books: books, patrons: patrons, title: 'New Loan' });
    });
  });
});

// Create new loan
router.post('/new', function(req, res, next) {
  const bodyProp = req.body;
  console.log(req.body);
  Loans.create(req.body).then(function(loans) {
    res.redirect("/loans");
  }).catch(function(err){
    console.log("BOOK ID " + bodyProp.book_id);
    Books.findAll({order: [["title", "DESC"]]}).then(function(books){
      Patrons.findAll({order: [["last_name", "DESC"]]}).then(function(patrons){
        res.render('new_loan', {bodyProp: bodyProp, books: books, patrons: patrons, date: dt, err: err, title: "New Loan"});
      });
    });
    console.log(err);
  });
});

// Loans overdue page
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
        attributes: ["title"]
      },
      {
        association: "patrons",
        attributes: ["first_name", "last_name"]
      }
  ]}).then(function(loans){
    res.render('overdue_loans', {loans: loans, title: "Overdue Loans"});
  });
});

// Loans checked out page
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
      attributes: ["title"]
    },
    {
      association: "patrons",
      attributes: ["first_name", "last_name"]
    }
  ]}).then(function(loans){
    res.render('checked_loans', {loans: loans, title: "Checked Out Loans"});
  });
});

module.exports = router;