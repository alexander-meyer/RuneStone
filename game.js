class Game {
    constructor(gameText) {
        this.gameText = gameText;
        this.world = {};
        this.currentRoom = 'meadow';
        this.roomExits = ['north', 'hill', 'west', 'forest', 'east', 'river'];
        this.player = new Player();
    }

    getCurrentRoomAsObject() {
        return this.world[this.currentRoom];
    }

    getCurrentRoomEvent() {
        return events[this.getCurrentRoomAsObject().event].triggers;
    }

    setUpWorld() {
        for (const room in worldData) {
            const newRoom = new Room(room, worldData[room].description, worldData[room].directions, worldData[room].item, worldData[room].event);
            this.world[newRoom.name] = newRoom;
        }

        this.setRoom();
        // appendTextAndScroll(`<pre>${art.lantern}<pre/>`);
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
        gameText.append(`${currentRoom.description}<br/><br/>`);
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
            gameText.append(`to your ${this.roomExits[i]}, a <b>${this.roomExits[i + 1]}<b/>. <br/>`);
        }

        appendTextAndScroll('<br/>');
    }

    displayInventory() {
        const inventory = this.player.inventory;
        if (Object.entries(inventory).length === 0) {
            appendTextAndScroll('Nothing in your bag.<br/><br/>')
        }
        else {
            for (const item in inventory) {
                if (inventory.hasOwnProperty(item)) {
                    appendTextAndScroll(`~ ${inventory[item].name}`);
                    appendTextAndScroll('<br/>');
                }
            }
            appendTextAndScroll('<br/><br/>');
        }
    }

    checkForEvent(parsedInput) {
        if (findValidCommand(parsedInput, this.getCurrentRoomAsObject().event) !== 'none') {

        }
    }

    parseInput(input) {
        appendTextAndScroll(`> <i>${input} <i/><br/> <br/>`);

        let inputArray = input.toLowerCase().split(' ').filter(element => element !== '>');

        // returns first user command contained in a target array
        const directionToMove = findValidCommand(inputArray, this.roomExits);

        if (directionToMove !== 'none') {
            this.changeRoom(directionToMove);
        }
        else if (findValidCommand(inputArray, inventoryWords) !== 'none') {
            this.displayInventory();
        }
        else if (inputArray.includes('help')) {
            help();
        }
        else if (inputArray.includes('dance')) {
            appendTextAndScroll('You gyrate in place, swinging your arms back and forth. A shame no one is around to admire. <br/><br/>')
        }
        else {
            if (this.getCurrentRoomAsObject().event) {
                this.checkForEvent();
            }
            else if (inputArray.length === 1) {
                const word = inputArray[0];
                if (movementWords.includes(word)) {
                    appendTextAndScroll('Where? <br/><br/>');
                }
                else if (word === 'check') {
                    appendTextAndScroll('Check what? <br/><br/>');
                }
                else if (word === 'room') {
                    appendTextAndScroll(`<p>${this.getCurrentRoomAsObject().description}<p/>`);
                    this.displayExits();
                }
                else {
                    appendTextAndScroll('Not sure what you mean. <br/> <br/>');
                }
            }
            else {
                appendTextAndScroll('Not sure what you mean. <br/> <br/>');
            }
        }
    }

}