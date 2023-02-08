import { Chess } from 'chess.js';
import React, { Dispatch, MouseEvent, SetStateAction } from 'react';
import GameTree from '../../utils/GameTree';
import AnalysisGameTree from '../AnalysisGameTree';
import Button from '../Button';

type AnalysisTreeComponentProps = {
	gameTree: GameTree;
	game: Chess;
	fen: string;
	setFen: Dispatch<SetStateAction<string>>;
};

export const AnalysisTreeComponent = ({
	gameTree,
	game,
	fen,
	setFen,
}: AnalysisTreeComponentProps) => {
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
		<div key={fen} className='analysis-tree-container'>
			<h1>heading</h1>
			<AnalysisGameTree fen={fen} game={gameTree} />
			<div className='buttons-container'>
				<Button onClick={handleFirstLineClick}>first</Button>
				<Button onClick={handlePreviousLineClick}>previous</Button>
				<Button onClick={handleNextLineClick}>next</Button>
				<Button onClick={handleLastLineClick}>last</Button>
			</div>
		</div>
	);
};
