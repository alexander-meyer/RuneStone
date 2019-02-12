import random, math

#      #
# DATA #
#      #


# Rooms are arranged grid style (as in old-school handheld Zelda games)
rooms = {
    'meadow': {'name': 'meadow', 'description': 'find yourself in a meadow', 'exits': {'north', 'west', 'east'},
               'north': 'hill', 'west': 'forest',
               'east': 'river', 'text': "A gentle breeze blows through, causing the grass to dance and sway." },
    'river': {'name': 'river', 'description': 'come to the edge a river', 'exits': {'west'},
              'west': 'meadow', 'text': "The water looks cool and pleasant.", 'item': 'Amethyst ring', 'event': 'swim'},
    'forest': {'name': 'forest', 'description': 'come to a foreboding forest', 'exits': {'east'}, 'event': 'illuminate',
               'east': 'meadow',
               'text': "Looming pines make it too dark to see - perhaps if there was a way to illuminate the path?",
               'items': 'none'},
    'cabin': {'name': 'cabin', 'description': 'stumble upon an old cabin', 'exits': {'north'}, 'north': 'forest',
              'text': "Inside you see old bottles, rotting furniture and various papers strewn across the floor."},
    'hill': {'name': 'hill', 'description': 'reach the top of a small hill', 'exits': {'north', 'south'}, 'south': 'meadow',
             'north': 'town',
             'text': "The land stretches out for leagues ahead of you. A mountain looms in the horizon, dark and foreboding."},
    'town': {'name': 'town', 'description': 'arrive at a bustling town', 'exits': {'north', 'south', 'east'},
             'south': 'hill', 'north': 'mountain', 'east': 'plains',
             'text': 'A bell rings in the distance, barely discernible amidst the market bustle.'},
    'plains': {'name': 'plains'}
}

events = {
    'rest': {'text':'You lay down for a quick nap... All your hurts appear to have vanished!'},
    'swim': {'text':'Casting clothes aside, you dive into the river. A school of fish scatters, startled by your sudden entrance.'}
}



# Acceptable inputs for 'go ____' command
directions = ('north', 'south', 'west', 'east')

# Keep track of current room (game begins in 'meadow')
currentRoom = rooms['meadow']

# GLOBAL VAR

# For the 'go back' command, keep track of previous room
prevRoom = None
# For the 'check status' command, made global since 'player' object not in scope of getCommand
status = None
# Player inventory, accessible with 'check bag' command
inventory = []

# Print inventory
def displayInventory():
    print()
    if not inventory:
        print("*you rummage around in your bag*\nNothing there.")
    else:
        print(inventory)
    print()



# Character object
class Character:

    def __init__(self, name = "", build = "", health = 0, attk = 0, defense = 0, evade = 0, ):
        self.name = name
        self.build = build
        self.health = health
        self.attk = attk
        self.defense = defense
        self.evade = evade

    # Get and set name
    @property
    def name(self):
        return self.__name
    @name.setter
    def name(self,name):
        self.__name = name

    # Set name method
    def setName(self):
        self.name = input("What is your name?\n")

    # Get and set build
    @property
    def build(self):
        return self.__build
    @build.setter
    def build(self, build):
        self.__build = build

    # Get and set health
    @property
    def health(self):
        return self.__health
    @health.setter
    def health(self, health):
        self.__health = health

    # Get and set attack
    @property
    def attk(self):
        return self.__attk
    @attk.setter
    def attk(self, attk):
        self.__attk = attk

    # Get and set defense
    @property
    def defense(self):
        return self.__defense
    @defense.setter
    def defense(self, defense):
        self.__defense = defense

    # Get and set evade
    @property
    def evade(self):
        return self.__evade
    @evade.setter
    def evade(self, evade):
        self.__evade = evade


    # Fight methods
    # Randomly calculate attack amount
    def attack(self):
        attkAmt = self.attk * (random.random() + .5)
        return attkAmt

    # Randomly calculate how much of the attack was blocked
    def block(self):
        blockAmt = self.defense * (random.random() + .5)
        return blockAmt

    # Use 'evasion' stat to determine percentage chance of dodging hit
    def dodge(self):
        # scale 'evasion' stat (arbitrarily)
        dex = self.evade*5
        # determine percentage chance of evasion
        return dex >= random.randint(0,100)



    # toString method
    def __str__(self):
        return "Name: {}\n" \
               "Class: {}\n" \
               "Health: {}\n" \
               "Attack: {}\n" \
               "Defense: {}\n" \
               "Evasion: {}".format(self.name,self.build,self.health,self.attk,self.defense,self.evade)


