var express = require('express');
var route = express.Router();
// var Hotel = require('../models/hotel');
// var Restaurant = require('../models/restaurant');
// var Activity = require('../models/activity');
// var Place = require('../models/place');
// var Promise = require('bluebird');
// var Day = require('../models/day');

var Hotel = require('./api/hotels.js');
var Restaurant = require('./api/restaurants.js');
var Activity = require('./api/activities.js');
var Place = require('./api/places.js');
var Day = require('./api/days.js');

//app.use(require('./routes'));

route.use((req, res, next) => {
        console.log('getting here with ', req.method, req.path )
        next();
})
route.use('/api/hotels', Hotel);
route.use('/api/restaurants', Restaurant);
route.use('/api/activities', Activity);
route.use('/api/places', Place);
route.use('/api/days', Day);



route.get('/', (req,res,next)=>{
  res.render('index');
})


module.exports = route;
