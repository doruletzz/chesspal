import { Chess, DEFAULT_POSITION } from 'chess.js';
import React, { MouseEvent, useEffect, useState } from 'react';
import AnalysisTree from '../../components/AnalysisTree';
import ChessBoard from '../../components/Board';
import Button from '../../components/Button';
import GameTree, { GameTreeNode } from '../../utils/GameTree';

const DEFAULT_BOARD_WIDTH = 600;

export const AnalysisPageComponent = () => {
	const [width, setWidth] = useState<number>(() => DEFAULT_BOARD_WIDTH);
	const [game, setGame] = useState<Chess>(() => new Chess());
	const [fen, setFen] = useState<string>(() => DEFAULT_POSITION);
	const [gameTree] = useState<GameTree>(() => new GameTree());

	useEffect(() => {
		gameTree.addLine(game.history());
		console.log(fen);
	}, [fen]);

	return (
		<div className='analysis-page-container'>
			<ChessBoard game={game} width={width} fen={fen} setFen={setFen} />
			<AnalysisTree
				key={fen}
				fen={fen}
				gameTree={gameTree}
				game={game}
				setFen={setFen}
			/>
		</div>
	);
};
