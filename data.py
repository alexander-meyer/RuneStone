import random


class World:

    # room setup
    rooms = {
        'meadow': {'name': 'a meadow', 'exits': {'north','west','east'}, 'north': 'hill', 'west': 'forest',
                  'east': 'river', 'text': 'A gentle breeze blows through, causing the grass to dance and sway.', 'items': 'none'},
        'river': {'name': 'a river', 'exits': {'north','south'}, 'south': 'riverbank',
                  'west': 'meadow', 'text': 'It curves around and out of sight, the water running deep and swift.', 'items': 'none'},
        'riverbank': {'name': 'a protruding riverbank', 'exits': {'north'}, 'event': 'fishermen', 'north': 'river',
                      'text': 'The stream here is gentler, and you can overhear what appears to be a conversation.'},
        'forest': {'name': 'a forest', 'exits': {'east'}, 'event': 'illuminate', 'east': 'meadow',
                   'text': "Looming pines make it too dark to see - perhaps if there was a way to illuminate the path?", 'items': 'none'},
        'cabin': {'name': 'an old cabin', 'exits': {'north'}, 'north': 'forest', 'text': 'Inside you see old bottles, rotting furniture and various '
                                                                                               'papers strewn across the floor.'},
        'hill': {'name': 'a hill', 'exits': {'north'}, 'south': 'meadow', 'north': 'town', 'text': 'The hilltop rewards you with an unobstructed view of your surroundings.'},
        'town': {'name': 'a town', 'exits': {'north','south','east'}, 'south': 'hill', 'north': 'mountain', 'east': 'plains', 'text': ''}
        }

    directions = {'north', 'south', 'west', 'east'}

    currentRoom = rooms['meadow']

    inventory = []




class Character:

    def __init__(self, name = "unknown", build = "", level = 1, health = 0, attk = 0, defense = 0, evade = 0):
        self.name = name
        self.build = build
        self.level = level
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

    @property
    def level(self):
        return self.__level

    @level.setter
    def level(self, level):
        self.__level = level


    # attack, block and evade methods

    def attack(self):
        # Randomly calculate the attack amount
        # random() returns a value from 0.0 to 1.0
        attkAmt = self.attk * (random.random() + .5)

        return attkAmt

    def block(self):
        # Randomly calculate how much of the attack was blocked
        blockAmt = self.defense * (random.random() + .5)

        return blockAmt

    def dodge(self):
        # scale player evasion and turn into percentage chance of evasion
        dex = self.evade*5
        difficulty = random.randint(0,100)
        if dex >= difficulty:
            return True
        else:
            return False



    def __str__(self):
        return "Name: {}\n" \
               "Class: {}\n" \
               "Level: {}\n" \
               "Health: {}\n" \
               "Attack: {}\n" \
               "Defense: {}\n" \
               "Evasion: {}".format(self.name,self.build,self.level, self.health,self.attk,self.defense,self.evade)


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
        Character.__init__(self, name= "Spider", build = "Monster", health= 12, attk = 4, defense = 3, evade = 1)

class Bandit(Character):

    def __init__(self):
        Character.__init__(self, name= "Bandit", build = "Monster", health =6, attk = 4, defense = 2, evade = 2)


