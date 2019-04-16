// Google Places API
    $(function activatePlacesSearch(){
        var input = document.getElementById('searchBar');
        var autocomplete = new google.maps.places.Autocomplete(input);
    });
    $(function activatePlacesSearch(){
        var input = document.getElementById('searchBar2');
        var autocomplete = new google.maps.places.Autocomplete(input);
    });
// Original Search Bar
    $(".btn1").click(function(){
        $(".input").toggleClass("active").focus;
        $(this).toggleClass("animate");
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
