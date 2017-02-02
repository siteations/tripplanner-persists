var Sequelize = require('sequelize');
var db = require('./_db');
var Place = require('./place');
var Hotel = require('./hotel');
var Restaurant = require('./restaurant');
var Activity = require('./activity');

var Day = db.define('day', {
  number: {type:Sequelize.INTEGER},
}, {
    hooks: {
        beforeCreate: function(day){
        var dayID = day.getDataValue('id');
        day.setDataValue('number', dayID);
        }
    }
});


Day.belongsTo(Hotel, {as: 'day_hotel'});
Day.belongsToMany(Restaurant, {through: 'day_restaurant'});
Day.belongsToMany(Activity, {through: 'day_activity'});

Restaurant.belongsToMany(Day, {through: 'restaurant_day'});
Activity.belongsToMany(Day, {through: 'activity_day'});


module.exports = Day;
