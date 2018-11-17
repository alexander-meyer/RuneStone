class World:

    # room setup
    rooms = {
        'start': {'name': 'a meadow', 'north': 'a hill', 'west': 'a forest',
                  'east': 'a river', 'text': 'A gentle breeze blows through, causing the grass to dance and sway.', 'items': 'none'},
        'river': {'name': 'a river', 'south': 'a protruding riverbank',
                  'north': 'a meadow', 'text': 'It curves around and out of sight, the water running deep and swift.', 'items': 'none'},
        'riverbank': {'name': 'a protruding riverbank', 'event': 'fishermen', 'north': 'a river',
                      'text': 'The stream here is gentler, and you can overhear what appears to be a conversation.'},
        'forest': {'name': 'a forest', 'event': 'illuminate', 'east': 'a meadow',
                   'text': "The path is quickly lost in the shadows cast by looming pines - perhaps if there was some way to see...", 'items': 'none'},
        'cabin': {'name': 'an old cabin', 'north': 'the forest path', 'text': 'Inside you see old bottles, rotting furniture and various '
                                                                                               'papers strewn across the floor.'},
        'hill': {'name': 'a hill', 'south': 'a meadow', 'north': 'a town', 'text': 'The hilltop rewards you with an unobstructed view of your surroundings.'},
        'town': {'name': 'a town', 'south': 'a hill', 'north': 'a mountain', 'east': 'a vast plains', 'text': ''}
        }

    directions = {'north', 'south', 'west', 'east'}

    currentRoom = rooms['a meadow']

    inventory = []

