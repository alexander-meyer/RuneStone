let currentRoom = "meadow";
const gameText = $('#game-text');
const userInput = $('#user-input');
// array of possible cardinal directions and adjacent room names
let roomExits = [];
let inventory = [];
let first = true

$(document).ready(function () {
    setupRoom();
    userInput.val('> ');

    $(document).keypress(function (key) {

        if ((key.which === 13) && userInput.is(':focus')) {
            var value = userInput.val();
            userInput.val('> ');
            parseInput(value);
        };
    })
})
// .text   <-- overwrites current text

function setupRoom() {
    Object.keys(rooms[currentRoom].directions).forEach(function (dir) {
        roomExits.push(dir, rooms[currentRoom].directions[dir])
    });

    gameText.append(`<p>${rooms[currentRoom].description}<p/>`);
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

function help() {
    gameText.append('Basic commands include \'look\', \'go ____\' and \'inventory\', though rooms may respond to other actions...<br/><br/>')
}

function displayInventory() {
    if (inventory.length === 0) {
        gameText.append('Nothing in your bag.<br/><br/>')
    }
    else {
        for (const item of inventory) {
            gameText.append(`~ ${item.name}`);
        }
        gameText.append('<br/><br/>');
    }
}

function displayExits() {
    for (i = 0; i < roomExits.length - 1; i = i + 2) {
        gameText.append(`To your ${roomExits[i]} lies a ${roomExits[i + 1]}. <br/>`);
    }

    gameText.append('<br/>');
}

// takes user input and returns first matching element found in a target array
function checkForValidMove(userInput, targetArray) {
    for (const word of userInput) {
        if (targetArray.includes(word)) {
            return word;
        }
    }
    return 'none';
}

function parseInput(input) {
    gameText.append(`${input} <br/> <br/>`);

    let inputArray = input.toLowerCase().split(' ').filter(element => element !== '>');

    // returns first user command contained in a target array
    const directionToMove = checkForValidMove(inputArray, roomExits);

    if (directionToMove !== 'none') {
        changeRoom(directionToMove);
    }
    else if (checkForValidMove(inputArray, lookWords) !== 'none') {
        displayExits();
    }
    else if (checkForValidMove(inputArray, inventoryWords) !== 'none') {
        console.log('bag check');
        displayInventory();
    }
    else if (inputArray.includes('help')) {
        help();
    }
    else if (inputArray.length === 1) {
        const word = inputArray[0];
        if (movementWords.includes(word)) {
            gameText.append('Where? <br/><br/>');
        }
        else if (word === 'check') {
            gameText.append('Check what? <br/><br/>');
        }
        else {
            gameText.append('Not sure what you mean. <br/> <br/>');
        }
    }
    else if (inputArray.includes('swimming') && currentRoom === 'river') {
        gameText.append(events.swim.text);
        var newItem = new Item(events.swim.item);

        console.log('newItem :', newItem);

        gameText.append(`* ${newItem.name} added to inventory * <br/><br/>`)
        inventory.push(newItem);
    }
    else {
        gameText.append('Not sure what you mean. <br/> <br/>');
    }
}