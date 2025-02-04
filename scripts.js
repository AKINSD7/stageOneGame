const colorBox = document.querySelector(".color-name");
const colorOptions = document.querySelectorAll(".square");
const gameStatus = document.getElementById("game-status");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("new-game");

let targetColor;
let score = 0;

// Generating random hex color
function randomColor() {
    const hex = Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    return `#${hex}`;
}

// slightly adjusting the hex value 
function generateSimilarColors(correctColor) {
    function adjustHex(color) {
        let num = parseInt(color.slice(1), 16); // Convert hex to integer
        let variation = Math.floor(Math.random() * 5000) - 2500; // Small variation
        let newColor = Math.max(0, Math.min(0xFFFFFF, num + variation)).toString(16);
        return `#${newColor.padStart(6, "0")}`; // Ensure 6-digit format
    }

    return Array.from({ length: 5 }, () => adjustHex(correctColor));
}

// Start a new game round
function startGame() {
    targetColor = randomColor();
    colorBox.textContent = targetColor; // guessing color
    colorBox.style.backgroundColor = targetColor;
    gameStatus.textContent = "kindly pick the correct color!";
    
    let options = generateSimilarColors(targetColor);
    const correctIndex = Math.floor(Math.random() * 6);
    options.splice(correctIndex, 0, targetColor); // Insert correct color randomly

    // Assign colors to buttons
    colorOptions.forEach((button, index) => {
        if (options[index]) {
            button.style.backgroundColor = options[index];
            button.onclick = () => checkAnswer(options[index]);
        }
    });
}

// Check if the selected color is correct
function checkAnswer(selectedColor) {
    if (selectedColor === targetColor) {
        gameStatus.textContent = "Correct! 🎉";
        score++;
        scoreDisplay.textContent = `SCORE: ${score}`;
    } else {
        gameStatus.textContent = "Wrong! ❌ Try Again";
    }
}

// Start a new game when clicking the button
newGameButton.addEventListener("click", startGame);

// Load the game on startup
startGame();
