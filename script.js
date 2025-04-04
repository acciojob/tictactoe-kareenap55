let player1, player2, currentPlayer;
const cells = document.querySelectorAll(".cell");
const board = document.getElementById("board");
const message = document.querySelector(".message");
const submitButton = document.getElementById("submit");

// New Restart Button
const restartButton = document.createElement("button");
restartButton.innerText = "Restart Game";
restartButton.style.display = "none";
document.body.appendChild(restartButton);

submitButton.addEventListener("click", function() {
    player1 = document.getElementById("player-1").value;
    player2 = document.getElementById("player-2").value;
    
    if (player1.trim() && player2.trim()) {
        document.getElementById("player-input").style.display = "none";
        board.style.display = "grid";
        currentPlayer = player1;
        message.innerText = `${currentPlayer}, you're up!`;
    } else {
        alert("Please enter names for both players!");
    }
});

const winPatterns = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
    [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
    [1, 5, 9], [3, 5, 7]             // Diagonals
];

function checkWin() {
    const symbol = currentPlayer === player1 ? "X" : "O";
    return winPatterns.some(pattern => {
        return pattern.every(id => document.getElementById(id).innerText === symbol);
    });
}

function checkDraw() {
    return [...cells].every(cell => cell.innerText !== "");
}

function handleClick(event) {
    if (event.target.innerText === "") {
        event.target.innerText = currentPlayer === player1 ? "X" : "O";

        if (checkWin()) {
            message.innerText = `${currentPlayer} congratulations, you won! 🎉`;
            cells.forEach(cell => cell.removeEventListener("click", handleClick));
            restartButton.style.display = "block";
            return;
        }

        if (checkDraw()) {
            message.innerText = "It's a draw! 😲";
            restartButton.style.display = "block";
            return;
        }

        currentPlayer = currentPlayer === player1 ? player2 : player1;
        message.innerText = `${currentPlayer}, you're up!`;
    }
}

// Restart game function
restartButton.addEventListener("click", () => {
    cells.forEach(cell => {
        cell.innerText = "";
        cell.addEventListener("click", handleClick);
    });

    document.getElementById("player-input").style.display = "block";
    board.style.display = "none";
    restartButton.style.display = "none";
    message.innerText = "";
});

cells.forEach(cell => cell.addEventListener("click", handleClick));


