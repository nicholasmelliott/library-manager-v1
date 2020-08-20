const express = require('express');
const books = require('../models/books');
const router = express.Router();
const { Op } = require("sequelize");
const Loans = require("../models").Loans;
const Books = require("../models").Books;

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


router.get('/new', function(req, res, next) {
  res.render('new_loan', {title: "New Loan"});
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