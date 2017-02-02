var express = require('express');
var router = express.Router();
var Place = require('../../models/place');

router.get('/', function(req, res, next) {
  var findingPlaces = Place.findAll({
    }).then(function(Place){
        res.send(Place);
        })
        .catch(next);
  });

router.get('/:id', function(req, res, next) {
  var findingPlace = Place.findOne({
          where: {
            id: req.params.id,
          }
      }).then(function(Place) {
        res.send(Place);
        })
        .catch(next);
  });


module.exports = router;
