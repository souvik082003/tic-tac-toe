const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset');

const soundWin = document.getElementById('sound-win');
const soundDraw = document.getElementById('sound-draw');
const soundClick = document.getElementById('sound-click');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let running = true;

const winConditions = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

const funnyWinMessages = [
  "X gonna give it to ya! 🔥",
  "O no you didn’t! 💀",
  "Big W 💯",
  "They tried you, but you clutched 😤",
  "GG EZ 😎"
];

const funnyDrawMessages = [
  "It’s a draw... boring 😴",
  "Tie game? What is this, chess? ♟️",
  "Nobody won, but at least nobody lost 😌"
];

function startGame() {
  cells.forEach(cell => cell.addEventListener('click', cellClicked));
  resetBtn.addEventListener('click', resetGame);
  statusText.textContent = "Click a tile, legend 🐐";
}

function cellClicked() {
  const cellIndex = this.getAttribute('data-index');
  if (board[cellIndex] !== '' || !running) return;

  soundClick.play();
  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer === 'X' ? '❌' : '⭕';
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `${currentPlayer}'s turn – don't mess it up 😏`;
}

function checkWinner() {
  let roundWon = false;

  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = getRandom(funnyWinMessages);
    soundWin.play();
    dropConfetti();
    running = false;
  } else if (!board.includes('')) {
    statusText.textContent = getRandom(funnyDrawMessages);
    soundDraw.play();
    running = false;
  } else {
    switchPlayer();
  }
}

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  running = true;
  statusText.textContent = "Game reset! Now redeem yourself 🫡";
  cells.forEach(cell => (cell.textContent = ''));
}

function dropConfetti() {
  confetti({
    particleCount: 200,
    spread: 120,
    origin: { y: 0.6 }
  });
}

startGame();