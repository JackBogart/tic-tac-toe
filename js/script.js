const gameBoard = (function () {
    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];

    const getBoard = () => board;
    const setMarker = (row, col, marker) => (board[row][col] = marker);
    return { getBoard, setMarker };
})();
