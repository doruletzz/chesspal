import { Chess, DEFAULT_POSITION } from 'chess.js';
import React, { MouseEvent, useEffect, useState } from 'react';
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
	}, [fen]);

	const handleFirstLineClick = (e: MouseEvent<HTMLButtonElement>) => {
		game.reset();
		setFen(game.fen());
	};

	const handlePreviousLineClick = (e: MouseEvent<HTMLButtonElement>) => {
		game.undo();
		setFen(game.fen());
	};

	const handleNextLineClick = (e: MouseEvent<HTMLButtonElement>) => {
		const next = gameTree.crt?.lines[0];

		if (next && next.move) game.move(next.move);
		setFen(game.fen());
	};

	const handleLastLineClick = (e: MouseEvent<HTMLButtonElement>) => {
		let next = gameTree.crt?.lines[0];

		while (next && next.move) {
			game.move(next.move);
			next = next.lines[0];
		}

		setFen(game.fen());
	};

	return (
		<div className='analysis-page-container'>
			<ChessBoard game={game} width={width} fen={fen} setFen={setFen} />
			<div className='buttons-container'>
				<Button onClick={handleFirstLineClick}>first</Button>
				<Button onClick={handlePreviousLineClick}>previous</Button>
				<Button onClick={handleNextLineClick}>next</Button>
				<Button onClick={handleLastLineClick}>last</Button>
			</div>
		</div>
	);
};
