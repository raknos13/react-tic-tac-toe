import { useState } from 'react';
import Board from "./Board";

export default function Game() {
	const [xIsNext, setXIsNext] = useState(true);
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const [reverseMoveOrder, setReverseMoveOrder] = useState(false);
	const currentSquares = history[currentMove];

	function handlePlay(nextSquares) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
		setXIsNext(!xIsNext);
	}

	function jumpTo(nextMove) {
		setCurrentMove(nextMove);
		setXIsNext(nextMove % 2 == 0);
	}

	const moves = history.map((squares, move) => {
		let description;
		if (move > 0) {
			description = "Goto move #" + move;
		} else {
			description = "Goto game start";
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