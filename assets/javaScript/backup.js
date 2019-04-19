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

var data = firebase.database();

var inputCity;
var inputState;
var inputCountry;
var inputLat;
var inputLong;

// Google Places API
$(function activatePlacesSearch() {
    var input = document.getElementById('searchBar');
    var autocomplete = new google.maps.places.Autocomplete(input);
});

// function searchInput() {
    $("#submit").keyup(function() {
    currentDest = $("searchBar").val();
    $("searchBar").text('');
    splitCurrentDest = currentDest.split(' ');
    console.log(splitCurrentDest);

    //splits user input into strings for each word seperating city, state, and country
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

    //variable for pushing to firebase
    newSearch = {
        city: inputCity,
        state: inputState,
        country: inputCountry,
        // latitude: inputLat,
        // longitude: inputLong
    }

  //push to firebase
    data.ref().push(newSearch);
    console.log("City: " + newSearch.city);
    console.log("State " + newSearch.state);
    console.log("country:" + newSearch.country);
    popularArr.push(newSearch.city);
});

// $("#submit").keyup( "13", searchInput);


//populate top searches array and html list
data.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
    
    arrayCity = snapshot.val().city;
    arrayState = snapshot.val().state;
    arrayCountry = snapshot.val().country;
    
    if (arrayState == null) {
    popularArr.push(arrayCity + " " + arrayCountry);
    } else { 
        popularArr.push(arrayCity + " " + arrayState + " " + arrayCountry);
    }
  
    for (i = 0; i < 5; i++) {
        $("top-item").remove();
        var popularDest = $("<p>").addClass("top-item").text(popularArr[i]);
        $("#top-search").append(popularDest);
        popularArr = [];

    }

});

//Map API call

var map;
var service;
var infowindow;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8,
        zoomControl: true,
        scaleControl: true,
        fullscreenControl: true,
      });
      

        // Create the search box and link it to the UI element.
        var input = document.getElementById('searchBar');
        var searchBox = new google.maps.places.SearchBox(input);
       map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };


            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
      }


$(document).ready(function() {
    initMap();
    
});
    // $(function activatePlacesSearch(){
    //     var input = document.getElementById('searchBar');
    //     var autocomplete = new google.maps.places.Autocomplete(input);
    // });
    // $(function activatePlacesSearch(){
    //     var input = document.getElementById('searchBar2');
    //     var autocomplete = new google.maps.places.Autocomplete(input);
    // });
// Original Search Bar
    $(".btn1").click(function(){
        $(".input").addClass("active").focus;
        $(this).addClass("animate");
        $(".input").val("");

    });

// Hiding and showing elements on search
$(".hidden").hide();
$('#searchBar').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    
    if(keycode == '13'){
        $(".hidden").show();
        $(".show").hide();
    }
    
});

$("#searchForm").submit(function(e) {
    e.preventDefault();
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
