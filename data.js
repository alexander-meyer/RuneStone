const movementWords = ['go', 'move', 'walk', 'run', 'travel', 'exit'];
const lookWords = ['area', 'surroundings', 'around', 'exits', 'look'];
const inventoryWords = ['bag', 'inventory', 'items', 'stuff'];
const directionWords = ['north', 'forward', 'west', 'left', 'right', 'east', 'south',];

const worldData = {
    meadow: {
        flavorText:
            'You find yourself in a meadow. <br/><br/> A gentle breeze blows through, causing the grass to dance and sway.',
        nearbyText:
            'lies a small clearing',
        exits: {
            north: 'hill',
            east: 'water',
            south: 'structure'
        },
        examine: {},
        item: '',
    },
    structure: {
        flavorText:
            'You arrive at a modest wooden shrine. <br/><br/> The wooden walls are old, the structure itself possessing a quiet sort of charisma. It appears well cared for. Inside you see a raised altar surrounded by candles.',
        nearbyText:
            'lies some sort of dwelling',
        exits: {
            north: 'meadow',
            west: 'orchard'
        },
        examine: {
            altar: 'There\'s a small groove in the center, about the size of a fist. You get the sense that something used to rest in this spot.'
        }
    },
    orchard: {
        flavorText:
            'You stand in the midst of a lush orchard. <br/><br/> Fruit trees surround you on all sides, suffusing the air with a delightful aroma. One tree in particular, covered in white blossoms, dwarfs the others.',
        nearbyText:
            'you see some sort of orchard',
        exits: {},
        examine: {
            tree: 'Small white flowers cover the entire tree. Looking at it fills you with a sense of calm. You notice several ripe pears dangling from a low-hanging branch.'
        },
        item: 'Pear',
        event: 'Pluck'
    },
    water: {
        flavorText:
            'You come to the bank of a river. <br/><br/> Swathes of cattails line the shore, swaying in the breeze. The water looks cool and pleasant.',
        nearbyText:
            'you hear the sound of rushing water',
        exits: {
            west: 'meadow'
        },
        examine: {},
        item: 'Amethyst Ring',
        event: 'swim'
    },
    hill: {
        flavorText:
            'You reach the top of the hill. <br/><br/> Trees obscure much of your view, but you can see a thick plume of smoke far off to the northeast.',
        nearbyText:
            'a large hill juts out of the earth',
        exits: {
            north: 'trees'
        },
        examine: {}
    },
    trees: {
        flavorText:
            'You stand at the entrance to a forest. <br/><br/> Looming pines make it too dark to see - perhaps if there was a way to illuminate the path?',
        nearbyText:
            'stands a particularly thick cropping of trees',
        exits: {
            south: 'hill'
        },
        examine: {}
    },
    bees: {
        flavorText:
            'You come to a garden of golden dandelions. <br/><br/> Honeybees drift from plant to plant, giving rise to a dull buzzing sound throughout the area. In the center of the field lie several strange boxes, and bent over one of these is a hooded figure.',
        nearbyText:
            'you hear a gentle humming sound',
        exits: {},
    },
    cabin: {
        flavorText:
            'You stumble upon an old cabin. Inside you see old bottles, rotting furniture and various papers strewn about.',
        exits: {
            north: 'trees'
        },
        examine: {}
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
    |  |'|  |
   _|__|_|__|_
   \\_________/
    `,
    key: `
       .-.     
      (   )|||||]
       '-'   l'l
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
