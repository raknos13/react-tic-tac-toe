export default function Square({ value, onSquareClick, winSquare }) {
	return (
		<button
			className='square'
			onClick={onSquareClick}
			style={{ backgroundColor: winSquare ? "green" : "#282828" }}>
			{value}
		</button>
	);
}