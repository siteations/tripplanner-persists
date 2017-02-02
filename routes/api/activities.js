var express = require('express');
var router = express.Router();
var Activity = require('../../models/activity');

router.get('/', function(req, res, next) {
    // console.log("-_".repeat(40), Activity)
    Activity.findAll({
      }).then(function(Activity) {
        res.send(Activity);
        })
        .catch(next);
  });

router.get('/:id', function(req, res, next) {
  Activity.findOne({
          where: {
            id: req.params.id,
          }
      }).then(function(Activity) {
        res.send(Activity);
        })
        .catch(next);
  });

module.exports = router;
