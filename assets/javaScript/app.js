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

var mf = 1;
var m = 1;
var item;
var recentListsStart
var mostRecentIndex
// Google Places API
$(function activatePlacesSearch() {
    var input = $('#searchBar');
    var autocomplete = new google.maps.places.Autocomplete(input);
});

// function searchInput() {
$("#searchBar").keyup(function (e) {
    currentDest = $("#searchBar").val();

    if (e.which == 13) {


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
            dateAdded: firebase.database.ServerValue.TIMESTAMP,
            // latitude: inputLat,
            // longitude: inputLong
        }
//push to firebase
        data.ref().push(newSearch);
        // console.log("City: " + newSearch.city);
        // console.log("State " + newSearch.state);
        // console.log("country:" + newSearch.country);
        popularArr.push(newSearch.city);
        popularArr = [];

        //populate top searches array and html list
        data.ref().orderByChild("dateAdded").limitToLast(200).on("child_added", function (snapshot) {
            $(".top-item").remove();

            arrayCity = snapshot.val().city;
            arrayState = snapshot.val().state;
            arrayCountry = snapshot.val().country;
            if (arrayState == null) {
                popularArr.push(arrayCity + " " + arrayCountry);
            } else {
                popularArr.push(arrayCity + " " + arrayState + " " + arrayCountry);
            }
        
            var mostRecentIndex = popularArr.length;
            var recentListsStart = mostRecentIndex - 5;
            // var mostRecent = popularArr[mostRecentIndex];
            // var popularDest = $("<div>").addClass("top-item").attr("id", "city" + mostRecent).text(mostRecent);
            for (i = recentListsStart; i < mostRecentIndex; i++) {
                var popularDest = $("<div>").addClass("top-item").attr("id", "city" + popularArr[i]).text(popularArr[i]);
                $("#top-search").append(popularDest);
            }

        });
        
        for (var i = 0; i < popularArr.length; i++) {
            for (var i = 0; i < popularArr.length; i++) {
                for (var j = i; j < popularArr.length; j++) {
                    if (popularArr[i] == popularArr[j])
                    m++;
                    if (mf < m) {
                        mf = m;
                        item = popularArr[i];
                    }
                }
                m = 0;
            }
        }
        console.log(item + " " + mf);
        console.log(popularArr);
        
    }

    $("#searchBar").text('');

});



function recentSearchClick(){
    currentDest = $(this).text();
    console.log(currentDest);

}
$(document).on("click", ".top-item", recentSearchClick);
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
        fullscreenControl: false,
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
    $(function activatePlacesSearch(){
        var input = document.getElementById('searchBar');
        var autocomplete = new google.maps.places.Autocomplete(input);
    });
    $(function activatePlacesSearch(){
        var input = document.getElementById('searchBar2');
        var autocomplete = new google.maps.places.Autocomplete(input);
    });
// Original Search Bar
    $(".btn1").mouseover(function(){
        $(".input").addClass("active").focus;
        $(this).addClass("animate");
        $(".input").val();
        $("#button").hide();
    });

    $(".btn1").click(function(){
      $(".hidden").show();
      $(".show").hide();
  })

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

$(document).ready(function () {
    var articles = $('.articles');
    var input = $('#searchBar2').val();
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
