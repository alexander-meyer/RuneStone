const movementWords = ['go', 'move', 'walk', 'run', 'travel', 'exit'];
const lookWords = ['area', 'surroundings', 'around', 'exits', 'look'];
const inventoryWords = ['bag', 'inventory', 'items', 'stuff'];

const worldData = {
    meadow: {
        description:
            "You find yourself in a meadow. A gentle breeze blows through, causing the grass to dance and sway.",
        directions: {
            north: "hill",
            west: "forest",
            east: "river"
        },
        item: '',
        event: ''
    },
    river: {
        description:
            "You come to the bank of a river. The water looks cool and pleasant.",
        directions: {
            west: "meadow"
        },
        item: "Amethyst ring",
        event: "swim"
    },
    forest: {
        description:
            "You stand at the entrance to a forest. Looming pines make it too dark to see - perhaps if there was a way to illuminate the path?",
        directions: {
            east: "meadow"
        },
        event: "illuminate"
    },
    cabin: {
        description:
            "You stumble upon an old cabin. Inside you see old bottles, rotting furniture and various papers strewn about.",
        directions: {
            north: "forest"
        }
    },
    hill: {
        description:
            "You reach the top of a small hill. The land stretches out in front of you. A mountain looms on the horizon, dark and foreboding.",
        directions: {
            north: "road",
            south: "meadow"
        }
    },
    road: {
        description:
            "You come to a well-trodden road. No doubt many travellers have made their way through here.",
        directions: {
            north: "town",
            south: "hill"
        }
    },
    town: {
        description:
            "You come to a bustling town. A bell rings in the distance, barely discernible amidst the bustle of a day market.",
        directions: {
            south: "road"
        }
    }
};

const events = {
    swim: {
        text: "Casting garments aside, you dive in for a refreshing dip.<br/> Hmm? Something catches your eye on the riverbed...<p/>",
        item: "Amethyst Ring"
    }
}
