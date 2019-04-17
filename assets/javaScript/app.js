var popularArr = [];
var currentDest = "HERE";

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAMFa984GQn-y7573j1GzE5cEhQif-JxRM",
    authDomain: "project1-1555166664256.firebaseapp.com",
    databaseURL: "https://project1-1555166664256.firebaseio.com",
    projectId: "project1-1555166664256",
    storageBucket: "",
    messagingSenderId: "223213904031"
};
firebase.initializeApp(config);

data = firebase.database();

var inputCity;
var inputState;
var inputCountry;
var inputLat;
var inputLong;

// Google Places API
$(function activatePlacesSearch(){
    var input = document.getElementById('searchBar');
    var autocomplete = new google.maps.places.Autocomplete(input);
});

function searchInput(event) {
    event.preventDefault();
    currentDest = $("#searchBar").val();
    $("#searchBar").text('');
    splitCurrentDest = currentDest.split(' ');
    console.log(splitCurrentDest);

    if (splitCurrentDest.length == 3) {
        inputCity = splitCurrentDest[0];
        inputState = splitCurrentDest[1];
        inputCountry = splitCurrentDest[2];
    } else if (splitCurrentDest.length == 2) {
        inputCity = splitCurrentDest[0];
        inputState = null;
        inputCountry = splitCurrentDest[1];
    } else if (splitCurrentDest.length == 4) {
        inputCity = splitCurrentDest[0] + " " + splitCurrentDest[1];
        inputState = splitCurrentDest[2];
        inputCountry = splitCurrentDest[3];
    } else if (splitCurrentDest.length == 5) {
       inputCity = splitCurrentDest[0] + " " + splitCurrentDest[1] + " " + splitCurrentDest[2];
       inputState = splitCurrentDest[3];
       inputCountry = splitCurrentDest[4];
    }
    newSearch = {
        city: inputCity,
        state: inputState,
        country: inputCountry,
        // latitude: inputLat,
        // longitude: inputLong
    }
  
    data.ref().push(newSearch);
    console.log("City: " + newSearch.city);
    console.log("State " + newSearch.state);
    console.log("country:" + newSearch.country);

    pushIntoPopularArray();
    console.log(popularArr);
};

$("#search").on("click", searchInput);



//push cities/states into popularArr array
function pushIntoPopularArray() {
 popularArr.push(inputCity + inputState + inputCountry);
}

    $(function activatePlacesSearch(){
        var input = document.getElementById('searchBar');
        var autocomplete = new google.maps.places.Autocomplete(input);
    });

//--html scripts to use with Wiki api

//--<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
//--<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js"></script>
//--<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/themes/smoothness/jquery-ui.css" />
$(document).ready(function () {
    var articles = $('.articles');
    var input = $('#input').val();
    var toSearch = '';
    var button = $('button');
    var searchUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + input;

    var ajaxArticleData = function () {
        $.ajax({
            url: searchUrl,
            method: 'GET'
        }).then(function(response) {
            var pageElement = $('<div>');
            
            if (response.thumbnail) pageElement.append($('<img>').attr('width', 150).attr('src', response.thumbnail.source));
            
            pageElement.append($('<h2>').append($('<a>').text(response.title)));

            pageElement.append($('<p>').text(response.extract));

            pageElement.append($('<hr>'));

            articles.append(pageElement);
            console.log(response.title);
        })
    }
    button.click(function () {
        ajaxArticleData();
        console.log(input);
    });
    
})
