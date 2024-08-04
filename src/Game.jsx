import { useState } from "react";
import Board from "./Board";
import './App.css';

export default function Game() {
	const [xIsNext, setXIsNext] = useState(true);
	const [history, setHistory] = useState([
		{ squares: Array(9).fill(null), index: -1 },
	]);
	const [currentMove, setCurrentMove] = useState(0);
	const [reverseMoveOrder, setReverseMoveOrder] = useState(false);
	const currentSquares = history[currentMove].squares;

	function handlePlay(nextSquares, i) {
		const nextHistory = [
			...history.slice(0, currentMove + 1),
			{ squares: nextSquares, index: i },
		];
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
		const symbol = move % 2 !== 0 ? "X" : "O";
		if (move > 0) {
			description = `Goto move #${move} ${symbol}(${row}, ${col})`;
		} else {
			description = `Goto game start`;
		}
		return (
			<li key={move}>
				{move === currentMove && calculateWinner(squaresInfo) ? (
					<div>
						Move {move}: {symbol} to play
					</div>
				) : (
					<button onClick={() => jumpTo(move)}>{description}</button>
				)}
			</li>
		);
	});

	return (
		<>
			<div className='title'>Tic-Tac-Toe</div>
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
					<ol>{reverseMoveOrder ? moves.toReversed() : moves}</ol>
					<button onClick={() => setReverseMoveOrder(!reverseMoveOrder)} className="btn-reverse-move">
						<i className='fa-solid fa-repeat'></i> 
						<span> Reverse move order</span>
					</button>
				</div>
			</div>
		</>
	);
}

//returns an object with winner and an array of winning line cordinates
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
