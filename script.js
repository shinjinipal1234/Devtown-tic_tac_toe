const board = document.getElementById("game-board");
const statusText = document.getElementById("game-status");
const resetButton = document.getElementById("reset-button");

let currentPlayer = "Player 1";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""]; // Tracks cell values

// Winning combinations
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initialize the game board
function initBoard() {
  board.innerHTML = "";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "Player 1";
  statusText.textContent = "Player 1's turn";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

// Handle cell click
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (gameState[index] !== "" || !gameActive) {
    return;
  }

  // Update game state and UI based on the current player
  gameState[index] = currentPlayer === "Player 1" ? "1" : "2";
  cell.textContent = currentPlayer === "Player 1" ? "1" : "2";
  cell.classList.add("taken");

  if (checkWinner()) {
    statusText.textContent = `${currentPlayer} wins!`;
    gameActive = false;
  } else if (!gameState.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
    statusText.textContent = `${currentPlayer}'s turn`;
  }
}

// Check for winner
function checkWinner() {
  return winningCombos.some((combo) => {
    const [a, b, c] = combo;
    return (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    );
  });
}

// Reset the game
resetButton.addEventListener("click", initBoard);

// Start the game
initBoard();

