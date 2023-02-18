import { Chess } from 'chess.js';
import React, {
	Dispatch,
	MouseEvent,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import api from '../../api';
import GameTree from '../../utils/GameTree';
import AnalysisGameTree from '../AnalysisGameTree';
import Button from '../Button';
import OccurenceRatio from '../Statistics/OccurenceRatio';
import WinLossDrawRatio from '../Statistics/WinLossDrawRatio';

import './AnalysisTreeComponent.scss';

type AnalysisTreeComponentProps = {
	gameTree: GameTree;
	setGameTree: Dispatch<SetStateAction<GameTree>>;
	game: Chess;
	fen: string;
	setFen: Dispatch<SetStateAction<string>>;
};

export const AnalysisTreeComponent = ({
	gameTree,
	setGameTree,
	game,
	fen,
	setFen,
}: AnalysisTreeComponentProps) => {
	const [statistics, setStatistics] = useState<GameStats>({
		occurence: 0.75,
		whiteWins: 24,
		blackWins: 33,
		draws: 12,
	});
	const [ratio, setRatio] = useState<Ratio>({ white: 0, black: 0, draws: 0 });

	useEffect(() => {
		// api.get('/stats', {
		// 	params: {
		// 		src: fen,
		// 		dest: fen,
		// 	},
		// })
		// 	.then((res) => setStatistics(res.data))
		// 	.catch((err) => {
		// 		console.error(err);
		// 		setStatistics({
		// 			occurence: 0,
		// 			whiteWins: 0,
		// 			blackWins: 0,
		// 			draws: 0,
		// 		});
		// 	});
	}, [fen]);

	useEffect(() => {
		const { whiteWins, blackWins, draws } = statistics;
		const total = whiteWins + blackWins + draws;

		const ratio: Ratio = {
			white: whiteWins > 0 ? (whiteWins / total) * 100 : 0,
			black: blackWins > 0 ? (blackWins / total) * 100 : 0,
			draws: draws > 0 ? (draws / total) * 100 : 0,
		};

		setRatio(ratio);
	}, [statistics]);

	const handleFirstLineClick = (e?: MouseEvent<HTMLButtonElement>) => {
		game.reset();
		setFen(game.fen());
	};

	const handlePreviousLineClick = (e?: MouseEvent<HTMLButtonElement>) => {
		game.undo();
		setFen(game.fen());
	};

	const handleNextLineClick = (e?: MouseEvent<HTMLButtonElement>) => {
		const next = gameTree.nxt;

		if (next && next.move) game.move(next.move);
		setFen(game.fen());
	};

	const handleUpLineClick = (e?: MouseEvent<HTMLButtonElement>) => {
		if (!gameTree.crt) return;
		const index = gameTree.crt.lines.findIndex(
			(node) => node === gameTree.nxt
		);

		if (index - 1 >= 0) gameTree.nxt = gameTree.crt.lines[index - 1];

		setGameTree(new GameTree(gameTree));
	};

	const handleDownLineClick = (e?: MouseEvent<HTMLButtonElement>) => {
		if (!gameTree.crt) return;
		const index = gameTree.crt.lines.findIndex(
			(node) => node === gameTree.nxt
		);

		if (gameTree.crt.lines.length !== index + 1)
			gameTree.nxt = gameTree.crt.lines[index + 1];

		setGameTree(new GameTree(gameTree));
	};

	const handleKeypress = ({ key }: KeyboardEvent) => {
		if (key === 'ArrowLeft') {
			handlePreviousLineClick();
			return;
		}
		if (key === 'ArrowRight') {
			handleNextLineClick();
			return;
		}
		if (key === 'ArrowDown') {
			handleDownLineClick();
			return;
		}
		if (key === 'ArrowUp') {
			handleUpLineClick();
			return;
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleKeypress);
		return () => {
			document.removeEventListener('keydown', handleKeypress);
		};
	}, [handleKeypress]);

	const handleLastLineClick = (e: MouseEvent<HTMLButtonElement>) => {
		let next = gameTree.nxt;

		while (next && next.move) {
			game.move(next.move);
			next = next.lines[0];
		}

		setFen(game.fen());
	};

	return (
		<div key={fen} className='analysis-tree-container'>
			<h4 className='analysis-tree-heading'>ChessPal Explorer</h4>
			<AnalysisGameTree game={gameTree} setGame={setGameTree} />
			<div className='statistics-container'>
				<div className='total-games'>
					{statistics.whiteWins +
						statistics.draws +
						statistics.blackWins}
				</div>
				<OccurenceRatio occurence={statistics.occurence} />
				<WinLossDrawRatio ratio={ratio} />
				{/* <div>{ratio.white.toFixed(2)}%</div>
				<div>{ratio.draws.toFixed(2)}%</div>
				<div>{ratio.black.toFixed(2)}%</div> */}
			</div>
			<div className='buttons-container'>
				<Button onClick={handleFirstLineClick}>{'<<'}</Button>
				<Button onClick={handlePreviousLineClick}>{'<'}</Button>
				<Button onClick={handleNextLineClick}>{'>'}</Button>
				<Button onClick={handleLastLineClick}>{'>>'}</Button>
			</div>
		</div>
	);
};
