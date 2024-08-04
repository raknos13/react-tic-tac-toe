import Square from "./Square";

export default function Board({ xIsNext, squares, onPlay, currentMove, calculateWinner }) {
	const winnerInfo = calculateWinner(squares);
	const winner = winnerInfo ? winnerInfo.winner : null;
	const winningLine = winnerInfo ? winnerInfo.line : [];

	function handleClick(i) {
		if (winnerInfo || squares[i]) {
			return;
		}
		const nextSquares = [...squares];
		if (xIsNext) {
			nextSquares[i] = "X";
		} else {
			nextSquares[i] = "O";
		}
		onPlay(nextSquares, i);
	}

	let status;
	if (winner) {
		status = "Winner: " + winner;
	} else if (currentMove !== 9) {
		status = "Next player: " + (xIsNext ? "X" : "O");
	} else {
		status = "It's a draw!";
	}

	// dynamically generate 3x3 grid using two loops.
	const boardRows = [...Array(3).keys()].map((row) => {
		const boardSquares = [...Array(3).keys()].map((col) => {
			const i = 3 * row + col;
			return (
				<Square
					key={i}
					value={squares[i]}
					onSquareClick={() => handleClick(i)}
					winSquare={winningLine.includes(i)}
				/>
			);
		});
		return (
			<div key={row} className='board-row'>
				{boardSquares}
			</div>
		);
	});

	return (
		<>
			<div className='status'>
				<h2>{status}</h2>
			</div>
			{boardRows}
		</>
	);
}
