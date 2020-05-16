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
    appendTextAndScroll('This game involves traversing a variety of areas and interacting with the environment to solve puzzles and explore. The visible exits for each area are listed, though some rooms may respond to other prompts...<br/><br/>')
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