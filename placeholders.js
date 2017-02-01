var hotels =[];
var restaurants=[];
var activities=[];


var hotelsP = $.ajax({
    method: 'GET',
    url: '/api/hotels'
    })

var restaurantsP = $.ajax({
    method: 'GET',
    url: '/api/restaurants'
    });

var activitiesP = $.ajax({
    method: 'GET',
    url: '/api/restaurants'
    });



Promise.all([hotelsP, restaurantsP, activitiesP]).then((result) => {

    console.log(result);

    hotels = result[0];
    restaurants = result[1];
    activities = result[2];



    }).catch(console.log);
