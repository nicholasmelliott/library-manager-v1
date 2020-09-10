const express = require('express');
const router = express.Router();
const Patrons = require("../models").Patrons;
const Loans = require("../models").Loans;

// router.get('/', function(req, res, next) {
//   res.render('all_patrons', {title: "Patrons"});
// });

router.get('/', function(req, res, next) {
  Patrons.findAll({order: [["last_name", "DESC"]]}).then(function(patrons){
    res.render('all_patrons', {patrons: patrons, title: 'Patrons' });
  });
});

router.get('/new', function(req, res, next) {
  res.render('new_patron', {patrons: Patrons.build(), title: "New Patron"});
});

router.post('/new', function(req, res, next){
  const bodyProp = req.body;
  Patrons.create(req.body).then(function(patrons) {
    res.redirect("/patrons");
  }).catch(function(err){
    res.render('new_patron', {bodyProp: bodyProp, err: err, title: "New Patron"});
  });
});

router.get("/details/:id", function(req, res, next){
  Patrons.findByPk(req.params.id).then(function(patrons){
    Loans.findAll({
      where: {
        patron_id: patrons.id
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
        res.render("patron_detail", {patrons: patrons, loans: loans});
    });
  });
});

// router.get('/details', function(req, res, next) {
//   res.render('patron_detail', {title: "Patron's Details"});
// });

module.exports = router;