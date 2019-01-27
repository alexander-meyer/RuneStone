import random


class World:

    # room setup
    rooms = {
        'meadow': {'name': 'meadow','description': 'find yourself in a meadow', 'exits': {'north','west','east'}, 'north': 'hill', 'west': 'forest',
                  'east': 'river', 'text': 'A gentle breeze blows through, causing the grass to dance and sway.'},
        'river': {'name': 'river','description': 'come to the edge a river', 'exits': {'north','south'}, 'south': 'riverbank',
                  'west': 'meadow', 'text': 'The water looks cool and pleasant.', 'items': 'none'},
        'riverbank': {'name': 'riverbank','description': 'make your way to the riverbank, and hear what appears to be someone"'"s voice",
                      'exits': {'north'}, 'event': 'fishermen', 'north': 'river',
                      'text': 'The stream here is gentler, and you can overhear what appears to be a conversation.'},
        'forest': {'name': 'forest','description': 'come to a foreboding forest', 'exits': {'east'}, 'event': 'illuminate', 'east': 'meadow',
                   'text': "Looming pines make it too dark to see - perhaps if there was a way to illuminate the path?", 'items': 'none'},
        'cabin': {'name': 'cabin','description': 'stumble upon an old cabin', 'exits': {'north'}, 'north': 'forest',
                  'text': 'Inside you see old bottles, rotting furniture and various papers strewn across the floor.'},
        'hill': {'name': 'hill','description': 'reach the top of a small hill', 'exits': {'north'}, 'south': 'meadow', 'north': 'town',
                 'text': 'The hilltop rewards you with an unobstructed view of your surroundings.'},
        'town': {'name': 'town','description': 'arrive at a bustling town', 'exits': {'north','south','east'}, 'south': 'hill',
                 'north': 'mountain', 'east': 'plains', 'text': 'Vendors line the street, '}
        }

    directions = {'north', 'south', 'west', 'east'}

    currentRoom = rooms['meadow']
    prevRoom = []

    inventory = []




class Character:

    def __init__(self, name = "", build = "", health = 0, attk = 0, defense = 0, evade = 0):
        self.name = name
        self.build = build
        self.health = health
        self.attk = attk
        self.defense = defense
        self.evade = evade

    ## get and set methods for stats
    @property
    def name(self):
        return self.__name
    @name.setter
    def name(self,name):
        self.__name = name

    @property
    def build(self):
        return self.__build
    @build.setter
    def build(self, build):
        self.__build = build

    @property
    def health(self):
        return self.__health
    @health.setter
    def health(self, health):
        self.__health = health

    @property
    def attk(self):
        return self.__attk
    @attk.setter
    def attk(self, attk):
        self.__attk = attk

    @property
    def defense(self):
        return self.__defense
    @defense.setter
    def defense(self, defense):
        self.__defense = defense

    @property
    def evade(self):
        return self.__evade

    @evade.setter
    def evade(self, evade):
        self.__evade = evade


    #
    #
    #
    ## attack, block and evade methods
    #

    ## Randomly calculate the attack amount
    def attack(self):

        attkAmt = self.attk * (random.random() + .5)
        return attkAmt

    # Randomly calculate how much of the attack was blocked
    def block(self):
        blockAmt = self.defense * (random.random() + .5)
        return blockAmt

    # Use 'evasion' stat to determine percentage chance of dodging hit
    def dodge(self):

        # scale 'evasion' stat
        dex = self.evade*5
        # determine percentage chance of evasion
        difficulty = random.randint(0,100)
        return dex >= difficulty


    # toString method
    def __str__(self):
        return "Name: {}\n" \
               "Class: {}\n" \
               "Health: {}\n" \
               "Attack: {}\n" \
               "Defense: {}\n" \
               "Evasion: {}".format(self.name,self.build,self.health,self.attk,self.defense,self.evade)


#
#
## player classes

class Rogue(Character):

    def __init__(self):
        Character.__init__(self,name = "", build = "Rogue", health = 16, attk = 7, defense = 3, evade = 3)

class Mage(Character):

    def __init__(self):
        Character.__init__(self,name = "", build = "Mage", health = 12, attk = 9, defense = 2, evade = 2)

class Paladin(Character):

    def __init__(self):
        Character.__init__(self,name = "", build = "Paladin", health = 19, attk = 6, defense = 6, evade = 1)


## enemy classes
class Spider(Character):

    def __init__(self):
        Character.__init__(self, name= "Spider", build = "Enemy", health = 12, attk = 4, defense = 3, evade = 1)

class Bandit(Character):

    def __init__(self):
        Character.__init__(self, name= "Bandit", build = "Enemy", health = 6, attk = 4, defense = 2, evade = 2)

class Sorcerer(Character):

    def __init__(self):
        Character.__init__(self, name="Sorcerer", build= "Enemy", health = 6, attk = 4, defense = 2, evade = 2)



