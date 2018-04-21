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

                    var gifDiv = $("<div class='gif'>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var personImage = $("<img>");

                    personImage.attr('data-state', 'still');
                    personImage.attr('data-animate', results[i].images.fixed_height.url);
                    personImage.attr('data-still', results[i].images.fixed_height_still.url);

                    personImage.attr("src", results[i].images.fixed_height_still.url);

                    personImage.click(gifState)

                    gifDiv.append(p);
                    gifDiv.append(personImage);

                    $("#animals").append(gifDiv);

                        function gifState() {

                        var state = $(this).attr("data-state");
                        console.log(this);
                        if (state === "still") {
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        } else {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }
                    };
                }
            }
        });
});


