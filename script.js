//bands in town key 0e0044c7d7a73f73811a78506b57e4ef

//this code handles BandsInTown API

//https://rest.bandsintown.com/artists/Dream%20Theater?app_id=0e0044c7d7a73f73811a78506b57e4ef


$("#class").on("click", function(){

    let bandName = $("#searchinput").val();


    getBandsInTownEvents(bandName);
});

function getBandsInTownEvents(bandName, date){

    var app_id = "0e0044c7d7a73f73811a78506b57e4ef";
    var queryURL = "https://rest.bandsintown.com/artists/" + bandName+ "/events?app_id=" + app_id;

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

        for(let i=0;i < response.length;i++){

            let venueName = response[i].venue.name;
            let venueCity = response[i].venue.city;
            let offerTickets = response[i].offers[0].url;
            
            console.log({venueName, venueCity, offerTickets});
            displayEvent(venueName, venueCity, offerTickets);
           
        }
        
    });    
}

function displayEvent(venueName, venueCity, offerTickets){

    let displayDiv = $("<div>");
    let vName = $("<h1>").html(venueName);
    let vCity = $("<h1>").html(venueCity);
    let ticketLink = $("<a>").attr("href", offerTickets);
    ticketLink.html("Tickets");

    displayDiv.append(vName);
    displayDiv.append(vCity);
    displayDiv.append(ticketLink);

    $("#resultdiv").append(displayDiv);
}

