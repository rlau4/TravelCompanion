// Google Places API
$(function activatePlacesSearch() {
    var input = document.getElementById('searchBar');
    var autocomplete = new google.maps.places.Autocomplete(input);
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
      var geocoder = new google.maps.Geocoder();

      document.getElementById('submit').addEventListener('click', function(){ 
        geocodeAddress(geocoder, map);
      });
};


function mapSearch(){
    new google.maps.places.Autocomplete(
        (document.getElementById('searchBar')),{
            types: ['geocode']
        }
    );
};

$(document).ready(function() {
    initMap();
    mapSearch();
});
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
