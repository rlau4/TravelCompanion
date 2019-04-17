//--html scripts to use with api

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