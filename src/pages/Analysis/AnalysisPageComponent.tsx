import { Chess, DEFAULT_POSITION } from 'chess.js';
import React, { MouseEvent, useEffect, useState } from 'react';
import AnalysisTree from '../../components/AnalysisTree';
import ChessBoard from '../../components/Board';
import Button from '../../components/Button';
import GameTree, { GameTreeNode } from '../../utils/GameTree';

import './AnalysisPageComponent.scss';

const DEFAULT_BOARD_WIDTH = 600;

export const AnalysisPageComponent = () => {
	const [width, setWidth] = useState<number>(() => DEFAULT_BOARD_WIDTH);
	const [game, setGame] = useState<Chess>(() => new Chess());
	const [fen, setFen] = useState<string>(() => DEFAULT_POSITION);
	const [gameTree, setGameTree] = useState<GameTree>(() => new GameTree());

	useEffect(() => {
		if (gameTree.crt) {
			const history = gameTree.history(gameTree.crt);
			let newGame = new Chess();
			history.forEach((move) => newGame.move(move));

			setGame(newGame);
			setFen(newGame.fen());
		}
	}, [gameTree]);

	useEffect(() => {
		setFen(game.fen());
		gameTree.addLine(game.history());
		setGameTree(new GameTree(gameTree));
	}, [fen]);

	return (
		<div className='analysis-page-container'>
			<ChessBoard
				fen={fen}
				setFen={setFen}
				setGame={setGame}
				game={game}
				width={width}
			/>
			<AnalysisTree
				fen={fen}
				gameTree={gameTree}
				setGameTree={setGameTree}
				game={game}
				setFen={setFen}
			/>
		</div>
	);
};
