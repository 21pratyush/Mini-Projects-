document.addEventListener("DOMContentLoaded", function () {
    const minRange = 1;
    const maxRange = 100;
    let targetNumber;
    let attempts = 0;

    const minRangeElement = document.getElementById("min-range");
    const maxRangeElement = document.getElementById("max-range");
    const guessInput = document.getElementById("guess-input");
    const guessButton = document.getElementById("guess-button");
    const messageElement = document.getElementById("message");
    const playAgainButton = document.getElementById("play-again");

    function generateRandomNumber() {
        return Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    }

    function showMessage(message, color) {
        messageElement.textContent = message;
        messageElement.style.color = color;
    }

    function playAgain() {
        targetNumber = generateRandomNumber();
        attempts = 0;
        guessInput.value = "";
        messageElement.textContent = "";
        messageElement.style.color = "#007bff";
        playAgainButton.style.display = "none";
        guessButton.style.display = "block";
    }

    targetNumber = generateRandomNumber();
    minRangeElement.textContent = minRange;
    maxRangeElement.textContent = maxRange;

    guessButton.addEventListener("click", function () {
        const guess = parseInt(guessInput.value);

        if (!isNaN(guess)) {
            attempts++;
            if (guess === targetNumber) {
                showMessage(`Congratulations! You guessed the number ${targetNumber} in ${attempts} attempts.`, "#28a745");
                playAgainButton.style.display = "block";
                guessButton.style.display = "none";
            } else if (guess < targetNumber) {
                showMessage("Try a higher number.", "#ffc107");
            } else {
                showMessage("Try a lower number.", "#ffc107");
            }
        } else {
            showMessage("Please enter a valid number.", "#dc3545");
        }
    });

    playAgainButton.addEventListener("click", playAgain);

    playAgain();
});
