import React, { Dispatch, SetStateAction, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, DEFAULT_POSITION, Move } from 'chess.js';
import {
	BoardOrientation,
	Piece,
	Square,
} from 'react-chessboard/dist/chessboard/types';

export type ChessBoardComponentProps = {
	isMultiplayer: boolean;
	boardOrientation: BoardOrientation;
	game: Chess;
	setGame?: Dispatch<SetStateAction<Chess>>;
	width: number;
	fen: string;
	setFen?: Dispatch<SetStateAction<string>>;
};

export const ChessBoardComponent = ({
	isMultiplayer = false,
	boardOrientation = 'white',
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
		if (
			!setGame ||
			!setFen ||
			(isMultiplayer &&
				(game.turn() === 'b' ? 'black' : 'white') !== boardOrientation)
		)
			return false;

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
					boardOrientation={boardOrientation}
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
