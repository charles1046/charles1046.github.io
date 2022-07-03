let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

let guessCount = 1;
let resetButton = null;

const body = document.body;

const i18n = getLangFile();

function getLangFile() {
    let lang = document.documentElement.lang;
    switch (lang){
        case "en": return en;
        case "zh_tw": return zh_tw;
    }
}

function onClick(e) {
    if (e.keyCode === 13) {
        let guessButton = document.getElementById("guessSubmit");
        if (!guessButton.disabled) {
            guessButton.click();
            return;
        }
        if (resetButton != null) {
            resetButton.click();
        }
    }
}
body.addEventListener("keyup", onClick, false);

function checkGuess() {
    var userGuess = Number(guessField.value);
    if (guessCount === 1) {
        guesses.textContent = i18n["You have guessed:"];
    }
    guesses.textContent += userGuess + " ";

    if (userGuess === randomNumber) {
        lastResult.textContent = i18n["Bingo! The answer is ${randomNumber}."].replace("${randomNumber}", randomNumber);
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent = "";
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = i18n["Game Over!"];
        setGameOver();
    } else {
        lastResult.textContent = i18n["Try again!"];
        lastResult.style.backgroundColor = "red";
        if (userGuess < randomNumber) {
            lowOrHi.textContent = i18n["Your guess is too low!"];
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = i18n["Your guess is too high!"];
        }
    }

    guessCount++;
    guessField.value = "";
    guessField.focus();
}
// guessSubmit.addEventListener('click', checkGuess);
function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement("button");
    resetButton.textContent = i18n["Play again"];
    document.body.appendChild(resetButton);
    resetButton.addEventListener("click", resetGame);
}
function resetGame() {
    guessCount = 1;

    var resetParas = document.querySelectorAll(".resultParas p");
    for (var i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = "";
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();

    lastResult.style.backgroundColor = "white";

    randomNumber = Math.floor(Math.random() * 100) + 1;
}
