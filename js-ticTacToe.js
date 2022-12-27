//game board modules
const gameBoard = (() => {
	let boardArray = ["", "", "", "", "", "", "", "", ""];
	const boardCells = document.querySelector("#board");
	const cells = Array.from(document.querySelectorAll(".cell"));
	let win = null;

	const render = () => {
		boardArray.forEach((piece, spot) => {
			cells[spot].textContent = boardArray[spot];
		});
	};

	const reset = () => {
		let boardArray = ["", "", "", "", "", "", "", "", ""];
	};

	const checkWin = () => {
		const winArrays = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		winArrays.forEach((combo) => {
			if(boardArray[combo[0]]
                && boardArray[combo[0]] === boardArray[combo[1]]
                && boardArray[combo[0]] === boardArray[combo[2]]){
				win = "current";
			}
		});
		return win || (boardArray.includes("") ? null : "Tie");
	};

	return { render, boardCells, cells, boardArray, checkWin, reset,};
})();

//player factory
const playerFactory = (name, piece) => {
	const playerTurn = (board, cell) => {
		const spot = board.cells.findIndex(position => position === cell);
		if(board.boardArray[spot] === "") {
			board.render();
			return spot;
		}
		return null;
	};
	return { name, piece, playerTurn };
};

// game loop
const gameLoop = (() =>{
	const playerOneName = document.querySelector('#player1');
	const playerTwoName = document.querySelector('#player2');
	const form = document.querySelector('.player-info');
	const resetBtn = document.querySelector('#reset');
	let currentPlayer;
	let playerOne;
	let playerTwo;

	const switchTurn = () => {
		currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
	};

	const gameRound = () => {
		const board = gameBoard;
		const status = document.querySelector('.game-status');
		if(currentPlayer.name !== '') {
			status.textContent = `${currentPlayer.name}'s Turn`;
		} else {
			status.textContent = 'Board: ';
		}
        
        board.boardCells.addEventListener('click', (e) => {
			e.preventDefault();
			const play = currentPlayer.playerTurn(board, e.target);
			if(play !== null) {
				board.boardArray[play] = `${currentPlayer.piece}`;
				board.render();
				const winStatus = board.checkWin();
				if(winStatus === 'Tie') {
					status.textContent = 'Tie!';
				} else if(winStatus === null) {
                    switchTurn();
                    status.textContent = `${currentPlayer,name}'s turn`;
                } else {
                    status.textContent = `Winner is ${currentPlayer.name}`;
                    board.reset();
                    board.render;
                }
			}
		});
	};

    const gameInit = () => {
        if(playerOneName.value !== '' && playerTwoName.value !== '') {
            playerOne = playerFactory(playerOneName.value, 'X');
            playerTwo = playerFactory(playerTwoName.value, 'O');
            currentPlayer = playerOne;
            gameRound();
        }
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if(playerOneName.value !== '' && playerTwoName.value !== '') {
            gameInit();
            form.classList.add('hidden');
            document.querySelector('.place').classList.remove('hidden');
        } else {
            window.location.reload();
        }
    });

    resetBtn.addEventListener('click', () => {
        document.querySelector('.game-status').textContent = 'Board: '
        document.querySelector('#player1').value = '';
        document.querySelector('#player2').value = '';
        window.location.reload();
    });
    return {
        gameInit,
    };
})();

gameLoop.gameInit();