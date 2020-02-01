//bands in town key 0e0044c7d7a73f73811a78506b57e4ef

//this code handles BandsInTown API

//https://rest.bandsintown.com/artists/Dream%20Theater?app_id=0e0044c7d7a73f73811a78506b57e4ef


$("#class").on("click", function () {

    let bandName = $("#searchinput").val();


    getBandsInTownEvents(bandName);
});

<<<<<<< HEAD
function getBandsInTownEvents(bandName, date) {
    var app_id = "0e0044c7d7a73f73811a78506b57e4ef";

    var queryURL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=" + app_id;
=======
function getBandsInTownEvents(bandName, date){

    var app_id = "0e0044c7d7a73f73811a78506b57e4ef";
    var queryURL = "https://rest.bandsintown.com/artists/" + bandName+ "/events?app_id=" + app_id;
>>>>>>> 1dd38414ea0cd020679340df29f2f42f1cd236f5

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
<<<<<<< HEAD
    }).then(function (response) {
        console.log(response);
    });
=======
    }).then(function(response){

        for(let i=0;i < response.length;i++){
            
            console.log(response[i]);
        }
        
    });    
>>>>>>> 1dd38414ea0cd020679340df29f2f42f1cd236f5
}

