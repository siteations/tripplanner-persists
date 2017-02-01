var express = require('express');
var router = express.Router();
var Activity = require('../models/activity');
var Promise = require('bluebird');


router.get('/api/activites', function(req, res, next) {

  var findingActivities = Activity.findAll({
    include: [Place]
  }).then(function(activities) {

    console.log(activities);
    res.send('caught route');
    // res.render('index', {
    //   hotels: hotels,
    //   activities: activities,
    //   restaurants: restaurants
    // });
  })
  .catch(next);

});

module.exports = router;
