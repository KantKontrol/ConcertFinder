//bands in town key 0e0044c7d7a73f73811a78506b57e4ef

//this code handles BandsInTown API

//https://rest.bandsintown.com/artists/Dream%20Theater?app_id=0e0044c7d7a73f73811a78506b57e4ef


$("#searchButton").on("click", function(){

    let bandName = $("#searchArtist").val();


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

        console.log(response);

        let bandImage = response[0].artist.image_url;

        for(let i=0;i < response.length;i++){

            let venue = response[i].venue.name + ", " + response[i].venue.city;
            let offerTickets = response[i].offers[0].url;
            
            
            console.log({venue, offerTickets, bandImage});
            displayEvent(bandImage, venue, offerTickets);
           
        }
        
    });    
}

function displayEvent(bandImage, venue, offerTickets){ //builds a materialze card and displays content

    let colDiv = $("<div>").attr("class", "col s12 m5");

    let cardDiv = $("<div>").attr("class", "card");
    cardDiv.css({"margin":"10px", "width":"max-content", "float":"left"});
    colDiv.append(cardDiv);

    let cardImg = $("<div>").attr("class", "card-image");
    cardDiv.append(cardImg);

    let img = $("<img>").attr("src", bandImage);
    img.css({"width":"300px", "height":"200px"});
    cardImg.append(img);

    let cardTitle = $("<span>").attr("class", "card-title");
    cardTitle.html(venue);
    cardImg.append(cardTitle);

    let cardContent = $("<div>").attr("class", "card-content");
    cardDiv.append(cardContent);

    let cardAction = $("<div>").attr("class", "card-action");
    cardAction.html($("<a>").attr("href", offerTickets).html("Tickets"));
    cardDiv.append(cardAction);

    $("#resultDiv").append(cardDiv);
}

/*<div class="col s12 m7">
<div class="card">
  <div class="card-image">
    <img src="images/sample-1.jpg">
    <span class="card-title">Card Title</span>
  </div>
  <div class="card-content">
    <p>I am a very simple card. I am good at containing small bits of information.
    I am convenient because I require little markup to use effectively.</p>
  </div>
  <div class="card-action">
    <a href="#">This is a link</a>
  </div>
</div>
</div>*/

