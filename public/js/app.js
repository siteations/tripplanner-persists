
//console.log('hotels exists: ', hotels);

function AttractionSelect(attractions) {
  return Object.values(attractions)
    .reduce(
      ($select, attraction) =>
        $select.append(`<option value="${attraction.id}">${attraction.name}</option>`),
      $('<select />')
    )
}

function PlusButton(onClick) {
  return $(`<button class="btn btn-primary btn-circle pull-right">+</button>`)
    .on('click', onClick);

}

function AttractionChooser(type, state) {   //component on the html

  //attractions.currentDay
  let {currentDay} = state;
  //console.log(currentDay);
  // let attractions={
  //       hotels,
  //       activities,
  //       restaurants,
  //     };
  // console.log(attractions);

  const $select = AttractionSelect(state[type]);
  return $(`<div/>`)
    .append(`<h4>${type}</h4>`)
    .append($select)
    .append(PlusButton(function() {
        $.ajax({
            method: 'PUT',
            url: `/api/days/${currentDay+1}`,
            data: {type:type , value:$select.val()}
        }).then(function(bob){

            appStore.dispatch(addAttractionToDay(type, $select.val()));  //the action,  the idea of the hotel



        });


    }))

}

function AttractionChoosers(state) {
  const $elem = $(`
    <div class="panel panel-default">
      <div class="panel-body" id="options-panel">

      </div>
    </div>
  `);

  $elem.find('#options-panel')
    .append(AttractionChooser('hotels', state)) //originally state.hotels
    .append(AttractionChooser('restaurants', state))
    .append(AttractionChooser('activities', state))

  return $elem;
}

function CurrentDayHeader(currentDay) {
  if(currentDay === null) { return; }
  return $(`
    <h3>
      <span id="day-title">
        <span>Day ${currentDay + 1}</span>
        <button class="btn btn-xs btn-danger remove btn-circle">x</button>
      </span>
    </h3>
  `)
}

function DayButton(i, currentDay) {
  return $(`
    <button class="btn btn-circle day-btn">${i+1}</button>
  `)
  .addClass(i === currentDay ? 'current-day': null)
  .on('click', function() {
      $.ajax({
          method: 'GET',
          url: `/api/days/${i+1}`
      }).then(function(bob){
          console.log(bob)
          appStore.dispatch(setCurrentDay(i));   //this starts at zero

      });
  })
}

function DayButtons(days, currentDay) {
  /**
   * <span><button></button><button></button></span>
   */
  return days.reduce(
    ($span, day, i) => $span.append(DayButton(i, currentDay)),
    $('<span />')
  );
}

function DayNavigation(days, currentDay) {
  return $(`<div class="day-buttons"/>`)
    .append(DayButtons(days, currentDay))
    .append(PlusButton(function() {

      $.ajax({
          method: 'POST',
          url: '/api/days/'
      }).then(function(bob){
          console.log(bob)
          appStore.dispatch(addDay());
      });

    }))
}

function AttractionListItem(attraction) {
  return $(`
    <div class="itinerary-item">
      <span class="title">${attraction.name}</span>
      <button class="btn btn-xs btn-danger remove btn-circle">x</button>
    </div>`);
}

function AttractionList(attractions) {
  return attractions
    .reduce(
      ($ul, attraction) => $ul.append(AttractionListItem(attraction)),
      $(`<ul class="list-group"/>`)
    )
}

function AttractionListContainer(type, state) {
  const day = state.days[state.currentDay];
  if(!day) { return; }

  const attractions = day[type]
    .map(id => state[type][id]);

  return $(`<div />`)
    .append(`<h4>${type}</h4>`)
    .append(AttractionList(attractions))

}

function DayPanel(state) {
  const $elem = $(`
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="day-buttons"></div>
      </div>
      <div class="panel-body" id="itinerary"></div>
    </div>
  `);

  $elem.find('.day-buttons')
    .append(DayNavigation(state.days, state.currentDay));

  $elem.find('#itinerary')
    .append(AttractionListContainer('hotels', state))
    .append(AttractionListContainer('restaurants', state))
    .append(AttractionListContainer('activities', state));

  return $elem;
}


function App(state) {
  return $(`<div class="col-xs-6 col-sm-12" />`)
    .append(AttractionChoosers(state))
    .append(CurrentDayHeader(state.currentDay))
    .append(DayPanel(state))
}

function render(state) {
  $('#control-panel')
    .html(App(state));
}

appStore.subscribe(render);
render(appStore.getState());
