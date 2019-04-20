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
        center: { lat: -34.397, lng: 150.644 },
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
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {

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


$(document).ready(function () {
    initMap();

});

// Search bar and Button
$(".btn1").mouseover(function () {
    $(".input").addClass("active").focus;
    $(this).addClass("animate");
    $(this).data("form", submit);
    $(".input").val("");
});

$(".btn1").click(function(){
    $(".hidden").show();
    $(".show").hide();
})

$("#searchForm").submit(function (e) {
    e.preventDefault();
});


$(".hidden").hide();
$('#searchBar').keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);

    if (keycode == '13') {
        $(".hidden").show();
        $(".show").hide();
    }

});



//--html scripts to use with Wiki api

//--<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
//--<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js"></script>
//--<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/themes/smoothness/jquery-ui.css" />
$(document).ready(function () {
    var articles = $('.articles');
    var input = $('#searchBar').val();
    var toSearch = '';
    var button = $('button');
    var searchUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + input;

    var ajaxArticleData = function () {
        $.ajax({
            url: searchUrl,
            method: 'GET'
        }).then(function (response) {
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
