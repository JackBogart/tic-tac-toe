const gameBoard = (function () {
    const board = ['', '', '', '', '', '', '', '', ''];

    const getBoard = () => board;
    const setMarker = (index, marker) => (board[index] = marker);
    return { getBoard, setMarker };
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
        if (gameBoard.getBoard()[index] != '') return;
        gameBoard.setMarker(index, currentPlayer.getMarker());

        if (checkForWin()) {
            isOver = true;
            console.log(`${currentPlayer.getMarker()} has won`);
        } else if (isATie()) {
            isOver = true;
            console.log(`No moves remaining, tie!`);
        } else {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
        }
    };

    const checkForWin = () => {
        board = gameBoard.getBoard();
        currentMarker = currentPlayer.getMarker();

        for (const winState of winStates) {
            if (winState.every((index) => board[index] === currentMarker)) {
                return true;
            }
        }
        return false;
    };

    const isATie = () => {
        board = gameBoard.getBoard();

        for (let i = 0; i < 9; i++) {
            if (board[i] === '') return false;
        }

        return true;
    };

    return { selectCell, getCurrentPlayer };
})();
