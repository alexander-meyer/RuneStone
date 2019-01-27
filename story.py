import data
from data import Rogue,Mage,Paladin


class Adventure:


        # stage for user to select their character
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
                print(rogue.__str__() + "\n")

                paladin = Paladin()
                print(paladin.__str__() + "\n")

                mage = Mage()
                print(mage.__str__() + "\n")
                print()

            else:
                print()
                print("Not sure what you mean - pick one of the selected options.")
                print()

        # initialize 'player' object with appropriate choice
        if choice == "r":
            player = Rogue()
        elif choice == "m":
            player = Mage()
        elif choice == "p":
            player = Paladin()

        # take user name and set for player object
        print()
        name = input("What is your name? ")
        print()
        player.name = name
        print(player)
        print()

        print("\nEnter commands to interact with the world. Type 'help' if you're ever stuck.\n\n")

        # nice formatting
        print(".")
        print(".")
        print(".")
        print("\n")

        # building the world
        world = data.World
        curRoom = world.rooms['meadow']


        # the story begins
        while True:

            print("You {}.".format(curRoom['description']))
            print(curRoom['text'])
            print()

            # options from user input
            command = input("What do you do? \n ".strip()).lower()
            print()

            # movement

            # if they enter east/west/etc. directly
            if command in world.directions:
                world.prevRoom = curRoom
                curRoom = world.rooms[curRoom[command]]

            elif "go" in command:
                commandSplit = command.split()
                direction = commandSplit[1]
                if direction in world.directions:
                    if direction in curRoom:
                        world.prevRoom = curRoom
                        curRoom = world.rooms[curRoom[direction]]
                    else:
                        print("You cant go there.")
                elif "back" in command:
                    tmp = world.prevRoom


            # help
            elif command in "help":
                print("Try entering basic instructions: look, go ____, check, etc.\n")

            # quit
            elif command in ("q","quit","end","stop"):
                print("\nFarewell, hero.\n")
                break

            # look around
            elif command in ("look","look around", "nearby","check surroundings"):
                print()
                for direction in curRoom['exits']:
                    print("To your {} lies a {}.".format(direction, world.rooms[curRoom[direction]]['name']))
                print('\n')

            # 'check' what?
            elif "check" in command:
                response = input("Check what? (bag, surroundings, status) ")
                if response in ("bag"):
                    if world.inventory.__sizeof__() == 0:
                        print("Nothing in your bag!")
                    else:
                        print(world.inventory)
                if response in ("surroundings","area", "nearby"):
                    print()
                    for direction in curRoom['exits']:
                        print("To your {} lies {}.".format(direction, curRoom[direction]))
                    print('\n')
                if response in ("status","health","state"):
                    print(player)

            # bad command
            else:
                print("Unsure what you mean.")

            # nice formatting
            print(".")
            print(".")
            print(".")
            print("\n")



def main():

    adventure = Adventure()

main()