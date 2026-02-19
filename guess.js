"use strict";

// global variables 
let randomNum = 0;
let tries = 0;


//dom references
const history = document.getElementById("history");
const messageREF = document.getElementById("message");
const bestScore = document.getElementById("best_score");
// helper function
const getRandomInt = (max = 100) => {
    let num = Math.random() * max;  // get a random number between 0 and max
    num = Math.ceil(num);           // round up to nearest integer
    return num;
};

// event handler functions
const guessClick = () => {
    const guess = parseInt(document.querySelector("#number").value);
    let color = "";
    let message = "";
    if (isNaN(guess)) {
        message = "Not a valid number. Please enter a valid number."
        return;
    } else if (guess < 1 || guess > 100) {
        message = "Invalid number. Enter a number between 1 and 100.";
        return;
    }
    let distance = Math.abs(guess - randomNum);
    switch(true){
        case (distance === 0):
            const lastWord = (tries === 1) ? "try" : "tries";
            message = `Fire! You guessed it in ${tries} ${lastWord}!`;
            color = 'green';
            updatedBestScore(tries);
            break;
        case (distance <= 5):
            console.log("hot");
            message = "Hot! (Within 5)";
            color = "red";
            break;
        case (distance <= 10):
            console.log("warmer");
            message = "Warmer (Within 10)";
            color = "orangered";
            break;
        case (distance <= 20):
            console.log("warm");
            message = "Warm (Within 20)";
            color = "orange";
            break;
        case (distance <= 30):
            console.log("cold");
            message = "Cold (Within 30)";
            color = "lightblue";
            break;
        case (distance <= 40):
            console.log("colder");
            message = "Colder (Within 40)";
            color = "blue";
            break;
        case (distance <= 50):
            console.log("freezing");
            message = "Freezing (Way off)";
            color = "darkblue";
            break;

    }
    tries += 1;
    history.innerHTML += `Guess ${tries}; ${guess} - ${message}<br>`;
    messageREF.textContent = message;
    messageREF.style.color = color;
};
function updatedBestScore(tries){
    if (bestScore.textContent == "--"){
        bestScore.textContent = tries;
    } else  {
        if (bestScore.value > tries){
            bestScore.textContent = tries;
        }
    }
}
const playAgainClick = () => {
    randomNum = getRandomInt();
    tries = 0;
    document.querySelector("#number").value = "";
    document.querySelector("#message").textContent = "";
};

document.addEventListener("DOMContentLoaded", () => {
    playAgainClick(); // initial a new game

    document.querySelector("#guess").addEventListener("click", guessClick);
    document.querySelector("#play_again").addEventListener("click", playAgainClick);
});