# Player classes
class Rogue(Character):
    def __init__(self):
        Character.__init__(self,name = "", build = "Rogue", health = 16, attk = 7, defense = 3, evade = 3)

class Mage(Character):
    def __init__(self):
        Character.__init__(self,name = "", build = "Mage", health = 12, attk = 9, defense = 2, evade = 2)

class Paladin(Character):
    def __init__(self):
        Character.__init__(self,name = "", build = "Paladin", health = 19, attk = 6, defense = 6, evade = 1)


# Enemy classes
class Spider(Character):

    def __init__(self):
        Character.__init__(self, name= "Spider", build = "Enemy", health = 12, attk = 4, defense = 3, evade = 1)

class Bandit(Character):

    def __init__(self):
        Character.__init__(self, name= "Bandit", build = "Enemy", health = 6, attk = 4, defense = 2, evade = 2)

class Sorcerer(Character):

    def __init__(self):
        Character.__init__(self, name="Sorcerer", build= "Enemy", health = 6, attk = 4, defense = 2, evade = 2)



#       #
# INPUT #
#       #


def updateRoom(input):

    global prevRoom
    global currentRoom
    prevRoom = currentRoom

    if input in directions:
        currentRoom = rooms[currentRoom[input]]
    else:
        currentRoom = rooms[input]

def goBack():
    global prevRoom
    global currentRoom
    currentRoom, prevRoom = prevRoom, currentRoom

# Given the various possibilities for 'go' (go, go back, go to ___), a separate method is defined here
def goInCommand(command):

    # Split input into array
    commands = command.split()

    # User just types go -> prompt further
    if len(commands) == 1:
        getCommand(input("\nGo where?\n"))
    # Else split array and analyze
    else:
        # Take second word in command
        if commands[1] in currentRoom['exits']:
            updateRoom(commands[1])
        else:
            print("\nYou can't go there.\n")


# A series of if/elif paths to capture various user commands
def getCommand(command):


    # MOVEMENT

    # If user enters east/west/etc. directly
    if command in currentRoom['exits']:
        updateRoom(command)

    # If they enter room name directly
    if command in rooms:
        updateRoom(command)

    # Go ____
    elif "go" in command:
        goInCommand(command)

    elif "back" in command:
        goBack()

    elif "walk" in command:
        commands = command.split()
        if len(commands) == 1:
            getCommand(input("\nWalk where?\n"))
        elif commands[1] in currentRoom['exits']:
            updateRoom(commands[1])
        else:
            print("\nYou can't go there.\n")


    # HELP

    elif "help" in command:
        print("Try entering basic instructions: look, go, check, etc.\n")


    # QUIT

    elif command in ("q", "quit", "end", "stop"):
        print("\nFarewell, hero.\n")


    # SURROUNDINGS

    elif command in ("look", "look around", "check nearby","nearby", "check surroundings", "surroundings","check area", "area"):
        print()
        for direction in currentRoom['exits']:
            nextRoom = currentRoom[direction]
            print("To your {} lies a {}.".format(direction, nextRoom))
        print('\n')


    # STATUS

    elif command in ("check health", "check status", "status","health"):
        print()
        global status
        print(status)
        print()


    # BAG

    elif command in ("bag","check bag","inventory","check inventory"):
        displayInventory()


    # CHECK

    elif "check" in command:
        newInput = input("\nCheck what? (bag, surroundings, status)\n")
        getCommand(newInput)


    # EVENTS

    # Sleep/rest command for starting room. Meadow acts as HP restoration point
    elif command in ("sleep", "lie down", "lay down", "rest", "to sleep", "take a nap", "nap"):
        if currentRoom == rooms['meadow']:
            print("\n{}\n\n".format(events['rest']['text']))

    # Swimming event, finding amethyst ring
    elif command in ("swim","dive in","swimming","for a swim","in river", "jump in"):
        if currentRoom == rooms['river']:
            print("\n{}\n\n".format(events['swim']['text']))
        global inventory
        if not 'Amethyst Ring' in inventory:
            print("Something shiny catches your eye on the riverbed.\n\n * Amethyst Ring added to inventory *\n")
            inventory.append('Amethyst Ring')

    # MISC

    elif "smoke" in command:
        print("\nAlas. You're all out.\n")

    # BAD COMMAND

    else:
        print("\nUnsure what you mean.\n")





