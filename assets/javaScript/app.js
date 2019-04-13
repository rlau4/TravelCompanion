var popularArr = [];
var currentDest = "HERE";

// Google Places API
    $(function activatePlacesSearch(){
        var input = document.getElementById('search-bar');
        var autocomplete = new google.maps.places.Autocomplete(input);
    });

// function searchInput() {
    $("#search").on("click", function() {
        currentDest = $("#search-bar").val();
    });
// };