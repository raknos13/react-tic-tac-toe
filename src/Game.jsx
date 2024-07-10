import { useState } from 'react';
import Board from "./Board";

export default function Game() {
	const [xIsNext, setXIsNext] = useState(true);
	const [history, setHistory] = useState([{squares: Array(9).fill(null), index: -1}]);
	const [currentMove, setCurrentMove] = useState(0);
	const [reverseMoveOrder, setReverseMoveOrder] = useState(false);
	const currentSquares = history[currentMove].squares;

	function handlePlay(nextSquares, i) {
		const nextHistory = [...history.slice(0, currentMove + 1), {squares: nextSquares, index: i}];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
		setXIsNext(!xIsNext);
	}

	function jumpTo(nextMove) {
		setCurrentMove(nextMove);
		setXIsNext(nextMove % 2 == 0);
	}

	const moves = history.map((squaresInfo, move) => {
		let description;
		const index = squaresInfo.index;
		const row = Math.floor(index / 3);
		const col = index % 3;
		const symbol = index % 2 == 0 ? 'X' : 'O';
		console.log('index: ', index);
		if (move > 0) {
			description = `Goto move #${move} ${symbol}(${row}, ${col})`;
		} else {
			description = "Goto game start (0, 0)";
		}
		return (
			<li key={move}>
				{move === currentMove ? (
					<div>You are at move #{move}</div>
				) : (
					<button onClick={() => jumpTo(move)}>{description}</button>
				)}
			</li>
		);
	});

	return (
		<div className='game'>
			<div className='game-board'>
				<Board
					xIsNext={xIsNext}
					squares={currentSquares}
					onPlay={handlePlay}
					currentMove={currentMove}
					calculateWinner={calculateWinner}
				/>
			</div>
			<div className='game-info'>
				<button onClick={() => setReverseMoveOrder(!reverseMoveOrder)}>
					Toggle move order
				</button>
				<ol>{reverseMoveOrder ? moves.toReversed() : moves}</ol>
			</div>
		</div>
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