var currentRoom = "start";

function changeRoom(dir) {
    if (rooms[currentRoom].directions[dir] !== undefined) {
        currentRoom = rooms[currentRoom].directions[dir];
        $("#game-text").append("<p>" + rooms[currentRoom].description + "<p>");
    }
    else {
        alert("No such direction.")
    }
}

$(document).ready(function () {
    $("#game-text").append("<p>" + rooms.start.description + "</p>");

    $(document).keypress(function (key) {
        if (key.which === 13 && $("#user-input").is(":focus")) {
            var value = $("#user-input")
                .val()
                .toLowerCase();
            changeRoom(value)
        }
    });
});
