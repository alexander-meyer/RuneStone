var rooms = {
    meadow: {
        description:
            "<p>You find yourself in a meadow. A gentle breeze blows through, causing the grass to dance and sway.</p>",
        directions: {
            north: "hill",
            west: "forest",
            east: "river"
        }
    },
    river: {
        description:
            "<p>You come to the bank of a river. The water looks cool and pleasant.</p>",
        directions: {
            west: "meadow"
        },
        item: "Amethyst ring",
        event: "swim"
    },
    forest: {
        description:
            "<p>You stand at the entrance to a forest. Looming pines make it too dark to see - perhaps if there was a way to illuminate the path?</p>",
        directions: {
            east: "meadow"
        },
        event: "illuminate"
    },
    cabin: {
        description:
            "<p>You stumble upon an old cabin. Inside you see old bottles, rotting furniture and various papers strewn about.<p>",
        directions: {
            north: "forest"
        }
    },
    hill: {
        description:
            "<p>You reach the top of a small hill. The land stretches out in front of you. A mountain looms on the horizon, dark and foreboding.<p>",
        directions: {
            north: "road",
            south: "meadow"
        }
    },
    road: {
        description:
            "<p>You come to a well-trodden road. No doubt many travellers have made their way through here.<p>",
        directions: {
            north: "town",
            south: "hill"
        }
    },
    town: {
        description:
            "<p>You come to a bustling town. A bell rings in the distance, barely discernible amidst the bustle of a day market.",
        directions: {
            south: "road"
        }
    }
};
