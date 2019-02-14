import math, random



class Battle:

    def startFight(self, player, char2):


        while True:
            if self.getAttackResult(player, char2) == "Over":
                print("Victorious!")
                break

            if self.getAttackResult(char2, player) == "Over":
                print("Game Over")
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

class Warrior(Character):
    def __init__(self):
        Character.__init__(self,name = "", build = "Warrior", health = 19, attk = 6, defense = 6, evade = 1)


# Enemy classes
class Spider(Character):

    def __init__(self):
        Character.__init__(self, name= "Spider", build = "Enemy", health = 15, attk = 8, defense = 3, evade = 1)

class Bandit(Character):

    def __init__(self):
        Character.__init__(self, name= "Bandit", build = "Enemy", health = 6, attk = 4, defense = 2, evade = 2)

class Sorcerer(Character):

    def __init__(self):
        Character.__init__(self, name="Sorcerer", build= "Enemy", health = 6, attk = 4, defense = 2, evade = 2)


def main():

    print("\nFleeing down the road, the hooded figure finds himself set upon by a monstrous arachnid.")
    marty = Rogue()
    marty.name = "marty"
    spidah = Spider()
    print()
    print(marty)
    print()
    print(spidah)
    print()

    battle = Battle()

    battle.startFight(marty,spidah)
    print()




main()

