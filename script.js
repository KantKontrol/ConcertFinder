//bands in town key 0e0044c7d7a73f73811a78506b57e4ef

//this code handles BandsInTown API

//https://rest.bandsintown.com/artists/Dream%20Theater?app_id=0e0044c7d7a73f73811a78506b57e4ef

getLocation();

$("#searchButton").on("click", function (e) {
  e.preventDefault();

  let bandName = $("#searchArtist").val();

  $("#resultDiv").empty();

  
  getBandsInTownEvents(bandName);
  //getTicketMasterEvents(bandName, false, "", "", -1);

  
  //displayData(dataBIT, dataTM);

});

async function getBandsInTownEvents(bandName, date) {

  var app_id = "0e0044c7d7a73f73811a78506b57e4ef";
  var queryURL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=" + app_id;

  let data = [];

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    let bandImage = response[0].artist.image_url;

    for (let i = 0; i < response.length; i++) {


      let venue = response[i].venue.name + ", " + response[i].venue.city;
      let rawDate = response[i].datetime;
      let date = rawDate.substring(0, 10);
      date = arrangeDate(date);
      let offerTickets = response[i].url;

      data.push({bandImage, venue, date, offerTickets});

      makeTabs(bandImage, venue, date, offerTickets);
    }

  });
}

//TicketMaster Key: KuVXm1LhnrpiuKMG26AxMNsWRbNXefMp

//Ticketmaster URL: https://app.ticketmaster.com/discovery/v2/events.json?apikey=  keyword=artistname


async function getTicketMasterEvents(bandName, getLocation, city, state, numberOfResults) { //number of results -1 is no limit


  var app_id = "KuVXm1LhnrpiuKMG26AxMNsWRbNXefMp";

  var queryURL = "";

  let data = [];

  if (getLocation) {
    queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + app_id + "&city=" + city + "&stateCode=" + state + "&radius=10&classificationName=music";
  }
  else {
    queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + app_id + "&keyword=" + bandName;
  }

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

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
        data.push({bandImage, venue, date, offerTickets});
        makeTabs(bandImage, venue, date, offerTickets);
      }
      else if (numberOfResults > 0) {
        displaySideEvent(forSideBarName, date, offerTickets, venue);
        numberOfResults--;
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
  cardDiv.css({ "margin": "10px", "width": "150px", "float": "right" });

  let cardTitle = $("<span>").attr("class", "card-title");
  cardTitle.css({ "white-space": "nowrap", "overflow": "hidden", "text-overflow": "ellipsis" });
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

function makeTabs(bandImage, venue, date, offerTickets){

  createTab(bandImage, venue, date, offerTickets);

  $('.tabs').tabs(); //initializes tabs
  

}

function createTab(bandImage, venue, date, offerTickets){

  
        //<li class="tab col s3">
        let currentTabs = $(".tab");

        let makeNewTab = false;

        if(currentTabs.length > 0){
          for(var i=0;i < currentTabs.length;i++){

            let testDate = $(currentTabs[i])[0].innerText;

            console.log({testDate, date});

            if(date != testDate){
              makeNewTab = true;
              console.log("make tab!");
            }
          }
        }
        else{
          makeNewTab = true;
        }

        if(makeNewTab){

          let newTab = $("<li>").attr("class", "tab"); //create new one
          //newTab.attr("id", date);
          //newTab.css("display", "block");
  
          //<a href="#test1">Test 1</a>
    
          let newLink = $("<a>").attr("href", "#"+date);
          newLink.appendTo(newTab);
          newLink.html(date);
    
          $("#dateTabs").append(newTab);

        }

  
        //below is div that holds card
  
        //<div id="test1" class="col s12">Test 1</div>
  
        let contentDiv = $("<div>").attr("class", "col s12");
        contentDiv.attr("id", date);
  
        contentDiv.append(makeEventCard(bandImage, venue, date, offerTickets));
  
        $("#tabRow").append(contentDiv);
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

/*function getDates(dataBIT, dataTM){

  let dates = [];

  for(let i=0;i < dataBIT.length;i++){

    let checkDate = dataBIT[i].date;
    console.log("added date");

    if(dates.includes(checkDate) == true){
      // if date exists dont do anything
      
    }
    else{//add date to array
      dates.push(checkDate);
      
    }
  }

  for(let i=0;i < dataTM.length;i++){
    let checkDate = dataTM[i].date;

    if(dates.includes(checkDate)){
      // if date exists dont do anything
    }
    else{//add date to array
      dates.push(checkDate);
    }
  }

  console.log(dates);

}*/

/*function makeTable(dates){

  

}

function displayData(dataBIT, dataTM){
 
  getDates(dataBIT, dataTM);

}*/

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
      getTicketMasterEvents("", true, response.city, response.region_code, 5);
      // Log the queryURL
      console.log(queryURL);

      // Log the resulting object
      console.log(response);
      console.log(response.city);
      console.log(response.zip_code);

    });
}