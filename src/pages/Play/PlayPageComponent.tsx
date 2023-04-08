import axios from 'axios';
import { Chess, DEFAULT_POSITION, Move } from 'chess.js';
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import api from '../../api';
import AnalysisGameTree from '../../components/AnalysisGameTree';
import ChessBoard from '../../components/Board';
import Button from '../../components/Button';
import Clock from '../../components/Clock';
import { PLAY_GET_ALL_MOVES_API_PATH } from '../../constants';
import { useAuthContext } from '../../contexts/AuthContext';
import { useGameContext } from '../../contexts/GameContext';
import { useGameEventSource } from '../../hooks/useGameEventSource';
import GameTree from '../../utils/GameTree';

import './PlayPageComponent.scss';

export const PlayPageComponent = () => {
	const {
		state: { gameId },
	} = useGameContext();

	const {
		state: { sessionId, user },
	} = useAuthContext();

	const [eventStreamUrl] = useState(
		() => 'http://localhost:8080/api/play/stream'
	);

	const [game, setGame] = useState<Chess>(() => new Chess());
	const [fen, setFen] = useState<string>(() => DEFAULT_POSITION);
	const [gameTree, setGameTree] = useState<GameTree>(() => new GameTree());
	const [totalTime, setTotalTime] = useState({
		white: 180,
		black: 180,
	});
	const [time, setTime] = useState({
		white: 180,
		black: 180,
	});
	const [isWhite, setIsWhite] = useState(true);
	// const [gameId] = useState(() => 1);

	const [toMove, setToMove] = useState<'white' | 'black'>(() =>
		game.turn() === 'w' ? 'white' : 'black'
	);
	const [players, setPlayers] = useState(() => ({
		white: 'Magnus Carlsen',
		black: 'Hikaru Nakamura',
	}));

	const eventData = useGameEventSource(eventStreamUrl, gameId);

	const sendMoveToApi = (move?: string) => {
		api.post('/play/move', {
			eventType: 'move',
			gameId,
			move,
		})
			.then((res) => console.log(res))
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		if (gameTree.crt) {
			const history = gameTree.history(gameTree.crt);
			let newGame = new Chess();
			history.forEach((move) => newGame.move(move));

			setGame(newGame);
			setFen(newGame.fen());
			setToMove(newGame.turn() === 'w' ? 'white' : 'black');

			//send move to api
			const move = newGame.history({ verbose: true })[
				newGame.history({ verbose: true }).length - 1
			] as Move;

			if (move && (move.color === 'w' ? true : false) === isWhite)
				sendMoveToApi(move?.lan);
		}
	}, [gameTree]);

	useEffect(() => {
		const history = game.history({ verbose: true });
		const lastMove = history[history.length - 1];

		if (eventData)
			setTime({
				white:
					totalTime.white -
					Math.floor(parseInt(eventData.spentWhite) / 1000),
				black:
					totalTime.black -
					Math.floor(parseInt(eventData.spentBlack) / 1000),
			});

		if (
			gameTree.crt &&
			eventData?.lastMove &&
			eventData?.lastMove !== lastMove?.lan
		) {
			const history = gameTree.history(gameTree.crt);
			let newGame = new Chess();
			history.forEach((move) => newGame.move(move));
			newGame.move({
				from: eventData?.lastMove.slice(0, 2),
				to: eventData?.lastMove.slice(2, 4),
			});

			setGame(newGame);
			setFen(newGame.fen());
		}
	}, [eventData]);

	useEffect(() => {
		setFen(game.fen());
		gameTree.addLine(game.history());
		setGameTree(new GameTree(gameTree));
	}, [fen]);

	const createNewGame = (moves: string[]): Chess => {
		let newGame = new Chess();

		moves.forEach((move) => newGame.move(move));
		return newGame;
	};

	useEffect(() => {
		if (gameId)
			api.get(PLAY_GET_ALL_MOVES_API_PATH, { data: { gameId } })
				.then((res) => {
					const {
						moves,
						gameId,
						spentWhite,
						spentBlack,
						blackUserId,
						whiteUserId,
					} = res.data;

					setGame(createNewGame(moves));
					setIsWhite(user?.userId === whiteUserId);
					setTime({
						white: totalTime.white - spentWhite / 1000,
						black: totalTime.black - spentBlack / 1000,
					});
				})
				.catch((err) => console.error(err));
	}, [gameId]);

	if (!sessionId) return <Navigate to='/login' />;

	if (!gameId) return <Navigate to='/matchmaking' />;

	return (
		<div className='play-page-container'>
			<ChessBoard
				isMultiplayer
				width={600}
				fen={fen}
				setFen={setFen}
				game={game}
				setGame={setGame}
				boardOrientation={isWhite ? 'white' : 'black'}
			/>

			<div className='analysis-container'>
				{players && (
					<div className='analysis-tree-players'>
						<h4>{players.white}</h4>
						<h4>{players.black}</h4>
					</div>
				)}
				<Clock time={time} setTime={setTime} toMove={toMove} />
				<AnalysisGameTree game={gameTree} setGame={setGameTree} />
			</div>
		</div>
	);
};
