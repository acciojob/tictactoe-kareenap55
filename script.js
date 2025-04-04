const submitBtn = document.getElementById("submit");
const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const playerInputDiv = document.getElementById("playerInput");
const gameBoardDiv = document.getElementById("gameBoard");
const messageDiv = document.getElementById("message");
const boardDiv = document.getElementById("board");

let currentPlayer = "X";
let player1, player2;
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

submitBtn.addEventListener("click", () => {
    player1 = player1Input.value.trim();
    player2 = player2Input.value.trim();

    if (player1 === "" || player2 === "") {
        alert("Please enter both player names");
        return;
    }

    playerInputDiv.classList.add("hidden");
    gameBoardDiv.classList.remove("hidden");
    messageDiv.textContent = `${player1}, you're up!`;

    createBoard();
});

function createBoard() {
    boardDiv.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = i;
        cell.addEventListener("click", handleMove);
        boardDiv.appendChild(cell);
    }
}

function handleMove(event) {
    if (!gameActive) return;
    const cell = event.target;
    const cellIndex = cell.id;

    if (board[cellIndex] !== "") return;

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        messageDiv.textContent = `${currentPlayer === "X" ? player1 : player2} congratulations you won!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    messageDiv.textContent = `${currentPlayer === "X" ? player1 : player2}, you're up!`;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

