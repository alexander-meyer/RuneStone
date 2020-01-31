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

    setUpWorld() {
        for (const room in worldData) {
            const newRoom = new Room(room, worldData[room].description, worldData[room].directions, worldData[room].item, worldData[room].event);
            this.world[newRoom.name] = newRoom;
        }

        this.setRoom();
        // appendText(`<pre>${art.lantern}<pre/>`);
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
        appendText(`<p>${currentRoom.description}<p/>`);
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
            appendText(`To your ${this.roomExits[i]} lies a ${this.roomExits[i + 1]}. <br/>`);
        }

        appendText('<br/>');
    }

    displayInventory() {
        const inventory = this.player.inventory;
        if (Object.entries(inventory).length === 0) {
            appendText('Nothing in your bag.<br/><br/>')
        }
        else {
            for (const item in inventory) {
                if (inventory.hasOwnProperty(item)) {
                    appendText(`~ ${inventory[item].name}`);
                    appendText('<br/>');
                }
            }
            appendText('<br/><br/>');
        }
    }

    parseInput(input) {
        appendText(`${input} <br/> <br/>`);

        let inputArray = input.toLowerCase().split(' ').filter(element => element !== '>');

        // returns first user command contained in a target array
        const directionToMove = checkForValidMove(inputArray, this.roomExits);

        if (directionToMove !== 'none') {
            this.changeRoom(directionToMove);
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
            //         appendText(events.swim.text + "<br/><br/>");
            //         if (events.swim.item !== '') {
            //             const newItem = new Item(events.swim.item);
            //             appendText(`* ${newItem.name} added to inventory * <br/><br/>`)
            //             events.swim.item = '';
            //             inventory[newItem.name] = newItem
            //             events.swim.text = "Casting garments aside, you dive in for a refreshing dip.";
            //         }
            //     }
            //     else {
            //         appendText('Not sure what you mean. <br/> <br/>');
            //     }
            // }
            if (inputArray.length === 1) {
                const word = inputArray[0];
                if (movementWords.includes(word)) {
                    appendText('Where? <br/><br/>');
                }
                else if (word === 'check') {
                    appendText('Check what? <br/><br/>');
                }
                else {
                    appendText('Not sure what you mean. <br/> <br/>');
                }
            }
            else {
                appendText('Not sure what you mean. <br/> <br/>');
            }
        }
    }

}