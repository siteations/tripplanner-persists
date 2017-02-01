var express = require('express');
var router = express.Router();
var Hotel = require('../models/hotel');
var Restaurant = require('../models/restaurant');
var Activity = require('../models/activity');
var Place = require('../models/place');
var Promise = require('bluebird');



router.get('/api/hotels', function(req, res, next) {

    var findingHotels = Hotel.findAll({
        include: [Place]
      }).then(function(hotels) {

        res.send(hotels);

        })
        .catch(next);
})


router.get('/api/restaurants', function(req, res, next) {

    var findingRestaurants = Restaurant.findAll({
        include: [Place]
      }).then(function(restaurants) {

        res.json(restaurants);


        })
        .catch(next);

})



router.get('/api/activities', function(req, res, next) {

  var findingActivities = Activity.findAll({
        include: [Place]
      }).then(function(activities) {

        res.json(activities);
        })
        .catch(next);

});



router.get('/api/places', function(req, res, next) {

  var findingPlaces = Place.findAll({
      }).then(function(places) {

        res.send(places);
        })
        .catch(next);
  });


router.get('/api/days', function(req, res, next) {

  var findingDay = Day.findAll({
      }).then(function(days) {

        res.send(day);
        })
        .catch(next);
  });


router.get('/api/days/:id', function(req, res, next) {

  var findingDay = Day.findOne({
          where: {
            id: req.params.id,
          }

      }).then(function(day) {

        res.send(day);
        })
        .catch(next);
  });


router.post('/api/days/:id', function(req, res, next) {

        Day.create({
            number: req.params.id,
          }).then(function(day) {

        res.send(day);
        })
        .catch(next);
  });


router.put('/api/days/:id', function(req, res, next) {

        Day.create({
            number: req.params.id,
          })
        .then(function(day) {

        res.send(day);
        })
        .catch(next);
  });




router.get('/', (req,res,next)=>{

  res.render('index');

})







  // var findingHotels = Hotel.findAll({
  //   include: [Place]
  // });

  // var findingActivities = Activity.findAll({
  //   include: [Place]
  // });

  // var findingRestaurants = Restaurant.findAll({
  //   include: [Place]
  // });

  // Promise.all([
  //   findingHotels,
  //   findingActivities,
  //   findingRestaurants
  // ])
  // .spread(function(hotels, activities, restaurants) {
  //   res.render('index', {
  //     hotels: hotels,
  //     activities: activities,
  //     restaurants: restaurants
  //   });
  // })
  // .catch(next);


module.exports = router;
