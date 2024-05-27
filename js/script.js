const gameBoard = (function () {
    const board = ['', '', '', '', '', '', '', '', ''];

    const getCell = (index) => board[index];
    const setMarker = (index, marker) => (board[index] = marker);
    return { getCell, setMarker };
})();

function createPlayer(marker) {
    const getMarker = () => marker;
    return { getMarker };
}

const gameController = (function () {
    const player1 = createPlayer('X');
    const player2 = createPlayer('O');
    let isOver = false;
    let currentPlayer = player1;
    let result = '';

    const winStates = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const getCurrentPlayer = () => currentPlayer.getMarker();

    const selectCell = (index) => {
        if (isOver) return; // Current game has finished
        if (gameBoard.getCell(index) != '') return;
        gameBoard.setMarker(index, currentPlayer.getMarker());

        if (checkForWin()) {
            isOver = true;
            console.log(`Player ${currentPlayer.getMarker()} has won!`);
            result = `Player ${currentPlayer.getMarker()} has won!`;
        } else if (isATie()) {
            isOver = true;
            console.log(`It's a draw!`);
            result = `It's a draw!`;
        } else {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        }
    };

    const checkForWin = () => {
        currentMarker = currentPlayer.getMarker();

        for (const winState of winStates) {
            if (winState.every((index) => gameBoard.getCell(index) === currentMarker)) {
                return true;
            }
        }
        return false;
    };

    const isATie = () => {
        for (let i = 0; i < 9; i++) {
            if (gameBoard.getCell(i) === '') return false;
        }

        return true;
    };

    const isGameOver = () => isOver;
    const getResult = () => result;

    return { selectCell, getCurrentPlayer, isGameOver, getResult };
})();

const displayController = (function () {
    const cells = document.querySelectorAll('.cell');
    const gameState = document.querySelector('.game-state');

    const updateBoard = () => {
        for (const [index, cell] of cells.entries()) {
            cell.textContent = gameBoard.getCell(index);
        }
        if (gameController.isGameOver()) {
            gameState.textContent = gameController.getResult();
        } else {
            gameState.textContent = `Player ${gameController.getCurrentPlayer()}'s Turn!`;
        }
    };

    cells.forEach((cell) => {
        cell.addEventListener('click', () => {
            gameController.selectCell(cell.dataset.index);
            updateBoard();
        });
    });
})();
