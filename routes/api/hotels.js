var express = require('express');
var router = express.Router();
var Hotel = require('../../models/hotel');


router.get('/', function(req, res, next) {
  var findingHotel = Hotel.findAll({
      }).then(function(Hotel) {
        res.send(Hotel);
        })
        .catch(next);
  });

router.get('/:id', function(req, res, next) {
  var findingHotel = Hotel.findOne({
          where: {
            id: req.params.id,
          }
      }).then(function(Hotel) {
        res.send(Hotel);
        })
        .catch(next);
  });


module.exports = router;
