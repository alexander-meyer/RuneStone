const gameText = $('#game-text');
const userInput = $('#user-input');

$(document).ready(function () {
    const game = new Game();
    game.setUpWorld();

    $(document).keypress(function (key) {
        if ((key.which === 13) && userInput.is(':focus')) {
            var value = userInput.val();
            userInput.val('> ');
            game.parseInput(value);
        };
    })
})
// .text   <-- overwrites current text

class Game {
    constructor() {
        this.world = {};
        this.currentRoom = 'meadow';
        this.roomExits = ['north', 'hill', 'west', 'forest', 'east', 'river'];
        this.player = new Player();
    }

    getCurrentRoomAsObject() {
        return this.world[this.currentRoom];
    }

    setUpWorld() {
        for (const room in worldData) {
            const newRoom = new Room(room, worldData[room].description, worldData[room].directions, worldData[room].item, worldData[room].event);
            this.world[newRoom.name] = newRoom;
        }

        this.setRoom();
        // gameText.append(`<pre>${art.lantern}<pre/>`);
    }

    setRoom() {
        this.roomExits = [];
        const currentRoom = this.getCurrentRoomAsObject();

        // populate global array to easily identify user directional commands
        for (const exit in currentRoom.exits) {
            if (currentRoom.exits.hasOwnProperty(exit)) {
                this.roomExits.push(exit, currentRoom.exits[exit]);
            }
        }
        gameText.append(`<p>${currentRoom.description}<p/>`);
        this.displayExits();
    }

    changeRoom(dir) {
        const currentRoomExits = this.getCurrentRoomAsObject().exits;

        // north, south, east, etc...
        if ((currentRoomExits[dir]) !== undefined) {
            this.currentRoom = currentRoomExits[dir];
        }
        // river, forest, hill, etc...
        else {
            for (let key of Object.keys(currentRoomExits)) {
                if (dir === currentRoomExits[key]) {
                    this.currentRoom = dir;
                }
            }
        }

        this.setRoom();
    }

    displayExits() {
        for (let i = 0; i < this.roomExits.length - 1; i = i + 2) {
            gameText.append(`To your ${this.roomExits[i]} lies a ${this.roomExits[i + 1]}. <br/>`);
        }

        gameText.append('<br/>');
    }

    displayInventory() {
        const inventory = this.player.inventory;
        if (Object.entries(inventory).length === 0) {
            gameText.append('Nothing in your bag.<br/><br/>')
        }
        else {
            for (const item in inventory) {
                if (inventory.hasOwnProperty(item)) {
                    gameText.append(`~ ${inventory[item].name}`);
                    gameText.append('<br/>');
                }
            }
            gameText.append('<br/><br/>');
        }
    }

    parseInput(input) {
        gameText.append(`${input} <br/> <br/>`);

        let inputArray = input.toLowerCase().split(' ').filter(element => element !== '>');

        // returns first user command contained in a target array
        const directionToMove = checkForValidMove(inputArray, this.roomExits);

        if (directionToMove !== 'none') {
            this.changeRoom(directionToMove);
        }
        else if (checkForValidMove(inputArray, lookWords) !== 'none') {
            this.displayExits();
        }
        else if (checkForValidMove(inputArray, inventoryWords) !== 'none') {
            this.displayInventory();
        }
        else if (inputArray.includes('help')) {
            help();
        }
        else {
            // if (world[currentRoom].event) {
            //     if (inputArray.includes('swimming') && currentRoom === 'river') {
            //         gameText.append(events.swim.text + "<br/><br/>");
            //         if (events.swim.item !== '') {
            //             const newItem = new Item(events.swim.item);
            //             gameText.append(`* ${newItem.name} added to inventory * <br/><br/>`)
            //             events.swim.item = '';
            //             inventory[newItem.name] = newItem
            //             events.swim.text = "Casting garments aside, you dive in for a refreshing dip.";
            //         }
            //     }
            //     else {
            //         gameText.append('Not sure what you mean. <br/> <br/>');
            //     }
            // }
            if (inputArray.length === 1) {
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
            else {
                gameText.append('Not sure what you mean. <br/> <br/>');
            }
        }
    }

}

// function appendText(text) {
//     $('#game-text').append(text)
//         .hide()
//         .delay(250)
//         .fadeIn({
//             duration: 100,
//             start: scrollDown
//         })
// }

// function scrollDown() {
//     // setTimeout(function() {
//     //   var elem = document.getElementById('miniChat');
//     //   elem.scrollTop = elem.scrollHeight;
//     // }, 400);

//     gameText.animate({ scrollTop: (gameText).prop("scrollHeight") - gameText.height() }, 300);
// }

function help() {
    gameText.append('Basic commands include \'look\', \'go ____\' and \'inventory\', though rooms may respond to other actions...<br/><br/>')
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

function checkForEvent(parsedInput) {

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
        console.log('inventory :', inventory);
        displayInventory();
    }
    else if (inputArray.includes('help')) {
        help();
    }
    else {
        if (world[currentRoom].event) {
            if (inputArray.includes('swimming') && currentRoom === 'river') {
                gameText.append(events.swim.text + "<br/><br/>");
                if (events.swim.item !== '') {
                    const newItem = new Item(events.swim.item);
                    gameText.append(`* ${newItem.name} added to inventory * <br/><br/>`)
                    events.swim.item = '';
                    inventory[newItem.name] = newItem
                    events.swim.text = "Casting garments aside, you dive in for a refreshing dip.";
                }
            }
            else {
                gameText.append('Not sure what you mean. <br/> <br/>');
            }
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
        else {
            gameText.append('Not sure what you mean. <br/> <br/>');
        }
    }
}



