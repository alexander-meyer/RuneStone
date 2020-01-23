let currentRoom = "meadow";
const gameText = $('#game-text');
const userInput = $('#user-input');
// array of possible cardinal directions and adjacent room names
let roomExits = [];
let inventory = [];

$(document).ready(function () {
    setupRoom();

    $(document).keypress(function (key) {
        if ((key.which === 13) && userInput.is(':focus')) {
            var value = userInput.val();
            userInput.val('');
            parseInput(value);
        };
    })
})

// .text   <-- overwrites current text

function setupRoom() {
    Object.keys(rooms[currentRoom].directions).forEach(function (dir) {
        roomExits.push(dir, rooms[currentRoom].directions[dir])
    });

    gameText.append(rooms[currentRoom].description);
}

function changeRoom(dir) {
    const currentRoomExits = rooms[currentRoom].directions;

    // north, south, ...
    if ((currentRoomExits[dir]) !== undefined) {
        currentRoom = currentRoomExits[dir]
    }
    // else entered room name directly
    else {
        for (let key of Object.keys(currentRoomExits)) {
            if (dir === currentRoomExits[key]) {
                currentRoom = dir
            }
        }
    }

    roomExits = [];
    setupRoom();
}

function displayExits() {

    console.log(roomExits);
    console.log(roomExits.length);
    console.log(roomExits[0]);
    console.log(roomExits[1]);
    console.log(roomExits[2]);
    console.log(roomExits[3]);
    console.log(roomExits[4]);
    console.log(roomExits[5]);
    for (i = 0; i < roomExits.length - 1; i = i + 2) {
        gameText.append(`To your ${roomExits[i]} lies a ${roomExits[i + 1]} <br/>`);
    }

    gameText.append('<br/>');
}

// takes user input and returns first element found in a target array
function checkForValidMove(userInput, targetArray) {
    for (const word of userInput) {
        if (targetArray.includes(word)) {
            return word;
        }
    }
}

function parseInput(input) {
    gameText.append(`${input} <br/> <br/>`);

    inputArray = input.toLowerCase().split(' ');

    // returns first valid direction or room name from input, if any
    const directionToMove = checkForValidMove(inputArray, roomExits);

    if (directionToMove) {
        changeRoom(directionToMove);
    }
    else {
        const command = inputArray[0];
        switch (command) {
            case 'go': case 'walk': case 'move':
                if (inputArray.length === 1) {
                    command = command[0].toUpperCase() + command.slice(1).toLowerCase();
                    gameText.append(`${command} where? <br/> <br/>`);
                }
                else {
                    var dir = inputArray[1];
                    changeRoom(dir);
                }
                break;
            case 'look':
                displayExits();
                break;
            default:
                gameText.append('Not sure what you mean' + '<br/> <br/>');
                break;
        }
    }
}