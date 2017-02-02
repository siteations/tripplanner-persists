var express = require('express');
var router = express.Router();
var Day = require('../../models/day');


router.get('/', function(req, res, next) {
  var findingDay = Day.findAll({
      }).then(function(days) {
        res.send(day);
        })
        .catch(next);
  });

router.get('/:id', function(req, res, next) {
  var findingDay = Day.findOne({
          where: {
            id: req.params.id,
          }
      }).then(function(day) {
        res.send(day);
        })
        .catch(next);
  });

router.post('/:id', function(req, res, next) {
        Day.create({
            number: req.params.id,
          }).then(function(day) {
          res.send(day);
        })
        .catch(next);
  });

router.put('/:id', function(req, res, next) {

        Day.update({
            where: { number: req.params.id }
            // need to add in more logic?
        }).then(function(day) {
        res.send(day);
        })
        .catch(next);
  });


  router.delete('/:id', function(req, res, next) {
          Day.destroy({
              where: { number: req.params.id,}
          })
          .then(function(day) {
              res.json({message:"deleted"});
          })
          .catch(next);
    });

module.exports = router;
