//bands in town key 0e0044c7d7a73f73811a78506b57e4ef

//this code handles BandsInTown API

//https://rest.bandsintown.com/artists/Dream%20Theater?app_id=0e0044c7d7a73f73811a78506b57e4ef

getLocation();

$(document).on("click", "#searchButton",function (e) {
  e.preventDefault();

  let bandName = $("#searchArtist").val();

  if(bandName == ""){
    $("#tabRow").empty();
    $("#tabRow").append($("<h5>").html("Please enter a Band Name!").css("color", "red"));
  }
  else{
    refreshTab();

    getBandsInTownEvents(bandName);
  }//end of else
});//end of click listener

async function getBandsInTownEvents(bandName) {

  var app_id = "0e0044c7d7a73f73811a78506b57e4ef";

  var queryURL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=" + app_id;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response){

    if(response.length > 0){
    
      let bandImage = response[0].artist.image_url;

      for (let i = 0; i < response.length; i++) {
  
        let venue = response[i].venue.name + ", " + response[i].venue.city;
        let rawDate = response[i].datetime;
        let date = rawDate.substring(0, 10);
        date = arrangeDate(date);
        let offerTickets = response[i].url;
  
        makeTabs(bandImage, venue, date, offerTickets);
      }

      getTicketMasterEvents(bandName, false, "", "", -1);
    }
    else{
      getTicketMasterEvents(bandName, false, "", "", -1);
    }

    }).fail(function(){
      console.log("error!");
      $("#tabRow").append($("<h6>").html("No events from Bands In Town").css("color", "red"));
      getTicketMasterEvents(bandName, false, "", "", -1);
    });
  }


//TicketMaster Key: KuVXm1LhnrpiuKMG26AxMNsWRbNXefMp

//Ticketmaster URL: https://app.ticketmaster.com/discovery/v2/events.json?apikey=  keyword=artistname


 function getTicketMasterEvents(bandName, getLocation, latlong, state, numberOfResults) { //number of results -1 is no limit


  var app_id = "KuVXm1LhnrpiuKMG26AxMNsWRbNXefMp";

  var queryURL = "";

  if (getLocation) {
    queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + app_id + "&latlong=" + latlong + "&stateCode=" + state + "&radius=10&classificationName=music";
  }
  else {
    queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + app_id + "&keyword=" + bandName;
  }

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    console.log(queryURL);

    if(response.page.totalElements > 0){ //if we got something

      console.log("got ticketmaster");
        var events = response._embedded.events;


        for (let i = 0; i < events.length; i++) {

          let forSideBarName = events[i].name;

          let bandImage = events[i].images[0].url;

          let venueName = events[i]._embedded.venues[0].name;
          let venueCity = events[i]._embedded.venues[0].city.name;

          let venue = venueName + ", " + venueCity;

          let date = events[i].dates.start.localDate;
          date = arrangeDate(date);

          let offerTickets = events[i].url;

          if (numberOfResults == -1) {
              makeTabs(bandImage, venue, date, offerTickets);
          }
          else if (numberOfResults > 0) {
              displaySideEvent(forSideBarName, date, offerTickets, venue);
              numberOfResults--;
          }
        }
    }
    else{

      if(numberOfResults == -1){
        $("#tabRow").append($("<h6>").html("No events from TicketMaster").css("color", "red"));
      }
      else{
        $(".sidePanel").append($("<h>").html("No events").css("color", "red"));
      }

    }
  });

}

function arrangeDate(date) {

  let splitDate = date.split("-");
  let newDate = splitDate[1] + "-" + splitDate[2] + "-" + splitDate[0];

  return newDate;
}

function displaySideEvent(bandName, date, offerTickets, venue) {

  let cardDiv = $("<div>").attr("class", "card");
  cardDiv.css({ "position": "relative", "width": "200px", "float": "left", "display": "block" });

  let cardTitle = $("<span>").attr("class", "card-title");
  $(cardTitle).attr("class", "sideCardText");
  cardTitle.html(bandName);
  cardDiv.append(cardTitle);

  let cardContent = $("<div>").attr("class", "card-content");
  cardDiv.append(cardContent);

  let dateHolder = $("<p>").html("Date: " + date + " at " + venue).attr("class", "dateColor");
  dateHolder.css({ "color": "#d83c0c", "font-size": "medium" })
  cardContent.append(dateHolder);

  let cardAction = $("<div>").attr("class", "card-action");
  cardAction.html($("<a>").attr("href", offerTickets).html("Tickets"));

  cardContent.append(cardAction);

  $("#localEvents").append(cardDiv);
}

function refreshTab(){

  $("#tabRow").empty();


  let newCol = $("<div>").attr("class", "col s12");
  newCol.appendTo($("#tabRow"));

  let tabs = $("<ul>").attr({"id": "dateTabs", "class": "tabs"});
  tabs.appendTo($("#tabRow"));

}

function makeTabs(bandImage, venue, date, offerTickets){

  createTab(bandImage, venue, date, offerTickets);

  $('.tabs').tabs(); //initializes tabs
  $('.tabs').tabs({ 'swipeable': true });

}

function createTab(bandImage, venue, date, offerTickets){

  
        //<li class="tab col s3">
        let currentTabs = $(".tab");

        let makeNewTab = false;

        if(currentTabs.length > 0){
          for(var i=0;i < currentTabs.length;i++){

            let tabDate = $(currentTabs[i])[0].innerText;

            if(date == tabDate){
              makeNewTab = false;
              break;
            }
            else{
              makeNewTab = true;
            } 
          }
        }
        else{
          makeNewTab = true;
        }

        if(makeNewTab){

          let newTab = $("<li>").attr("class", "tab"); //create new one
    
          let newLink = $("<a>").attr("href", "#"+date);
          newLink.appendTo(newTab);
          newLink.html(date);
    
          $("#dateTabs").append(newTab);

          let contentDiv = $("<div>").attr("class", "col s12");
          contentDiv.attr("id", date);
    
          contentDiv.append(makeEventCard(bandImage, venue, date, offerTickets));
    
          $("#tabRow").append(contentDiv);

        }
        else{
          console.log("add to existing div");
          $("#"+date).append(makeEventCard(bandImage, venue, date, offerTickets));
        }

}


function makeEventCard(bandImage, venue, date, offerTickets) { //builds a materialze card and displays content

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

  return cardDiv;
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
    // We are also calling/invoking the getTicketMasterEvents function to pass the location data for the sidebar
    .then(function (response) {

      console.log(response);
      getTicketMasterEvents("", true, response.latitude + "," + response.longitude, response.region_code, 5);
    });
}