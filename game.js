var currentRoom = "meadow";
var gameText = $('#game-text');
var userInput = $('#user-input');
const directions = ['north', 'south', 'west', 'east'];

function describeSurroundings() {
    gameText.append(rooms[currentRoom].description);

    Object.keys(rooms[currentRoom].directions).forEach(function (dir) {
        gameText.append(`To your ${dir} lies a ${rooms[currentRoom].directions[dir]}. <br/>`);
    });

    gameText.append('<br/>');

}

function changeRoom(dir) {
    if ((rooms[currentRoom].directions[dir]) !== undefined) {
        currentRoom = rooms[currentRoom].directions[dir]
    }
    else {
        gameText.append('You can\'t go that way.');
    }

    describeSurroundings();
}

function parseInput(input) {
    inputArray = input.toLowerCase().split(' ');

    command = inputArray[0];
    if (directions.includes(command)) {
        changeRoom(command)
    }
    else {
        switch (command) {
            case 'go': case 'walk': case 'move':
                if (inputArray.length === 1) {
                    var command = command[0].toUpperCase() + command.slice(1).toLowerCase();
                    gameText.append(`${command} where? <br/> <br/>`);
                }
                else {
                    var dir = inputArray[1];
                    changeRoom(dir);
                }
                break;
            default:
                gameText.append('Not sure what you mean');
                break;
        }
    }
}

$(document).ready(function () {
    describeSurroundings();

    $(document).keypress(function (key) {
        if ((key.which === 13) && userInput.is(':focus')) {
            var value = userInput.val();
            userInput.val('');
            parseInput(value);

        };
    })
})

// .text   <-- overwrites current text