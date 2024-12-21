document.addEventListener('DOMContentLoaded', () => {
    let randomNumber = generateRandomNumber();
    let attempts = 0;
    const maxAttempts = 3;
    let score = 0;

    function handleGuess() {
        const userInput = document.querySelector('.guess-input').value;
        const userGuess = Number(userInput);
        const feedback = document.querySelector('.feedback');
        const attemptsInfo = document.querySelector('.attempts-info');
        const scoreDisplay = document.querySelector('.score');

        // Ensure the input is valid
        if (userInput === '') {
            feedback.textContent = 'Please enter a number.';
            return;
        }

        attempts++;
        if (attempts <= maxAttempts) {
            if (userGuess > randomNumber) {
                feedback.textContent = 'Too high! Try again.';
            } else if (userGuess < randomNumber) {
                feedback.textContent = 'Too low! Try again.';
            } else {
                feedback.textContent = 'Congratulations! You guessed it right!';
                score += 10; // Increase score on correct guess
                scoreDisplay.textContent = score;
                document.querySelector('.guess-button').disabled = true; // Disable button after correct guess
                return;
            }

            if (attempts === maxAttempts) {
                feedback.textContent = `Game over! The number was ${randomNumber}.`;
                document.querySelector('.guess-button').disabled = true; // Disable button after max attempts
            }
        }

        attemptsInfo.textContent = `Attempts left: ${maxAttempts - attempts}`;
    }

    function generateRandomNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }

    function resetGame() {
        randomNumber = generateRandomNumber();
        attempts = 0;
        document.querySelector('.guess-input').value = '';
        document.querySelector('.feedback').textContent = '';
        document.querySelector('.attempts-info').textContent = `Attempts left: ${maxAttempts}`;
        document.querySelector('.score').textContent = score; // Keep the score the same
        document.querySelector('.guess-button').disabled = false; // Enable button for a new game
    }

    function resetAll() {
        score = 0; // Reset the score
        document.querySelector('.score').textContent = score;
        resetGame();
    }

    document.querySelector('.guess-button').addEventListener('click', handleGuess);
    document.querySelector('.guess-input').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            handleGuess();
        }
    });

    document.querySelector('.reset-button').addEventListener('click', resetAll);

    // Initialize the game
    resetGame();
});
