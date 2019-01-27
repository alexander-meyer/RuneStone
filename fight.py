import math
from data import Rogue, Mage, Paladin, Spider, Bandit


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

        print("{} attacks {} and deals {} damage".format(charA.name,
                                                         charB.name, damage2CharB))

        print("{} is down to {} health".format(charB.name,
                                               charB.health))

        if charB.health <= 0:
            print("{} has Died and {} is Victorious".format(charB.name,
                                                            charA.name))

            return "Game Over"
        else:
            return "Fight Again"

def main():

    print
    print("Fleeing down the road, the hooded figure finds himself set upon by a monstrous arachnid.")
    marty = Rogue()
    marty.name = "marty"
    spidah = Spider()
    print
    print(marty)
    print
    print(spidah)
    print

    battle = Battle()

    battle.startFight(marty,spidah)
    print




main()

