$("button").on("click", function () {
   
    var person = $(this).attr("data-person");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                    var gifDiv = $("<div class='item'>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var personImage = $("<img>");

                    personImage.attr("src", results[i].images.fixed_height.url);

                    gifDiv.append(p);
                    gifDiv.append(personImage);

                    $("#animalButtons").prepend(gifDiv);
                }
            }
        });
});