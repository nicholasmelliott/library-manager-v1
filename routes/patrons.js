const express = require('express');
const router = express.Router();
const Patrons = require("../models").Patrons;
const Loans = require("../models").Loans;


// All Patrons page
router.get('/', function(req, res, next) {
  Patrons.findAll({order: [["last_name", "DESC"]]}).then(function(patrons){
    res.render('all_patrons', {patrons: patrons, title: 'Patrons' });
  });
});

// New Patron page
router.get('/new', function(req, res, next) {
  res.render('new_patron', {patrons: Patrons.build(), title: "New Patron"});
});

// Create new patron
router.post('/new', function(req, res, next){
  const bodyProp = req.body;
  Patrons.create(req.body).then(function(patrons) {
    res.redirect("/patrons");
  }).catch(function(err){
    res.render('new_patron', {bodyProp: bodyProp, err: err, title: "New Patron"});
  });
});

// Update Patron
router.put('/details/:id', function(req, res, next){
  const bodyProp = req.body;
  Patrons.findByPk(req.params.id).then(function(patrons) {
    return patrons.update(req.body);
  }).then(function(patrons){
    res.redirect("/patrons");    
  }).catch(function(err){
    console.log(err);
    Patrons.findByPk(req.params.id).then(function(patrons){
      Loans.findAll({
        where: {
          patron_id: patrons.id
        }, 
        order: [["patron_id", "DESC"]],
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
          res.render('patron_detail',{bodyProp: bodyProp, loans: loans, patrons: patrons, err: err});
        });
    });
  });
});

// Patron Details page
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