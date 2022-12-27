//game board modules
const gameBoard = (() => {
	let boardArray = ["", "", "", "", "", "", "", "", ""];
	const boardCells = document.querySelector(".board");
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

const displayController = (() =>{});

//player factory
const PlayerFactory = (name, piece) => {
	const playerTurn = (board, cell) => {
		const spot = board.cells.findIndex(position => position === cell);
		if(board.board[spot] === "") {
			board.render();
			return spot;
		}
		return null;
	};
	return { name, piece, playerTurn };
};