const movementWords = ['go', 'move', 'walk', 'run', 'travel', 'exit'];
const lookWords = ['area', 'surroundings', 'around', 'exits', 'look'];
const inventoryWords = ['bag', 'inventory', 'items', 'stuff'];
const directionWords = ['north', 'forward', 'west', 'left', 'right', 'east', 'south',];

const worldData = {
    temple: {
        description: "You stand in front of a temple. Well-tended pear trees line the path leading outside.",
        directions: {
            north: 'meadow'
        },
        nearbyText: 'you can see familiar outlines of home',
        examine: {
            trees: 'Many appear to be sagging under the weight of all that fruit.'
        },
        item: 'Pear',
        event: 'pear'
    },
    meadow: {
        description:
            "You find yourself in a meadow. A gentle breeze blows through, causing the grass to dance and sway.",
        directions: {
            west: "trees",
            east: "water",
            south: 'temple'
        },
        nearbyText: 'lies a small clearing',
        examine: '',
        item: '',
    },
    water: {
        description:
            "You come to the bank of the river Kor. The water looks cool and pleasant.",
        directions: {
            west: "meadow"
        },
        nearbyText: 'you can hear the sound of rushing water',
        examine: '',
        item: "Amethyst Ring",
        event: "swim"
    },
    trees: {
        description:
            "You stand at the entrance to a forest. Looming pines make it too dark to see - perhaps if there was a way to illuminate the path?",
        directions: {
            east: "meadow"
        },
        nearbyText: 'you see a thick cropping of trees',
        examine: ''
    },
    cabin: {
        description:
            "You stumble upon an old cabin. Inside you see old bottles, rotting furniture and various papers strewn about.",
        directions: {
            north: "trees"
        },
        examine: ''
    }
};



const art = {
    sword: `
            ()
            )(
            )(
         o======o
            ||
            ||
            ||
            ||
            ||
            ||
            ||
            ||
            ||
            \\/`,
    book: `
        __________________   __________________
    .-/|                  \\ /                  |\\-.
    ||||                   |                   ||||
    ||||                   |                   ||||
    ||||                   | up, right, right, ||||
    ||||                   | down, left        ||||
    ||||                   |                   ||||
    ||||                   |                   ||||
    ||||                   |                   ||||
    ||||                   |                   ||||
    ||||                   |                   ||||
    ||||                   |                   ||||
    ||||__________________ | __________________||||
    ||/===================\\|/===================\\||
    \`--------------------~___~-------------------''
    `,
    lantern: `
       .-.
     _(   )_    
    /=='-'==\\
   /_________\\
    |   )   |
    |  (_)  |
    |  |"|  |
   _|__|_|__|_
   \\_________/
    `,
    key: `
       .-.     
      (   )|||||]
       '-'   l"l
    `,
    ring: `
        __
       _\\/_
      //^^\\\\
      \\\\__//
       '--'
    `,
    pear: `
         )
        _|_
       /   \\ 
      /   # \\
     (   ##  ) 
      ',___,'
    `,
    title: `
             ____________________________________________________
    ________|   __   _  _         __   __  ___   __          __  |_______
    \\       |  |__|  |  |  |\\ |  |__  /_    |   |  |  |\\ |  |__  |      /
     \\      |  |  \\  |__|  | \\|  |__  __/   |   |__|  | \\|  |__  |     /
     /      |____________________________________________________|     \\
    /__________)                                             (__________\\
        `


}
