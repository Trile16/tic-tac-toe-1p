const gameState = {
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  players: ["x", "o"],
  playerTurn: Math.floor(Math.random() * 2),
  playerName: ["Player", "Computer"],
  playerScore: 0,
  computerScore: 0,
  active: true,
};

const board = document.getElementById("board");
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");
const gameDisplay = document.getElementById("game-display");
const resetButton = document.getElementById("reset");

gameDisplay.innerText = `It's ${
  gameState.playerName[gameState.playerTurn]
}'s turn!`;

if (gameState.playerTurn === 1) {
  computerTurn();
}

board.addEventListener("click", (event) => {
  choice(event);
});

resetButton.addEventListener("click", () => {
  reset();
});

// Game functions

function horizontalWin() {
  for (let i = 0; i < 3; i++) {
    const row = gameState.board[i].join("");
    lineChecker(row);
  }
}

function verticalWin() {
  for (let i = 0; i < 3; i++) {
    const array = [];

    for (j = 0; j < 3; j++) {
      array.push(gameState.board[j][i]);
    }

    const column = array.join("");

    lineChecker(column);
  }
}

function diagonalWin() {
  let array = [];
  for (let i = 0; i < 3; i++) {
    array.push(gameState.board[i][i]);
  }

  let diagonal = array.join("");

  lineChecker(diagonal);

  let firstIdx = 0;
  let secondIdx = 2;
  let counter = 0;
  array = [];

  while (counter < 3) {
    array.push(gameState.board[firstIdx][secondIdx]);
    firstIdx++;
    secondIdx--;
    counter++;
  }
  diagonal = array.join("");

  lineChecker(diagonal);
}

function lineChecker(line) {
  if (line === "xxx") {
    gameDisplay.innerText = `Player wins!`;
    gameState.playerScore++;
    playerScore.innerHTML = `Player: ${gameState.playerScore}`;
    gameState.active = false;
  } else if (line === "ooo") {
    gameDisplay.innerText = `Computer wins!`;
    gameState.computerScore++;
    computerScore.innerHTML = `Computer: ${gameState.computerScore}`;
    gameState.active = false;
  }
}

function checkWinConditions() {
  horizontalWin();
  verticalWin();
  diagonalWin();
}

function choice(event) {
  if (gameState.active === true) {
    const id = event.target.id;
    if (!gameState.board[id[0]][id[2]]) {
      event.target.innerText = gameState.players[gameState.playerTurn];
      gameState.playerTurn
        ? (gameState.playerTurn = 0)
        : (gameState.playerTurn = 1);
      gameState.board[id[0]][id[2]] = event.target.innerText;
      gameState.playerTurn = 1;
      gameDisplay.innerText = `It's ${
        gameState.playerName[gameState.playerTurn]
      }'s turn!`;
      checkWinConditions();
      computerTurn();
    }
  }
}

function computerTurn() {
  if (gameState.active === true) {
    gameState.playerTurn
      ? (gameState.playerTurn = 0)
      : (gameState.playerTurn = 1);

    let firstId = Math.floor(Math.random() * 3);
    let secondId = Math.floor(Math.random() * 3);

    let computerPick = false;

    while (!computerPick) {
      if (!gameState.board[firstId][secondId]) {
        computerPick = true;
        const cell = document.getElementById(`${firstId}-${secondId}`);
        gameState.active = false;
        setTimeout(() => {
          gameState.playerTurn = 1;
          cell.innerText = gameState.players[gameState.playerTurn];
          gameState.board[firstId][secondId] = cell.innerText;
          gameState.playerTurn = 0;
          gameDisplay.innerText = `It's ${
            gameState.playerName[gameState.playerTurn]
          }'s turn!`;
          gameState.active = true;
          checkWinConditions();
        }, 1000);
      } else {
        firstId = Math.floor(Math.random() * 3);
        secondId = Math.floor(Math.random() * 3);
      }
    }
  }
}

function reset() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameState.board[i][j] = null;
      let piece = "";
      let cell = document.getElementById(`${i}-${j}`);
      cell.innerHTML = piece;
    }
  }

  gameDisplay.innerText = `It's ${
    gameState.playerName[gameState.playerTurn]
  }'s turn!`;

  gameState.active = true;

  if (gameState.playerTurn === 1) {
    computerTurn();
  }
}
