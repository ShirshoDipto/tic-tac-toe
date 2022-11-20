

const gameBoard = (() => {
    array = ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x'];
    return {array};
})();


function updateBoard() {
    for (let index = 0; index < gameBoard.array.length; index++) {
        if (gameBoard.array[index] === 'x') {
            const x = document.querySelector(`div[index="${index}"] .x-icon`);
            x.setAttribute('id', 'inserted');
        }
        else if (gameBoard.array[index] === 'o') {
            const o = document.querySelector(`div[index="${index}"] .o-icon`);
            o.setAttribute('id', 'inserted');
        }
    }
}


updateBoard();