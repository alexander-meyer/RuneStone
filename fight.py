import math
from story import Spider, Rogue



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

            return "Over"
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

