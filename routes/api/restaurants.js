var express = require('express');
var router = express.Router();
var Restaurant = require('../../models/restaurant');
var Place = require('../../models/place');



router.get('/', function(req, res, next) {
    console.log('in here ');
  var findingRestaurant = Restaurant.findAll({
        include: [Place]
    })
    .then(function(restaurants) {
        res.send(restaurants);
    })
    .catch(next);
});

router.get('/:id', function(req, res, next) {
  var findingRestaurant = Restaurant.findOne({

          where: {
            id: req.params.id,
          }
      }).then(function(Restaurant) {
        res.send(Restaurant);
        })
        .catch(next);
  });


module.exports = router;
