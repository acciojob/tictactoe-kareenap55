//your JS code here. If required.
    const board = document.getElementById("board");
         const message = document.getElementById("message");
         const submitBtn = document.getElementById("submit");
         let player1, player2;
         let currentPlayer;
         let gameBoard = ["", "", "", "", "", "", "", "", ""];
         let gameActive = true;
 
         submitBtn.addEventListener("click", () => {
             player1 = document.getElementById("player-1").value || "Player 1";
             player2 = document.getElementById("player-2").value || "Player 2";
             currentPlayer = player1;
             message.innerText = `${currentPlayer}, you're up!`;
             document.getElementById("player-input").style.display = "none";
             board.style.display = "grid";
             renderBoard();
         });
 
         function renderBoard() {
             board.innerHTML = "";
             gameBoard.forEach((cell, index) => {
                 const cellDiv = document.createElement("div");
                 cellDiv.classList.add("cell");
                 cellDiv.id = index;
                 cellDiv.setAttribute("data-cy", `cell-${index}`);
                 cellDiv.innerText = cell;
                 cellDiv.addEventListener("click", handleMove);
                 board.appendChild(cellDiv);
             });
         }
 
         function handleMove(event) {
             const index = event.target.id;
             if (gameBoard[index] !== "" || !gameActive) return;
             gameBoard[index] = currentPlayer === player1 ? "X" : "O";
             renderBoard();
             checkWinner();
             currentPlayer = currentPlayer === player1 ? player2 : player1;
             if (gameActive) message.innerText = `${currentPlayer}, you're up!`;
         }
 
         function checkWinner() {
             const winPatterns = [
                 [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                 [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                 [0, 4, 8], [2, 4, 6] // Diagonals
             ];
 
             for (const pattern of winPatterns) {
                 const [a, b, c] = pattern;
                 if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                     gameActive = false;
                     message.innerText = `${currentPlayer} congratulations, you won!`;
                     return;
                 }
             }
 
             if (!gameBoard.includes("")) {
                 gameActive = false;
                 message.innerText = "It's a draw!";
             }
         }
 let player1 = "";
 let player2 = "";
 let currentPlayer = "";
 let board = ["", "", "", "", "", "", "", "", ""];
 let gameOver = false;
 
 document.getElementById("submit").addEventListener("click", () => {
     player1 = document.getElementById("player1").value.trim();
     player2 = document.getElementById("player2").value.trim();
 
     if (player1 && player2) {
         document.querySelector(".input-section").classList.add("hidden");
         document.querySelector(".game-section").classList.remove("hidden");
         currentPlayer = player1;
         updateMessage(${currentPlayer}, you're up!);
         createBoard();
     } else {
         alert("Please enter names for both players.");
     }
 });
 
 function createBoard() {
     const boardElement = document.querySelector(".board");
     boardElement.innerHTML = "";
     board = ["", "", "", "", "", "", "", "", ""];
     gameOver = false;
 
     for (let i = 0; i < 9; i++) {
         const cell = document.createElement("div");
         cell.classList.add("cell");
         cell.setAttribute("id", i + 1); // IDs start from 1 for Cypress
         cell.addEventListener("click", () => handleCellClick(i));
         boardElement.appendChild(cell);
     }
 }
 
 function handleCellClick(index) {
     if (board[index] || gameOver) return;
 
     board[index] = currentPlayer === player1 ? "x" : "o";
     document.getElementById(index + 1).innerText = board[index];
     document.getElementById(index + 1).classList.add("taken");
 
     if (checkWinner()) {
         updateMessage(${currentPlayer} congratulations you won!);
         gameOver = true;
         document.getElementById("restart").classList.remove("hidden");
         return;
     }
 
     if (board.every(cell => cell !== "")) {
         updateMessage("It's a draw!");
         gameOver = true;
         document.getElementById("restart").classList.remove("hidden");
         return;
     }
 
     switchPlayer();
 }
 
 function switchPlayer() {
     currentPlayer = currentPlayer === player1 ? player2 : player1;
     updateMessage(${currentPlayer}, you're up!);
 }
 
 function updateMessage(msg) {
     document.querySelector(".message").innerText = msg;
 }
 
 function checkWinner() {
     const winningCombinations = [
         [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
         [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
         [0, 4, 8], [2, 4, 6]             // diagonals
     ];
 
     return winningCombinations.some(combination => {
         const [a, b, c] = combination;
         return board[a] && board[a] === board[b] && board[b] === board[c];
     });
 }
 
 document.getElementById("restart").addEventListener("click", () => {
     createBoard();
     currentPlayer = player1;
     updateMessage(${currentPlayer}, you're up!);
     document.getElementById("restart").classList.add("hidden");
 });