#       #
# FIGHT #
#       #


class Battle:

    def startFight(self, char1, char2):


        while True:
            if self.getAttackResult(char1, char2) == "Game Over":
                print("Game Over")
                break

            if self.getAttackResult(char2, char1) == "Game Over":
                print("Game Over")
                break


    # Make this method static because we don't need to use self

    @staticmethod
    def getAttackResult(charA, charB):
        charADamage = charA.attack()

        charBBlockAmt = charB.block()

        damage2CharB = math.ceil(charADamage - charBBlockAmt)

        charB.health = charB.health - damage2CharB

        print("{} attacks {} and deals {} damage".format(charA.name, charB.name, damage2CharB))

        print("{} is down to {} health".format(charB.name, charB.health))

        if charB.health <= 0:
            print("{} has Died and {} is Victorious".format(charB.name, charA.name))

            return "Game Over"
        else:
            return "Fight Again"



# STORY #
#       #
#       #

class Story:
    print("\n   _____________________________________________________________________________________")
    print("  | rrrrrr    u     u   n     n   eeeeee    ssss   ttttttt   ooooo    n     n   eeeeee  |  ")
    print("  | r     r   u     u   n n   n   e        s          t     o     o   n n   n   e       |  ")
    print("  | rrrrrr    u     u   n  n  n   eeeeee    sss       t     o     o   n  n  n   eeeeee  |  ")
    print("  | r    r    u     u   n   n n   e            s      t     o     o   n   n n   e       |  ")
    print("  | r     r    uuuuu    n     n   eeeeee   ssss       t      ooooo    n     n   eeeeee  |  ")
    print("  |_____________________________________________________________________________________|  ")


    print("\n\n *\n *\n *\n")

    # Character selection
    while True:
        print()
        choice = input("What type of character are you?\n"
                       "(type 'p' for paladin, 'r' for rogue, 'm' for mage or 'info' for stats)\n\n"
                       "> ")

        # Initialize 'player' object with appropriate choice
        if choice == "r":
            player = Rogue()
            break
        elif choice == "m":
            player = Mage()
            break
        elif choice == "p":
            player = Paladin()
            break

        elif choice == "info":
            print("\n *  *  *  Base Character Profiles  *  *  *\n")
            rogue = Rogue()
            paladin = Paladin()
            mage = Mage()
            print(rogue.__str__() + "\n\n" + paladin.__str__() + "\n\n" + mage.__str__() + "\n\n" + " *  *  *" + "\n")

        else:
            print("\nNot sure what you mean - pick one of the selected options.\n")


    # Take user name and set for player object
    print()
    player.name = input("What is your name?\n\n> ")
    global status
    status = player
    print()

    print("\nEnter commands to interact with the world. Type 'help' if you're ever stuck.\n\n\n*\n*\n*\n\n")

    # Formatting


    # The story begins..
    while True:
        print("You {}.".format(currentRoom['description']))
        print(currentRoom['text'])
        print()

        # Get user commands
        print()
        command = input("What do you do?\n\n> ")
        command = command.strip().lower()
        getCommand(command)
        print()
        print(".\n.\n.\n")


def main():

    Story()


main()