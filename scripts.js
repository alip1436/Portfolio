
"use strict";


//--- prevent default on forms 
// attach the events handlers
//light and dark mode
document.getElementById("themeToggle").addEventListener("click", function () {
    // Toggle the dark mode class on the body
    document.body.classList.toggle("dark-mode");

    // Handle icon visibility
    const sunIcon = document.getElementById("sunIcon");
    const moonIcon = document.getElementById("moonIcon");

    if (document.body.classList.contains("dark-mode")) {
        sunIcon.style.display = "none";
        moonIcon.style.display = "block";
    } else {
        sunIcon.style.display = "block";
        moonIcon.style.display = "none";
    }
});


// guessing game
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function guessingGame(event) {
    event.preventDefault(); // Prevent form submission

    // Get the elements for display and message
    let displayYourGuess = document.getElementById("yourguess");
    let displayRandomNum = document.getElementById("random");
    let gameMessage = document.getElementById("guessMsg");

    // Generate random number between 1 and 10
    let randomNum = getRandomNumber(1, 10);

    // Get the user's guess from the input field
    let yourGuessNum = parseInt(document.getElementById("yourguessIn").value, 10);

    if (isNaN(yourGuessNum) || yourGuessNum < 1 || yourGuessNum > 10) {
        gameMessage.textContent = "⚠️ Please enter a number between 1 and 10.";
        return; // Exit the function if input is invalid
    }

    // Display the random number and the user's guess
    displayYourGuess.textContent = `Your Guess: ${yourGuessNum}`;
    displayRandomNum.textContent = `My Guess: ${randomNum}`;

    // Compare the guess and show the result
    if (randomNum === yourGuessNum) {
        gameMessage.textContent = "🎉 You guessed right! You win!";
    } else {
        gameMessage.textContent = "❌ Try again, you lose.";
    }
}

// Add event listener for the game button
document.getElementById("gamePlay").addEventListener("click", guessingGame);
