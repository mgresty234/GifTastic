var animalButtons = $("#animalButtons");

$(document).ready(function () {

    var topics = ['cat', 'dog', 'monkey', 'parrot', 'rabbit', 'squirrel'];



    for (var i = 0; i < topics.length; i++) {
        makeTopicButton(topics[i]);
    }

});

function makeTopicButton(topic) {
    var topicButton = $('<button>');
    topicButton.addClass('topic-button');
    topicButton.attr('data-name', topic);
    topicButton.text(topic);

    animalButtons.append(topicButton);
}


$('#addAnimal').on('click', function () {
    event.preventDefault();
    var newTopic = $('#animal-input').val();
    makeTopicButton(newTopic);
});

$("#animalButtons").on("click", 'button', function () {

    var person = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {


            $("#animals").empty();

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                console.log(results[i]);

                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                    var gifDiv = $("<div class='item'>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var personImage = $("<img>");

                    personImage.attr("src", results[i].images.fixed_height.url);

                    gifDiv.append(p);
                    gifDiv.append(personImage);

                    $("#animals").append(gifDiv);
                }
            }
        });
});
