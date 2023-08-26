import { Chess } from 'chess.js';
import React, { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';

type LineChessBoardComponentProps = {
	moves: Array<string>;
};

export const LineChessBoardComponent = ({
	moves,
}: LineChessBoardComponentProps) => {
	const [game, setGame] = useState<Chess>(() => new Chess());

	useEffect(() => {
		if (moves) {
			let newGame = new Chess();
			moves.forEach((move) => newGame.move(move));
			setGame(newGame);
		}
	}, [moves]);

	return <Chessboard position={game.fen()} boardWidth={132} />;
};
