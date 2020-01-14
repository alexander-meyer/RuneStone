var currentRoom = "start";

var gameText = $('#game-text');
var userInput = $('#user-input');

function changeRoom(dir) {
    if ((rooms[currentRoom].directions[dir]) !== undefined) {
        currentRoom = rooms[currentRoom].directions[dir]
    }
    gameText.append(rooms[currentRoom].description)
}

$(document).ready(function () {
    $('#game-text').append(rooms[currentRoom].description)

    $(document).keypress(function (key) {
        if ((key.which === 13) && $('#user-input').is(':focus')) {
            var value = $('#user-input').val().toLowerCase();
            $('#user-input').val('')

            switch (value) {
                case "north": case "up":
                    changeRoom("north");
                    break;
                case "south": case "down":
                    changeRoom("south");
                    break;
                case "west": case "left":
                    changeRoom("west");
                    break;
                case "east": case "right":
                    changeRoom("east");
                    break
                default:
                    gameText.append("<br /> Not sure what you mean.");
            }
        };
    })
})

// .text   <-- overwrites current text