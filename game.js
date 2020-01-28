let currentRoom = "meadow";
const gameText = $('#game-text');
const userInput = $('#user-input');
// array of possible cardinal directions and adjacent room names
let roomExits = [];
let inventory = [];
let world = {}

$(document).ready(function () {
    setUpWorld();
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

function setUpWorld() {
    for (room in worldData) {
        const newRoom = new Room(room, worldData[room].description, worldData[room].directions, worldData[room].item, worldData[room].event);
        world[newRoom.name] = newRoom;
    }

    setRoom();
}

function setRoom() {
    roomExits = [];

    // populate global array to easily identify user directional commands
    Object.keys(world[currentRoom].exits).forEach(function (dir) {
        roomExits.push(dir, world[currentRoom].exits[dir])
    });

    gameText.append(`<p>${world[currentRoom].description}<p/>`);
}

function changeRoom(dir) {
    const currentRoomExits = world[currentRoom].exits;

    // north, south, east, etc...
    if ((currentRoomExits[dir]) !== undefined) {
        currentRoom = currentRoomExits[dir]
    }
    // river, forest, hill, etc...
    else {
        for (let key of Object.keys(currentRoomExits)) {
            if (dir === currentRoomExits[key]) {
                currentRoom = dir
            }
        }
    }

    setRoom();
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
        // else if (word === 'light') {
        //     gameText.append(`The lantern casts a feeble glow, but you see the outlines of a faint path amidst the trees.<br/><br/> <pre>${art.lantern}<pre/>`);

        //     world.forest.exits.south = 'cabin';
        //     roomExits.push('south', 'cabin');
        // }
        else {
            gameText.append('Not sure what you mean. <br/> <br/>');
        }
    }
    else if (inputArray.includes('swimming') && currentRoom === 'river') {
        gameText.append(events.swim.text);
        const newItem = new Item(events.swim.item);
        gameText.append(`* ${newItem.name} added to inventory * <br/><br/>`)
        inventory.push(newItem);
    }
    else {
        gameText.append('Not sure what you mean. <br/> <br/>');
    }
}