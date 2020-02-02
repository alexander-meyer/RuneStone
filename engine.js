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
// .text   <-- overwrites current text


function appendTextAndScroll(text) {
    $('#game-text')
        .append(text)
        .animate({ scrollTop: (gameText).prop("scrollHeight") - gameText.height() }, 250);
}

function help() {
    appendTextAndScroll('Basic commands include \'room\', \'go ____\' and \'inventory\', though rooms may respond to other prompts...<br/><br/>')
}

// takes user input and returns first matching element found in a target array
function findValidCommand(userInput, targetArray) {
    for (const word of userInput) {
        if (targetArray.includes(word)) {
            return word;
        }
    }
    return 'none';
}