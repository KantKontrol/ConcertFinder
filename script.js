//bands in town key 0e0044c7d7a73f73811a78506b57e4ef

//this code handles BandsInTown API

//https://rest.bandsintown.com/artists/Dream%20Theater?app_id=0e0044c7d7a73f73811a78506b57e4ef


getTicketMasterEvents("", true, "clifton", "NJ", 5);

$("#searchButton").on("click", function (e) {
  e.preventDefault();

  let bandName = $("#searchArtist").val();

    $("#resultDiv").empty();

    getLocation();
  //  getBandsInTownEvents(bandName);
    getTicketMasterEvents(bandName, false, "", "", -1);
});

function getBandsInTownEvents(bandName, date) {

  var app_id = "0e0044c7d7a73f73811a78506b57e4ef";
  var queryURL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=" + app_id;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    let bandImage = response[0].artist.image_url;

    for (let i = 0; i < response.length; i++) {


            let venue = response[i].venue.name + ", " + response[i].venue.city;
            let rawDate = response[i].datetime;
            let date = rawDate.substring(0,10);
            date = arrangeDate(date);
            let offerTickets = response[i].url;

            displayEvent(bandImage, venue, date, offerTickets);
        }
        
    });    
}

//TicketMaster Key: KuVXm1LhnrpiuKMG26AxMNsWRbNXefMp

//Ticketmaster URL: https://app.ticketmaster.com/discovery/v2/events.json?apikey=  keyword=artistname

function getTicketMasterEvents(bandName, getLocation, city, state, numberOfResults){ //number of results -1 is no limit

  var app_id = "KuVXm1LhnrpiuKMG26AxMNsWRbNXefMp";

  var queryURL = "";

  if(getLocation){
    queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + app_id + "&city=" + city + "&stateCode=" + state + "&radius=10&classificationName=music";
  }
  else{
    queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + app_id + "&keyword=" + bandName;
  }

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){

    console.log(response);

    var events = response._embedded.events;

  
    for(let i=0;i < events.length;i++){

        let forSideBarName = events[i].name;

        let bandImage = events[i].images[0].url;

        let venueName = events[i]._embedded.venues[0].name;
        let venueCity = events[i]._embedded.venues[0].city.name;

        let venue = venueName + ", " + venueCity;
        
        let date = events[i].dates.start.localDate;
        date = arrangeDate(date);

        let offerTickets = events[i].url;

        if(numberOfResults == -1){
          displayEvent(bandImage, venue, date, offerTickets);
        }
        else if(numberOfResults > 0){
          displaySideEvent(forSideBarName, date, offerTickets);
          numberOfResults--;
        }
          
    }

  });
}

function arrangeDate(date){

  let splitDate = date.split("-");
  let newDate = splitDate[1] + "-" + splitDate[2] + "-" + splitDate[0];

  return newDate;
}

function displaySideEvent(bandName, date, offerTickets){

  let cardDiv = $("<div>").attr("class", "card");

  let cardTitle = $("<span>").attr("class", "card-title");
  cardTitle.html(bandName);
  cardDiv.append(cardTitle);

  let cardContent = $("<div>").attr("class", "card-content");
  cardDiv.append(cardContent);

  let dateHolder = $("<p>").html("Date: " + date).attr("class", "dateColor");
  cardContent.append(dateHolder);

  let cardAction = $("<div>").attr("class", "card-action");
  cardAction.html($("<a>").attr("href", offerTickets).html("Tickets"));

  cardContent.append(cardAction);


  $("#localEvents").append(cardDiv);
}


function displayEvent(bandImage, venue, date, offerTickets) { //builds a materialze card and displays content

  let cardDiv = $("<div>").attr("class", "card");
  cardDiv.css({ "margin": "10px", "width": "max-content", "float": "left" });

  let cardImg = $("<div>").attr("class", "card-image");
  cardDiv.append(cardImg);

  let img = $("<img>").attr("src", bandImage);
  img.css({ "width": "300px", "height": "200px" });
  cardImg.append(img);

  let cardTitle = $("<span>").attr("class", "card-title");
  cardTitle.html(venue);
  cardImg.append(cardTitle);

  let cardContent = $("<div>").attr("class", "card-content");
  let dateHolder = $("<p>").html("Date: " + date).attr("class", "dateColor");
  cardContent.append(dateHolder);
  cardDiv.append(cardContent);

  let cardAction = $("<div>").attr("class", "card-action");
  cardAction.html($("<a>").attr("href", offerTickets).html("Tickets"));
  cardDiv.append(cardAction);

  $("#resultDiv").append(cardDiv);
}

//=======================================================
// Here we are building the URL we need to query the database

function getLocation() {
  var queryURL = "https://freegeoip.app/json/";

  // Here we run our AJAX call to the GEO API
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {

      // Log the queryURL
      console.log(queryURL);

      // Log the resulting object
      console.log(response);
      console.log(response.city);
      console.log(response.zip_code);
      

    });
}
