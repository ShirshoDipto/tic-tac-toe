

const gameBoard = (() => {
    // let array = ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'o', 'x'];
    let array = [null, null, null, null, null, null, null, null, null];
    const updateBoard = () => {
        for (let index = 0; index < array.length; index++) {
            if (array[index] === 'x') {
                const x = document.querySelector(`div[index="${index}"] .x-icon`);
                x.setAttribute('id', 'inserted');
            }
            else if (array[index] === 'o') {
                const o = document.querySelector(`div[index="${index}"] .o-icon`);
                o.setAttribute('id', 'inserted');
            }
        }

    };

    return {array, updateBoard};
})();


const Player = (mark, turn) => {
    return { mark, turn };
}


const Flow = (player1, player2) => {
    const placeMarker = (cell) => {
        const index = parseInt(cell.getAttribute('index'));
        if (player1.turn === true && gameBoard.array[index] === null) {
            gameBoard.array[index] = player1.mark;
            gameBoard.updateBoard();
            player1.turn = false;
            player2.turn = true
        }
        else if (player2.turn === true && gameBoard.array[index] === null) {
            gameBoard.array[index] = player2.mark;
            gameBoard.updateBoard();
            player2.turn = false;
            player1.turn = true;
        }
    }

    const gameOverConditions = (mark) => {
        if ((gameBoard.array[0] === mark && gameBoard.array[1] === mark && gameBoard.array[2] === mark) ||
            (gameBoard.array[0] === mark && gameBoard.array[3] === mark && gameBoard.array[6] === mark) ||
            (gameBoard.array[6] === mark && gameBoard.array[7] === mark && gameBoard.array[8] === mark) ||
            (gameBoard.array[2] === mark && gameBoard.array[5] === mark && gameBoard.array[8] === mark) ||
            (gameBoard.array[1] === mark && gameBoard.array[4] === mark && gameBoard.array[7] === mark) ||
            (gameBoard.array[3] === mark && gameBoard.array[4] === mark && gameBoard.array[5] === mark) ||
            (gameBoard.array[0] === mark && gameBoard.array[4] === mark && gameBoard.array[8] === mark) ||
            (gameBoard.array[2] === mark && gameBoard.array[4] === mark && gameBoard.array[6] === mark)) {
                return true
            }
        else {
            return false;
        }
    }

    const isGameOver = () => {
        if (gameOverConditions(player1.mark) || gameOverConditions(player2.mark)) {
            return true
        }
    }

    const rmEventListener = () => {
        cells.forEach((cell) => {
            cell.removeEventListener('click', play);
        })
    }

    return {placeMarker, isGameOver, rmEventListener};
}


const player1 = Player('x', true);
const player2 = Player('o', false);
const workflow = Flow(player1, player2);


function play(e) {
    workflow.placeMarker(e.target);
    if (workflow.isGameOver()) {
        workflow.rmEventListener();
        // bring the modal saying game over
    }
    else if (!gameBoard.array.includes(null)) {
        // bring game modal saying draw
        // for now just chech whether it works
        console.log('it is a draw');
    }
}

const cells = Array.from(document.querySelectorAll('div[index]'));


cells.forEach((cell) => {
    cell.addEventListener('click', play);
})




// when clicked on a cell:
    // enter the workflow
    // update gameBoard Array
    // updateGameboard
    // 



// after clicking:
    // create player objects