
$(document).ready(function () {

    // initial choices for gifs
    const topics = ["JoJo", "My Hero Academia", "Dr Stone", "Naruto", "Demon Slayer", "Samurai Champloo", "Cowboy Bebop","Fooly Cooly", "Pokemon", "I'm a spider now, so what?", "Black Clover", "Naruto", "Radiant", "Sword Art Online"]

    // ajax function to get stuff
    function displayInfo() {
        $("#characters").empty();
        var topic = $(this).attr("data-name");
        var queryURL = `https://api.giphy.com/v1/gifs/search?q=${topic}&api_key=Bbxmt6xBVvmP9bqdHENileHHwSLJvr2K`;

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                console.log(response.data.length)
                if (response.pagination.total_count == 0) {
                    alert(`No gifs for ${topic} sorry.`);
                    var itemindex = topics.indexOf(topic);
                    if (itemindex > -1) {
                        topics.splice(itemindex, 1);
                        buttonMaker();
                    };
                }
                for (let i = 0; i < response.data.length; i++) {
                    var newgifdiv = $("<div id='animeButton'>");
                    var rating = $("<p>").text("Rating: " + response.data[i].rating);
                    var url = response.data[i].images.fixed_height_still.url;
                    var gif = $("<img>");
                    gif.attr("src", url);
                    gif.attr("data-still", response.data[i].images.fixed_height_still.url);
                    gif.attr("data-animate", response.data[i].images.fixed_height.url);
                    gif.attr("data-state", "still");
                    gif.addClass("animate-gif");
                    newgifdiv.append(rating);
                    newgifdiv.append(gif);
                    $("#newimages").prepend(newgifdiv);
                    console.log("dasdf")
                }
            });
    }
    buttonMaker();
    $(document).on("click", ".topic", displayInfo);
    $(document).on("click", ".animate-gif", playGif);
    $(document).on("dblclick", ".topic", removeButton);
    // all the info being grabbed from the call ealier to be put on the gifs
    for (let i = 0; i < response.length; i++) {
        var newgifdiv = $("<div id='animeButton'>");
        var rating = $("<p>").text("Rating: " + response[i]);
        var url = response[i].images.fixed_height_still.url;
        var gif = $("<img>");
        gif.attr("src", url);
        gif.attr("data-still", response[i].images.fixed_height_still.url);
        gif.attr("data-animate", response[i].images.fixed_height.url);
        gif.attr("data-state", "still");
        gif.addClass("animate-gif");
        newgifdiv.append(rating);
        newgifdiv.append(gif);
        $("#buttonRow").prepend(newgifdiv);
    }
    // this creates new buttons based on topics
    function buttonMaker() {
        $("#buttonRow").empty();
        for (let i = 0; i < topics.length; i++) {
            var newButtons = $("<button>");
            newButtons.addClass("topic btn");
            newButtons.attr("data-name", topics[i]);
            newButtons.text(topics[i]);
            $("#buttonRow").append(newButtons);
        }
        console.log("dsad")
    }
    // stops the gif
    function removeButton() {
        $("#characters").empty();
        var topic = $(this).attr("data-name");
        var itemindex = topics.indexOf(topic);
        if (itemindex > -1) {
            topics.splice(itemindex, 1);
            renderButtons();
        }
    }
    // plays the gif
    function playGif() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }
    // this should make a new charcter button based on input
    $("#addCharacter").on("click", function (event) {
        event.preventDefault();
        var person = $("#characterName").val().trim();
        if (topics.toString().toLowerCase().indexOf(person.toLowerCase()) != -1) {
            alert("already got that button dummy.");
        }
        else {
            topics.push(person);
            renderButtons();
        }
    });
    


});