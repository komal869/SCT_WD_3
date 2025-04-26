let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let gameMode = 'player'; // 'player' or 'computer'

const winningConditions = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
];

const boardContainer = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const turnDisplay = document.getElementById('turn');

function setGameMode(mode) {
    gameMode = mode;
    resetGame();
}

function handleCellClick(index) {
    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    renderBoard();

    if (checkWinner()) {
        statusDisplay.textContent = `🏆 Player ${currentPlayer} Wins!`;
        turnDisplay.textContent = '';
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusDisplay.textContent = "It's a Draw!";
        turnDisplay.textContent = '';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTurnDisplay();

    if (gameMode === 'computer' && currentPlayer === 'O' && gameActive) {
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    let available = board.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
    let randomIndex = available[Math.floor(Math.random() * available.length)];

    board[randomIndex] = currentPlayer;
    renderBoard();

    if (checkWinner()) {
        statusDisplay.textContent = `🏆 Computer (O) Wins!`;
        turnDisplay.textContent = '';
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusDisplay.textContent = "It's a Draw!";
        turnDisplay.textContent = '';
        gameActive = false;
        return;
    }

    currentPlayer = 'X'; // after computer move, X plays
    updateTurnDisplay();
}

function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function renderBoard() {
    boardContainer.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        boardContainer.appendChild(cellElement);
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.textContent = '';
    renderBoard();
    updateTurnDisplay();
}

function updateTurnDisplay() {
    if (gameActive) {
        if (gameMode === 'computer' && currentPlayer === 'O') {
            turnDisplay.textContent = `Computer's Turn (O)`;
        } else {
            turnDisplay.textContent = `Current Turn: Player ${currentPlayer}`;
        }
    }
}

// Initial render
renderBoard();
updateTurnDisplay();
