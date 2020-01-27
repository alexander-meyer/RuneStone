class Item {
    constructor(name) {
        this.name = name;
    }

}

class Room {
    constructor(name, description, exits, items, event) {
        this.name = name;
        this.description = description;
        this.exits = exits;
        this.items = items;
        this.event = event;
    }
}