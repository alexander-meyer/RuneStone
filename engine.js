const gameText = $('#game-text');
const userInput = $('#user-input');

$(document).ready(function () {
    const game = new Game($('#game-text'));
    game.setUpWorld();

    $(document).keypress(function (key) {
        if ((key.which === 13) && userInput.is(':focus')) {
            var value = userInput.val();
            userInput.val('');
            game.parseInput(value);
        };
    })
})

function appendTextAndScroll(text) {
    $('#game-text')
        .append(text)
        .animate({ scrollTop: (gameText).prop("scrollHeight") - gameText.height() }, 350);
}

function help() {
    appendTextAndScroll(
        text = `In this game, you traverse rooms and interact with your environment to discover secrets and solve puzzles. Some of the basic commands are:
        <ul>
        <li><b>go</b> : move between rooms</li>
        <li><b>examine</b> : investigate a particular object</li>
        <li><b>bag</b> : check the contents of your inventory</li>
        <li><b>where am i</b> : information about your current location</li>
        </ul>
        Areas may also contain secrets that respond to additional prompts. Type <i>help</i> to bring up this information again. <br/><br/>Best of luck to you, adventurer...<br/><br/>`
    )
}

function isValidCommand(userInput, targetArray) {
    if (!Array.isArray(userInput)) {
        return targetArray.includes(userInput)
    } else {
        for (const word of userInput) {
            console.log(word);
            if (targetArray.includes(word)) {
                return true;
            }
        }
        return false;
    }
}

// takes user input and returns first matching element that also exists in target array
function findValidCommand(userInput, targetArray) {
    for (const word of userInput) {
        if (targetArray.includes(word)) {
            return word;
        }
    }
    return 'none';
}

function badCommand() {
    appendTextAndScroll('not sure what you mean. <br/> <br/>');
}