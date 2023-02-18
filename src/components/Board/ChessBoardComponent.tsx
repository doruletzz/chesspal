import React, { Dispatch, SetStateAction, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, DEFAULT_POSITION, Move } from 'chess.js';
import { Piece, Square } from 'react-chessboard/dist/chessboard/types';

export type ChessBoardComponentProps = {
	game: Chess;
	setGame: Dispatch<SetStateAction<Chess>>;
	width: number;
	fen: string;
	setFen: Dispatch<SetStateAction<string>>;
};

export const ChessBoardComponent = ({
	fen,
	setFen,
	game,
	setGame,
	width,
}: ChessBoardComponentProps) => {
	// const [fen, setFen] = useState<string>(() => DEFAULT_POSITION);

	const handleDrop = (
		sourceSquare: Square,
		targetSquare: Square,
		piece: Piece
	) => {
		try {
			const copy = Object.assign(game, Chess);
			const move = copy.move({
				from: sourceSquare,
				to: targetSquare,
				promotion: 'q',
			} as Move);

			setGame(copy);
			setFen(copy.fen());
			return move !== null;
		} catch (e) {
			console.log(e);
			return false;
		}
	};

	return (
		game && (
			<div className='chess-board'>
				<Chessboard
					position={fen}
					boardWidth={width}
					arePiecesDraggable
					id='BasicBoard'
					onPieceDrop={handleDrop}
				/>
			</div>
		)
	);
};
