//your JS code here. If required.
let player1, player2, currentPlayer;
const cells = document.querySelectorAll(".cell");
const board = document.getElementById("board");
const message = document.querySelector(".message");
const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", function() {
    player1 = document.getElementById("player-1").value;
    player2 = document.getElementById("player-2").value;
    if (player1 && player2) {
        document.getElementById("player-input").style.display = "none";
        board.style.display = "grid";
        currentPlayer = player1;
        message.innerText = `${currentPlayer}, you're up!`;
    }
});

const winPatterns = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]
];

function checkWin() {
    const symbol = currentPlayer === player1 ? "X" : "O";
    return winPatterns.some(pattern => {
        return pattern.every(id => document.getElementById(id).innerText === symbol);
    });
}

function handleClick(event) {
    if (event.target.innerText === "") {
        event.target.innerText = currentPlayer === player1 ? "X" : "O";
        if (checkWin()) {
            message.innerText = `${currentPlayer} congratulations you won!`;
            cells.forEach(cell => cell.removeEventListener("click", handleClick));
            return;
        }
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        message.innerText = `${currentPlayer}, you're up!`;
    }
}

cells.forEach(cell => cell.addEventListener("click", handleClick));

