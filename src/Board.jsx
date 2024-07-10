import Square from "./Square";

export default function Board({ xIsNext, squares, onPlay, currentMove }) {
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
		onPlay(nextSquares);
	}

	let status;
	if (winner) {
		status = "Winner: " + winner;
	} else if (currentMove !== 9) {
		status = "Next player: " + (xIsNext ? "X" : "O");
	} else {
		status = "It's a draw!";
	}
	console.log(winner, winningLine);

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

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return { winner: squares[a], line: lines[i] };
		}
	}

	return null;
}
