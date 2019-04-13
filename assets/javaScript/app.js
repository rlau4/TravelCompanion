var recentArr = [];
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


data.ref() {

}
// Google Places API
$(function activatePlacesSearch(){
    var input = document.getElementById('searchBar');
    var autocomplete = new google.maps.places.Autocomplete(input);
});

// function searchInput() {
$("#search").on("click", function() {
    currentDest = $("#searchBar").val();
});
// };
