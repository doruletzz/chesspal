import {
	faBackward,
	faCaretLeft,
	faCaretRight,
	faDownload,
	faFileExport,
	faFileImport,
	faForward,
	faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chess, DEFAULT_POSITION } from 'chess.js';
import React, {
	Dispatch,
	MouseEvent,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import api from '../../api';
import GameTree from '../../utils/GameTree';
import { pgnToGame } from '../../utils/pgn/parser';
import AnalysisGameTree from '../AnalysisGameTree';
import Button from '../Button';
import Dialog from '../Dialog';
import OccurenceRatio from '../Statistics/OccurenceRatio';
import WinLossDrawRatio from '../Statistics/WinLossDrawRatio';
import Tooltip from '../Tooltip';
import './AnalysisTreeComponent.scss';
import { ImportPgnFormComponent } from './ImportPgnFormComponent';
import { API_ROUTE } from '../../constants';

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
		occurence: 0,
		whiteWins: 0,
		blackWins: 0,
		draws: 0,
	});
	const [ratio, setRatio] = useState<Ratio>({ white: 0, black: 0, draws: 0 });
	const [showImportDialog, setShowImportDialog] = useState<boolean>(false);
	const [importPgn, setImportPgn] = useState<string>('');

	useEffect(() => {
		api.get(API_ROUTE.POSITION_STATS, {
			params: {
				src: DEFAULT_POSITION,
				dest: fen,
			},
		})
			.then((res) => setStatistics(res.data))
			.catch((err) => {
				console.error(err);
				setStatistics({
					occurence: 0,
					whiteWins: 0,
					blackWins: 0,
					draws: 0,
				});
			});
	}, [fen]);

	useEffect(() => {
		if (importPgn) setGameTree(pgnToGame(importPgn));
	}, [importPgn]);

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

	const handleExportClick = (e: MouseEvent<HTMLButtonElement>) => {
		// pgnToGame();
	};

	const handleImportClick = (e: MouseEvent<HTMLButtonElement>) => {
		setShowImportDialog(true);
	};

	return (
		<div key={fen} className='analysis-tree-container'>
			<h4 className='analysis-tree-heading'>ChessPal Explorer</h4>
			<AnalysisGameTree game={gameTree} setGame={setGameTree} />
			<div className='statistics-container'>
				<Tooltip
					title='Total Number of Game '
					className='total-games'
					position='top'
				>
					{statistics.whiteWins +
						statistics.draws +
						statistics.blackWins}
				</Tooltip>
				<OccurenceRatio occurence={statistics.occurence} />
				<WinLossDrawRatio ratio={ratio} />
				{/* <div>{ratio.white.toFixed(2)}%</div>
				<div>{ratio.draws.toFixed(2)}%</div>
				<div>{ratio.black.toFixed(2)}%</div> */}
			</div>
			<div className='buttons-container'>
				<div className='import-export'>
					<Tooltip position='top' title='Import your games'>
						<Button onClick={handleImportClick}>
							{<FontAwesomeIcon icon={faDownload} />}
						</Button>
					</Tooltip>
					<Tooltip position='top' title='Export your games'>
						<Button onClick={handleExportClick}>
							{<FontAwesomeIcon icon={faUpload} />}
						</Button>
					</Tooltip>
				</div>
				<div className='history'>
					<Tooltip position='top' title='Go to first move'>
						<Button onClick={handleFirstLineClick}>
							{<FontAwesomeIcon icon={faBackward} />}
						</Button>
					</Tooltip>

					<Tooltip position='top' title='Go to previous move'>
						<Button onClick={handlePreviousLineClick}>
							{<FontAwesomeIcon icon={faCaretLeft} />}
						</Button>
					</Tooltip>

					<Tooltip position='top' title='Go to next move'>
						<Button onClick={handleNextLineClick}>
							{<FontAwesomeIcon icon={faCaretRight} />}
						</Button>
					</Tooltip>

					<Tooltip position='top' title='Go to last move'>
						<Button onClick={handleLastLineClick}>
							{<FontAwesomeIcon icon={faForward} />}
						</Button>
					</Tooltip>
				</div>
			</div>
			{showImportDialog && (
				<Dialog
					onClose={() => {
						setShowImportDialog(false);
					}}
					open={showImportDialog}
				>
					<ImportPgnFormComponent
						setPgn={(pgn) => {
							setImportPgn(pgn);
							setShowImportDialog(false);
						}}
					/>
				</Dialog>
			)}
		</div>
	);
};
