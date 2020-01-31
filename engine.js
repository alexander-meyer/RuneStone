const gameText = $('#game-text');
const userInput = $('#user-input');

$(document).ready(function () {
    const game = new Game($('#game-text'));
    game.setUpWorld();

    $(document).keypress(function (key) {
        if ((key.which === 13) && userInput.is(':focus')) {
            var value = userInput.val();
            userInput.val('> ');
            game.parseInput(value);
        };
    })
})
// .text   <-- overwrites current text


function appendText(text) {
    $('#game-text')
        .append(text)
        .animate({ scrollTop: (gameText).prop("scrollHeight") - gameText.height() }, 300);
}

function help() {
    appendText('Basic commands include \'look\', \'go ____\' and \'inventory\', though rooms may respond to other actions...<br/><br/>')
}

// takes user input and returns first matching element found in a target array
function checkForValidMove(userInput, targetArray) {
    for (const word of userInput) {
        if (targetArray.includes(word)) {
            return word;
        }
    }
    return 'none';
}

function checkForEvent(parsedInput) {

}