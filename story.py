import random, math

#      #
# DATA #
#      #


# Rooms are arranged grid style (as in old-school handheld Zelda games)
rooms = {
    'meadow': {'name': 'meadow', 'description': 'find yourself in a meadow', 'exits': {'north', 'west', 'east'},
               'north': 'hill', 'west': 'forest',
               'east': 'river', 'text': "A gentle breeze blows through, causing the grass to dance and sway.", },
    'river': {'name': 'river', 'description': 'come to the bank a river', 'exits': {'west'},
              'west': 'meadow', 'text': "The water looks cool and pleasant.", 'item': 'Amethyst ring', 'event': 'swim'},
    'forest': {'name': 'forest', 'description': 'stand at the entrance to a forest', 'exits': {'east'}, 'event': 'illuminate',
               'east': 'meadow', 'text': "Looming pines make it too dark to see - perhaps if there was a way to illuminate the path?",
               'items': 'none'},
    'cabin': {'name': 'cabin', 'description': 'stumble upon an old cabin', 'exits': {'north'}, 'north': 'forest',
              'text': "Inside you see old bottles, rotting furniture and various papers strewn across the floor."},
    'hill': {'name': 'hill', 'description': 'reach the top of a small hill', 'exits': {'north', 'south'}, 'south': 'meadow',
             'north': 'road', 'text': "The land stretches out for leagues ahead of you. A mountain looms in the horizon, dark and foreboding."},
    'road': {'name': 'road', 'description': 'arrive at a cobblestone road', 'exits': {'north', 'south'}, 'north': 'town', 'south': 'hill',
             'text': 'The path is well worn, telling of countless travelers before you.','event': 'fight', 'enemies': 1 },
    'town': {'name': 'town', 'description': 'come to a bustling town', 'exits': {'north', 'south', 'east'},
             'south': 'road', 'north': 'mountain', 'east': 'plains',
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

    # Restore method to be used by subclasses
    def restore(self):
        raise NotImplementedError("Hasn't been implemented!")



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

    def restore(self):
        self.health = 16

class Mage(Character):
    def __init__(self):
        Character.__init__(self,name = "", build = "Mage", health = 12, attk = 9, defense = 2, evade = 2)

    def restore(self):
        self.health = 12

class Warrior(Character):
    def __init__(self):
        Character.__init__(self,name = "", build = "Warrior", health = 19, attk = 6, defense = 6, evade = 1)

    def restore(self):
        self.health = 19

# Enemy classes
class Spider(Character):

    def __init__(self):
        Character.__init__(self, name= "Spider", build = "Enemy", health = 12, attk = 4, defense = 3, evade = 1)

class Bandit(Character):

    def __init__(self):
        Character.__init__(self, name= "Bandit", build = "Enemy", health = 10, attk = 6, defense = 3, evade = 2)

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

    if not prevRoom:
        print("\nNowhere to go back to.\n")
    else:
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

def badCommand():

    print("\nUnsure what you mean.\n")


# A series of if/elif paths to capture various user commands
def getCommand(Character):

    print()
    command = input("What do you do?\n\n> ")
    command = command.strip().lower()

    # MOVEMENT

    # If user enters east/west/etc. directly
    if command in currentRoom['exits']:
        updateRoom(command)

    # If they enter room name directly
    elif command in rooms:
        updateRoom(command)

    # back/go back
    elif "back" in command:
        goBack()

    # Go ____
    elif "go" in command:
        goInCommand(command)


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
        print("\nTry entering basic instructions: look, go, check, etc.\n")


    # QUIT

    elif command in ("q", "quit", "end", "stop"):
        print("\nFarewell, hero.\n")


    # SURROUNDINGS

    elif command in ("look", "look around", "check nearby","nearby", "check surroundings", "surroundings","check area", "area"):
        print()
        for direction in currentRoom['exits']:
            nextRoom = currentRoom[direction]
            print("To your {} lies a {}.".format(direction, nextRoom))
        print()


    # STATUS

    elif command in ("check health", "check status", "status","health"):
        print()
        print(Character)


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
            Character.restore()
        else:
            badCommand()


    # Swimming event, finding amethyst ring
    elif command in ("swim","dive in","swimming","for a swim","in river", "jump in"):
        if currentRoom == rooms['river']:
            print("\n{}\n\n".format(events['swim']['text']))
            global inventory
            if not 'Amethyst Ring' in inventory:
                print("Something shiny catches your eye on the riverbed.\n\n * Amethyst Ring added to inventory *\n")
                inventory.append('Amethyst Ring')
        else:
            badCommand()



    # MISC

    elif "smoke" in command:
        print("\nAlas. You're all out.\n")

    elif "dance" in command:
        print("\nLeaping about, you let your rhythm burst out in frenzied dance. Nothing happens, but you feel great.")


    # BAD COMMAND

    else:
        badCommand()


    # format
    print()
    print(".\n.\n.\n\n")



#       #
# FIGHT #
#       #


class Battle:

    def startFight(self, player, char2):


        while True:
            if self.getAttackResult(player, char2) == "Over":
                print("Victorious!")
                break

            if self.getAttackResult(char2, player) == "Over":
                print("Game Over!")
                break


    # Make this method static because we don't need to use self
    @staticmethod
    def getAttackResult(charA, charB):

        # check to see if dodge
        if charB.dodge():
            print("{} attacks {}... {} dodges!".format(charA.name,charB.name, charB.name))
        # else calculate damage
        else:
            damage = math.ceil(charA.attack() - charB.block())
            if damage < 0: damage = 0
            print("{} attacks {} and deals {} damage".format(charA.name,charB.name, damage))
            charB.health = charB.health - damage
            if charB.health < 0: charB.health = 0
        # current status
        print("{} is down to {} health".format(charB.name,
                                               charB.health))

        if charB.health <= 0:
            return "Over"
        else:
            return "Again"



#       #
# STORY #
#       #

class Story:
    print("\n   _____________________________________________________________________________________")
    print("  | rrrrrr    u     u   n     n   eeeeee    ssss   ttttttt   ooooo    n     n   eeeeee  |           ")
    print("  | r     r   u     u   n n   n   e        s          t     o     o   n n   n   e       |           ")
    print("  | rrrrrr    u     u   n  n  n   eeeeee    sss       t     o     o   n  n  n   eeeeee  |           ")
    print("  | r    r    u     u   n   n n   e            s      t     o     o   n   n n   e       |              ")
    print("  | r     r    uuuuu    n     n   eeeeee   ssss       t      ooooo    n     n   eeeeee  |          ")
    print("  |_____________________________________________________________________________________|        ")


    print("\n\n *\n *\n *\n")

    # Character selection
    while True:
        print()
        choice = input("Who are you? (type 'info' for stats)\n\n"
                       "'w' ––> Warrior\n'r' ––> Rogue\n'm' ––> Mage\n\n> ")

        # Initialize 'player' object with appropriate choice
        if choice == "r":
            player = Rogue()
            break
        elif choice == "m":
            player = Mage()
            break
        elif choice == "w":
            player = Warrior()
            break

        elif choice == "info":
            print("\n\nWarrior: strong and tough, you have trained yourself well to survive hardship. Well-balanced in attack and defense.\n"
                      "Mage:    harnessing an ancient power, your spells overwhelm those in your path. Powerful attack with weaker defense.\n"
                      "Rogue:   smooth as a whisper, your stealth lets you strike before enemies know what hit them. Good strength and evasion.\n")

        else:
            print("\nNot sure what you mean - pick one of the selected options.\n")


    # Take user name and set for player object
    print()
    player.name = input("Your name?\n\n> ")
    # global status
    # status = player
    print()

    print("\nEnter commands to interact with the world (type 'help' for some hints)\n\n\n*\n*\n*\n\n")

    # Formatting


    # The story begins..
    while True:
        print("You {}.".format(currentRoom['description']))
        print(currentRoom['text'])
        print()

        # Check for event occurance
        if 'event' in currentRoom:
            if currentRoom['event'] == 'fight' and currentRoom['enemies'] > 0:
                currentRoom['enemies'] -= 1
                battle = Battle()
                bandit = Bandit()
                battle.startFight(player,bandit)

        # Get user commands
        getCommand(player)



def main():
    Story()

if __name__ == '__main__':
    main()