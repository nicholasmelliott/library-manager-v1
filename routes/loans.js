const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('all_loans', {title: "Loans"});
});

router.get('/new', function(req, res, next) {
  res.render('new_loan', {title: "New Loan"});
});

router.get('/overdue', function(req, res, next) {
  res.render('overdue_loans', {title: "Overdue Loans"});
});

router.get('/checked', function(req, res, next) {
  res.render('checked_loans', {title: "Checked Out Loans"});
});

module.exports = router;