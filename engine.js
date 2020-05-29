const gameText = $('#game-text');
const userInput = $('#user-input');

$(document).ready(function () {

    const startScreen = document.getElementById("start-screen");
    startScreen.insertAdjacentHTML("afterbegin", infoScreen);

    const title = document.getElementById("title");
    const buttonContainer = document.getElementById("button-container");

    $(title).fadeIn(2000,
        function () {
            $(startScreen).fadeIn(3200,
                function () {
                    $(buttonContainer).fadeIn(2500);
                }
            );
        }
    )


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

function startGame() {
    const title = document.getElementById("title");
    const startScreen = document.getElementById("start-screen");
    const gameScreen = document.getElementById("game-window");

    $(document.body).fadeOut(1500,
        function () {
            title.style.display = "none";
            startScreen.textContent = "Best of luck to you, adventurer..."
            $(document.body).fadeIn(2000,
                function () {
                    $(startScreen).fadeOut(3500,
                        function () {
                            $(gameScreen).fadeIn(2000)
                        })
                }
            )
        }
    );
}

function appendTextAndScroll(text) {
    $('#game-text')
        .append(text)
        .animate({ scrollTop: (gameText).prop("scrollHeight") - gameText.height() }, 250);
}

function help() {
    appendTextAndScroll(infoScreen)
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