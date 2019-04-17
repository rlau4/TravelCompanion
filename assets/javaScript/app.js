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