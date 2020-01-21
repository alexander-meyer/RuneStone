let currentRoom = "meadow";
const gameText = $('#game-text');
const userInput = $('#user-input');
// array of possible cardinal directions and adjacent room names
let possibleDirections = [];

function describeSurroundings() {
    gameText.append(rooms[currentRoom].description);

    Object.keys(rooms[currentRoom].directions).forEach(function (dir) {
        gameText.append(`To your ${dir} lies a ${rooms[currentRoom].directions[dir]}. <br/>`);
        possibleDirections.push(dir, rooms[currentRoom].directions[dir])
    });

    gameText.append('<br/>');
}

function changeRoom(dir) {
    const currentRoomExits = rooms[currentRoom].directions;

    if ((currentRoomExits[dir]) !== undefined) {
        currentRoom = currentRoomExits[dir]
    } else {
        for (let key of Object.keys(currentRoomExits)) {
            if (dir === currentRoomExits[key]) {
                currentRoom = dir
            }
        }
    }

    possibleDirections = [];
    describeSurroundings();
}

function parseInput(input) {
    inputArray = input.toLowerCase().split(' ');

    // returns first valid direction or room name from input, if any
    function checkForValidMove(input) {
        for (const word of input) {
            if (possibleDirections.includes(word)) {
                return word;
            }
        }
    }

    const direction = checkForValidMove(inputArray);

    if (direction) {
        changeRoom(direction);
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
                gameText.append(`${input}<p>Not sure what you mean</p>`);
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