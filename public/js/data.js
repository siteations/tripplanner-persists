
function reducer(state, action) {
  // WRONG strtegy
  // 1. change the state
  // 2. return the state

  // RIGHT way
  // 1. copy the old state
  // 2. change the copy
  // 3. return the copy
  const nextState = Object.assign({}, state);
  if(action.type === 'SET_CURRENT_DAY') {
    nextState.currentDay = action.currentDay;
  }

  else if(action.type === 'ADD_HOTEL') {
    nextState.hotels = Object.assign(nextState.hotels);
    nextState.hotels[action.hotel.id] = action.hotel;
  }

  else if(action.type === 'ADD_RESTAURANT') {
    nextState.restaurants = Object.assign(nextState.restaurants);
    nextState.restaurants[action.restaurant.id] = action.restaurant;
  }

  else if(action.type === 'ADD_ACTIVITY') {
    nextState.activities = Object.assign(nextState.activities);
    nextState.activities[action.activity.id] = action.activity;
  }

  else if(action.type === 'ADD_DAY') {
    nextState.days = nextState.days.concat([action.day]);
  }

  else if(action.type === 'ADD_ATTRACTION_TO_DAY') {
    nextState.days = nextState.days
      .map((day, i) => {
        if(i !== nextState.currentDay) {
          return day;
        }
        const nextCurrentDay = Object.assign({}, day);
        nextCurrentDay[action.attractionType] = nextCurrentDay[action.attractionType]
          .concat([action.attractionId]);

        return nextCurrentDay;
      })
  }



  return nextState;
}

const appStore = new Store({
  hotels: {},
  restaurants: {},
  activities: {},
  days: [],
  currentDay: null,
}, reducer);

function addDay() {
  return {
    type: 'ADD_DAY',
    day: {
      hotels: [],
      restaurants: [],
      activities: []
    }
  };
}

function addAttractionToDay(type, attractionId) {
  return {
    type: 'ADD_ATTRACTION_TO_DAY',
    attractionType: type,
    attractionId
  };
}

function setCurrentDay(i) {
  return {
    type: 'SET_CURRENT_DAY',
    currentDay: i
  };
}


var hotels =[];
var restaurants=[];
var activities=[];


var hotelsP = $.ajax({
    method: 'GET',
    url: '/api/hotels/'
    })

var restaurantsP = $.ajax({
    method: 'GET',
    url: '/api/restaurants/'
    });

var activitiesP = $.ajax({
    method: 'GET',
    url: '/api/activities/'
    });



Promise.all([hotelsP, restaurantsP, activitiesP]).then((result) => {

    console.log(result);

    hotels = result[0];
    restaurants = result[1];
    activities = result[2];

    hotels.forEach(hotel =>
      appStore.dispatch({
        type: 'ADD_HOTEL',
        hotel
      })
    );

    restaurants.forEach(restaurant =>
      appStore.dispatch({
        type: 'ADD_RESTAURANT',
        restaurant
      })
    );

    activities.forEach(activity =>
      appStore.dispatch({
        type: 'ADD_ACTIVITY',
        activity
      })
    );


    })
.catch(console.log);






// appStore.dispatch({
//   type: 'ADD_HOTEL',
//   hotel: {
//     id: 555,
//     name: 'some hotel'
//   }
// })
