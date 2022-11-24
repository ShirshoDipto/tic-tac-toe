

const gameBoard = (() => {
    let gameOver = false;
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

    const placeMarker = (cell) => {
        const index = parseInt(cell.getAttribute('index'));
        if (workflow.player1.turn === true && array[index] === null) {
            array[index] = workflow.player1.mark;
            updateBoard();
            workflow.player1.turn = false;
            workflow.player2.turn = true
            display.turns.textContent = `${workflow.player2.name}'s Turn`;
        }
        else if (workflow.player2.turn === true && array[index] === null) {
            array[index] = workflow.player2.mark;
            updateBoard();
            workflow.player2.turn = false;
            workflow.player1.turn = true;
            display.turns.textContent = `${workflow.player1.name}'s Turn`;
        }
    }

    const resetArray = () => {
        for (let index = 0; index < array.length; index++) {
            array[index] = null;
        }
    }

    const removeMarkers = () => {

        const allMarked = document.querySelectorAll('#inserted');
        allMarked.forEach((markedCell) => {
            markedCell.removeAttribute('id');
        })
    }

    return {gameOver, array, updateBoard, resetArray, removeMarkers, placeMarker};
})();


const Player = (mark, turn) => {
    let name;
    return { mark, turn, name };
}


const workflow = (() => {

    const player1 = Player('x', true);
    const player2 = Player('o', false);


    const play = (e) => {
        if (gameBoard.gameOver === false) {
            gameBoard.placeMarker(e.target);
            isGameOver();
        }
        if (gameBoard.gameOver === true) {
            if (player1.turn === true) {
                display.turns.textContent = `${player2.name} Wins!`;
            }
            else {
                display.turns.textContent = `${player1.name} Wins!`;
            }
            display.replayNewgame.removeAttribute('id');
        }
        else if (!gameBoard.array.includes(null)) {
            display.turns.textContent = "It's a Draw!";
            display.replayNewgame.removeAttribute('id');
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
                return true;
            }
    }

    const isGameOver = () => {
        if (gameOverConditions(player1.mark) || gameOverConditions(player2.mark)) {
            gameBoard.gameOver = true;
        }
    }

    return {player1, player2, play };
})();



const display = (() => {

    const cells = Array.from(document.querySelectorAll('div[index]'));

    const h3 = document.querySelector('.selection h3');
    const choice_o = document.querySelector('.choice-o');
    const choice_x = document.querySelector('.choice-x');
    const playerVplayer = document.querySelector('.p-v-p');
    const playerVAi = document.querySelector('.p-v-ai');
    const turns = document.querySelector('.turns');
    const next = document.querySelector('.next');
    const newgame = document.querySelector('.new-game');
    const replay = document.querySelector('.replay');
    const replayNewgame = document.querySelector('.replay-newgame');

    playerVplayer.addEventListener('click', (e) => {
        showNextOption(e);
    });

    newgame.addEventListener('click', (e) => {
        replayOrNewgame(e);
    });

    replay.addEventListener('click', (e) => {
        replayOrNewgame(e);
    });

    choice_o.addEventListener('click', (e) => {
        setMarker(e);
    });
    choice_x.addEventListener('click', (e) => {
        setMarker(e);
    });

    cells.forEach((cell) => {
        cell.addEventListener('click', (e) => {
            workflow.play(e);
        });
    });

    next.addEventListener('click', (e) => {
        showNextOption(e);
    })

    const showNextOption = (e) => {
        if (e.target.classList.value === 'next') {
            const names = document.querySelector('.names');
            names.setAttribute('id', 'hide');
            const p1Name = document.querySelector(`input[name="p1Name"]`);
            const p2Name = document.querySelector(`input[name="p2Name"]`);
            workflow.player1.name = p1Name.value;   // may be make a function in the workflow that will change the player values.
            workflow.player2.name = p2Name.value;
            h3.removeAttribute('id');
            h3.textContent = `Choose for ${workflow.player1.name}`;
            choice_o.removeAttribute('id');
            choice_x.removeAttribute('id');
        }
        else {
            playerVplayer.setAttribute('id', 'hide');
            playerVAi.setAttribute('id', 'hide');
            const names = document.querySelector('.names');
            names.removeAttribute('id');
        }
    }

    const replayOrNewgame = (e) => {
        if (e.target.classList.value === 'new-game') {
            const board = document.querySelector('.board');
            board.setAttribute('id', 'hide');
            gameBoard.resetArray();
            gameBoard.updateBoard();
            gameBoard.removeMarkers();
            turns.setAttribute('id', 'hide');
            replayNewgame.setAttribute('id', 'hide');
            playerVplayer.removeAttribute('id');
            playerVAi.removeAttribute('id');
            workflow.player1.turn = true;    // same goes here
            workflow.player2.turn = false;
            gameBoard.gameOver = false;
        }
        else if (e.target.classList.value === 'replay') {
            gameBoard.resetArray();
            gameBoard.updateBoard();
            gameBoard.removeMarkers();
            replayNewgame.setAttribute('id', 'hide');
            workflow.player1.turn = true;     // same goes here
            workflow.player2.turn = false;
            gameBoard.gameOver = false;
            turns.textContent = `${workflow.player1.name}'s Turn`;
        }
    }

    const setMarker = (e) => {
        const board = document.querySelector('.board');
        board.removeAttribute('id');
        h3.setAttribute('id', 'hide');
        choice_o.setAttribute('id', 'hide');
        choice_x.setAttribute('id', 'hide');
        turns.removeAttribute('id');
        turns.textContent = `${workflow.player1.name}'s Turn`;
        if (e.target.classList.value === 'choice-o') {
            workflow.player1.mark = 'o';
            workflow.player2.mark = 'x';
        }

        else {
            workflow.player1.mark = 'x';
            workflow.player2.mark = 'o';
        }
    }


    return { turns, replayNewgame };

})();