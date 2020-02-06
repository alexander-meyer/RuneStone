class Player {
    constructor() {
        this._inventory = {};
    }

    get inventory() {
        return this._inventory;
    }

    addItem(item) {
        this._inventory[item.name] = item;
    }

    hasItem(itemName) {
        return true ? this._inventory[itemName] !== undefined : false;
    }
}

class Item {
    constructor(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

}

class Room {
    constructor(name, description, nearbyText, examine, exits, items, event) {
        this.name = name;
        this._description = description;
        this.nearbyText = nearbyText;
        this.examine = examine
        this._exits = exits;
        this._items = items;
        this._event = event;
    }

    // necessary setters and getters
    get description() {
        return this._description;
    }
    set description(newDescrip) {
        this._description = newDescrip;
    }

    get exits() {
        return this._exits;
    }
    set exits(newExits) {
        this._exits = newExits;
    }

    get item() {
        return this._item;
    }

    get event() {
        return this._event;
    }
    set event(eventObj) {
        this._event = eventObj;
    }

    removeItem() {
        this._item = '';
    }

    hasEvent() {
        return true ? this.event !== undefined : false;
    }

}

class GameEvent {
    constructor(flavorText, itemReward, itemNeeded, triggerWords, conditionsMet, eventFunction) {
        this.flavorText = flavorText;
        this.itemReward = itemReward;
        this.itemNeeded = itemNeeded
        this.triggers = triggerWords;
        this.conditionsMet = conditionsMet;
        this.logic = eventFunction
    }

    playEvent() {
        this.logic;
    }
}