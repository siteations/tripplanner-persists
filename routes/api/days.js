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

router.post('/', function(req, res, next) {
        Day.create({})
        .then(function(day) {
          res.send(day);
        })
        .catch(next);
  });

router.put('/:id', function(req, res, next) {
        console.log("this should be our body: ", req.body);

        Day.findOne({
            where: { id: req.params.id }
            // need to add in more logic?
        }).then(function(dayEntry) {

            // return dayEntry.update(req.body)


            //   params.type: 'value', description: 'baaaaaar'}, {fields: ['title']}).then(function() {

            // })


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
