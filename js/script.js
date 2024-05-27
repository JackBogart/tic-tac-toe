const gameBoard = (function () {
    const board = ['', '', '', '', '', '', '', '', ''];

    const getCell = (index) => board[index];
    const setMarker = (index, marker) => (board[index] = marker);
    const resetBoard = () => {
        for (let i = 0; i < 9; i++) {
            board[i] = '';
        }
    };
    return { getCell, setMarker, resetBoard };
})();

function createPlayer(marker) {
    let name = 'Player ' + marker;

    const getMarker = () => marker;
    const getName = () => name;
    const setName = (new_name) => {
        name = new_name;
    };
    return { getMarker, getName, setName };
}

const gameController = (function () {
    const player1 = createPlayer('X');
    const player2 = createPlayer('O');
    let isOver = false;
    let currentPlayer = player1;

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

    const getCurrentPlayer = () => currentPlayer.getName();
    const setPlayerName = (name, index) => {
        if (index == 1) {
            player1.setName(name);
        } else {
            player2.setName(name);
        }
    };

    const selectCell = (index) => {
        if (isOver) return; // Current game has finished
        if (gameBoard.getCell(index) != '') return;
        gameBoard.setMarker(index, currentPlayer.getMarker());

        if (checkForWin()) {
            isOver = true;
        } else if (isATie()) {
            isOver = true;
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
    const getResult = () => {
        if (checkForWin()) {
            return `${getCurrentPlayer()} has won!`;
        } else if (isATie()) {
            return `It's a draw!`;
        } else {
            return `${getCurrentPlayer()}'s Turn!`;
        }
    };

    const restartGame = () => {
        currentPlayer = player1;
        isOver = false;
        gameBoard.resetBoard();
    };

    return { selectCell, getCurrentPlayer, isGameOver, getResult, setPlayerName, restartGame };
})();

const displayController = (function () {
    const cells = document.querySelectorAll('.cell');
    const gameState = document.querySelector('.game-state');
    const restart = document.querySelector('.restart');
    const players = document.querySelectorAll('.player');

    cells.forEach((cell) => {
        cell.addEventListener('click', () => {
            gameController.selectCell(cell.dataset.index);
            cell.textContent = gameBoard.getCell(cell.dataset.index);
            gameState.textContent = gameController.getResult();
        });
    });

    players.forEach((input) => {
        input.addEventListener('input', () => {
            gameController.setPlayerName(input.value, input.dataset.index);
            if (input.value == gameController.getCurrentPlayer()) {
                gameState.textContent = gameController.getResult();
            }
        });
    });

    restart.addEventListener('click', () => {
        gameController.restartGame();
        for (const cell of cells) {
            cell.textContent = '';
        }
        gameState.textContent = gameController.getResult();
    });
})();
