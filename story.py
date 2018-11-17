from char import Mage, Paladin, Rogue, Spider, Bandit

class Adventure:

    def story(self, player):

        while True:
            print("You awake in a field. Rubbing your head is of know use - there's no recollection of how you got here.\n")

            while True:
                choice = input("What will you do?\n"
                           "- a. look around\n"
                           "- b. check bag\n"
                           "- c. check stats\n\n"
                           ">>> ")
                if choice == "b":
                    print()
                    print("No items in bag\n")
                if choice == "c":
                    print()
                    print(player)
                    print()
                if choice == "a":

                    print()


                    while True:
                        choice = input("You stand up, stretching and surveying the surrounding landscape. In front of you lies a hill, "
                                       "while off to your right a winding stream snakes out of the forest behind you.\n"
                                       "- a. climb the hill\n"
                                       "- b. go to stream\n"
                                       "- c. inspect the forest\n\n"
                                       ">>> ")

                        if choice == "a":
                            print()
                            print("Despite its size, the hill grants you unobstructed view for miles around. Off in the distance, you spy what appears to be a small town.")
                            print()
                        if choice == "b":
                            print()
                            print("Upon nearing the stream, you hear snatches of conversation. Drawing near, "
                                  "you see two figures hunched over the riverbank, each holding a long wooden pole.")
                            print()
                        if choice == "c":
                            print()
                            print("The forest looms, tall and foreboding. There is no clear path, and it seems ill-advised to press on.")
                            print()

            break

def main():

    print()
    while True:
        choice = input("Select character class:\n"
                        "- type 'r' for rogue\n"
                        "- type 'm' for mage\n"
                        "- type 'p' for paladin\n"
                        "- type 'info' for stats\n\n"
                        ">>> ")
        if choice == "r" or choice == "m" or choice == "p":
            break
        elif choice == "info":
            print()
            rogue = Rogue()
            print("Starting rogue class \n\n" + rogue.__str__() + "\n")

            print()
            paladin = Paladin()
            print("Starting paladin class \n\n" + paladin.__str__() + "\n")

            print()
            mage = Mage()
            print("Starting mage class \n\n" + mage.__str__() + "\n")
            print()

        else:
            print()
            print("Not sure what you mean - pick one of the selected options.")
            print()

    if choice == "r":
        player = Rogue()
    elif choice == "m":
        player = Mage()
    elif choice == "p":
        player = Paladin()


    print()

    name = input("What is your name? ")
    print()
    player.name = name
    print(player)
    print()

    print(".")
    print(".")
    print(".")

    print("\n")

    adventure = Adventure()

    adventure.story(player)
