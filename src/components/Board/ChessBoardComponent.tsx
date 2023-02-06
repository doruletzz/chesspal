import React, { Dispatch, SetStateAction, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, DEFAULT_POSITION, Move } from 'chess.js';
import { Piece, Square } from 'react-chessboard/dist/chessboard/types';

export type ChessBoardComponentProps = {
	game: Chess;
	width: number;
	fen: string;
	setFen: Dispatch<SetStateAction<string>>;
};

export const ChessBoardComponent = ({
	fen,
	setFen,
	game,
	width,
}: ChessBoardComponentProps) => {
	// const [fen, setFen] = useState<string>(() => DEFAULT_POSITION);

	const handleDrop = (
		sourceSquare: Square,
		targetSquare: Square,
		piece: Piece
	) => {
		try {
			const move = game.move({
				from: sourceSquare,
				to: targetSquare,
				promotion: 'q',
			} as Move);

			setFen(game.fen());
			return move !== null;
		} catch (e) {
			return false;
		}
	};

	return (
		game && (
			<Chessboard
				position={fen}
				boardWidth={width}
				arePiecesDraggable
				id='BasicBoard'
				onPieceDrop={handleDrop}
			/>
		)
	);
};
