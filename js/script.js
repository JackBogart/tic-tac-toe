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
