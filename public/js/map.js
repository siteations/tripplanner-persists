$(function initializeMap (){

  var fullstackAcademy = new google.maps.LatLng(40.705086, -74.009151);

  var mapCanvas = document.getElementById('map-canvas');

  var currentMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });

  const markerPool = [];

  function drawMarker (coords) {
    var latLng = new google.maps.LatLng(coords[0], coords[1]);
    var marker = new google.maps.Marker({
      position: latLng
    });
    markerPool.push(marker);
    marker.setMap(currentMap);
  }


  function clearMap() {
    while(markerPool.length) {
      markerPool.shift().setMap(null);
    }
  }

  appStore.subscribe(state => {
    const day = state.days[state.currentDay];
    if(day) {
      clearMap();
      ['hotels', 'restaurants', 'activities']
        .forEach(type => {
          day[type]
            .map(id => {
              return state[type][id]
            })
            .forEach(attractionObj => {
              drawMarker(attractionObj.place.location)
            })
        })
    }
  })

});