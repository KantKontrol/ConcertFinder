//bands in town key 0e0044c7d7a73f73811a78506b57e4ef

//this code handles BandsInTown API

//https://rest.bandsintown.com/artists/Dream%20Theater?app_id=0e0044c7d7a73f73811a78506b57e4ef


$("#class").on("click", function () {

    let bandName = $("#searchinput").val();


    getBandsInTownEvents(bandName);
});

function getBandsInTownEvents(bandName, date) {
    var app_id = "0e0044c7d7a73f73811a78506b57e4ef";

    var queryURL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=" + app_id;

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
    });
}

