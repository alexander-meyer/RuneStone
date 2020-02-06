class Game {
    constructor(gameText) {
        this.gameText = gameText;
        this.world = {};
        this.currentRoom = '';
        this.roomExits = [];
        this.player = new Player();
    }

    getCurrentRoomObject() {
        return this.world[this.currentRoom];
    }

    getCurrentEventObject() {
        return this.getCurrentRoomObject().event;
    }

    setUpWorld() {
        for (const room in worldData) {
            const newRoom = new Room(room, worldData[room].description, worldData[room].nearbyText, worldData[room].examine, worldData[room].directions, worldData[room].item, worldData[room].event);

            this.world[newRoom.name] = newRoom;

            if (newRoom.hasEvent()) {
                const eventData = events[newRoom.event];
                this.world[newRoom.name].event = new GameEvent(eventData.flavorText, eventData.item, eventData.itemNeeded, eventData.triggers, eventData.conditionsMet, eventData.logic)
            }
        }

        this.currentRoom = 'temple';
        this.setRoom();
    }

    setRoom() {
        this.roomExits = [];
        const currentRoom = this.getCurrentRoomObject();

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
        switch (dir) {
            case 'forward':
                dir = 'north';
                break;
            case 'left':
                dir = 'west';
                break;
            case 'right':
                dir = 'east';
                break;
        }
        const currentRoomExits = this.getCurrentRoomObject().exits;

        // north, south, east, etc...
        if ((currentRoomExits[dir]) !== undefined) {
            this.currentRoom = currentRoomExits[dir];
            this.setRoom();
        }
        // river, forest, hill, etc...
        else if (this.roomExits.includes(dir)) {
            for (let key of Object.keys(currentRoomExits)) {
                if (dir === currentRoomExits[key]) {
                    this.currentRoom = dir;
                }
            }
            this.setRoom();
        }
        else {
            appendTextAndScroll('you can\'t go that way.<br/><br/>');
        }
    }

    displayExits() {
        for (let i = 0; i < this.roomExits.length - 1; i = i + 2) {
            gameText.append(`to the <b>${this.roomExits[i]}</b> ${this.world[this.roomExits[i + 1]].nearbyText}. <br/>`);
        }

        appendTextAndScroll('<br/>');
    }

    displayInventory() {
        const inventory = this.player.inventory;
        if (Object.entries(inventory).length === 0) {
            appendTextAndScroll('nothing in your bag.<br/><br/>')
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

    examine(parsedInput) {
        const room = this.getCurrentRoomObject();
        const objectToInvestigate = findValidCommand(parsedInput, Object.keys(room.examine));

        if (objectToInvestigate !== 'none') {
            appendTextAndScroll(room.examine[objectToInvestigate] + '<br/><br/>');
        }
        else {
            badCommand();
        }
    }

    tryEvent(parsedInput) {
        const currentEvent = this.getCurrentEventObject();
        // user commands match event trigger
        if (currentEvent.conditionsMet(parsedInput, currentEvent.triggers, this.player)) {

            currentEvent.logic(this.player, currentEvent.flavorText, currentEvent.itemReward);
        }
        else {
            badCommand();
        }
    }

    parseInput(input) {
        appendTextAndScroll(`> <i>${input} <i/><br/> <br/>`);

        let parsedInput = input.toLowerCase().split(' ').filter(element => element !== '>');

        // returns first user command contained in a target array
        const directionToMove = findValidCommand(parsedInput, directionWords.concat(this.roomExits));

        if (directionToMove !== 'none') {
            this.changeRoom(directionToMove);
        }
        else if (findValidCommand(parsedInput, inventoryWords) !== 'none') {
            this.displayInventory();
        }
        else if (parsedInput.includes('help')) {
            help();
        }
        else if (parsedInput.includes('dance')) {
            appendTextAndScroll('you gyrate in place, swinging your arms back and forth. A shame no one is around to admire. <br/><br/>')
        }
        else if (parsedInput.includes('examine')) {
            this.examine(parsedInput);
        }
        else {
            if (this.getCurrentRoomObject().event) {
                this.tryEvent(parsedInput);
            }
            else if (parsedInput.length === 1) {
                const word = parsedInput[0];
                if (movementWords.includes(word)) {
                    appendTextAndScroll('where? <br/><br/>');
                }
                else if (word === 'check') {
                    appendTextAndScroll('check what? <br/><br/>');
                }
                else if (word === 'room') {
                    appendTextAndScroll(`<p>${this.getCurrentRoomObject().description}<p/>`);
                    this.displayExits();
                }
                else {
                    appendTextAndScroll('not sure what you mean. <br/> <br/>');
                }
            }
            else {
                appendTextAndScroll('not sure what you mean. <br/> <br/>');
            }
        }
    }

}