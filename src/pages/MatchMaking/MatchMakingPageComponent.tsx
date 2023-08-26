import React, { MouseEvent, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Tooltip from '../../components/Tooltip';
import {
	setGameError,
	setGameId,
	setGameIsFetching,
	useGameContext,
} from '../../contexts/GameContext';

import './MatchMakingPageComponent.scss';
import api from '../../api';
import { API_ROUTE, PAGE_ROUTE } from '../../constants';

const times = [
	{
		key: '1+0',
		label: '1 + 0',
	},
	{
		key: '3+0',
		label: '3 + 0',
	},
	{
		key: '5+0',
		label: '5 + 0',
	},
	{
		key: '10+0',
		label: '10 + 0',
	},
];

export const MatchMakingPageComponent = () => {
	const navigate = useNavigate();
	const [isMatchFetching, setIsMatchFetching] = useState(false);

	const {
		state: { gameId, variant, isFetching, error },
		dispatch,
	} = useGameContext();

	useEffect(() => {
		let interval: NodeJS.Timer;
		if (isFetching && !gameId) {
			interval = setInterval(() => {
				api.get(API_ROUTE.MATCHMAKING_STATUS)
					.then((res) => {
						if (res.status === 200) {
							dispatch(setGameId(res.data));
							dispatch(setGameIsFetching(false));
							console.log('interval...');
							clearInterval(interval);
						}
					})
					.catch((err) => {
						if (err.request.status === 404) return;

						dispatch(setGameError(err));
						dispatch(setGameIsFetching(false));
						console.log('interval...');
						clearInterval(interval);
					});
			}, 5000);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isFetching]);

	const handlePlayButtonClick = (
		e: MouseEvent<HTMLButtonElement>,
		time: string
	) => {
		api.post(
			variant === 'multiplayer'
				? API_ROUTE.MATCHMAKING_MATCH
				: API_ROUTE.MATCHMAKING_ENGINE_MATCH
		)
			.then((res) => {
				if (res.status === 200) dispatch(setGameIsFetching(true));
			})
			.catch((err) => dispatch(setGameError(err)));
	};

	const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
		dispatch(setGameIsFetching(false));
	};

	useEffect(() => {
		console.log(gameId);
	}, [gameId]);

	if (isFetching)
		return (
			<div>
				<div>Loading...</div>
				<Button onClick={handleCancel}>Cancel</Button>
			</div>
		);

	if (gameId) return <Navigate to={PAGE_ROUTE.PLAY} />;

	return (
		<div className='matchmaking-page-container'>
			<div className='card-container'>
				<h4 className='heading'>Play</h4>

				{times.map((time) => (
					<Tooltip
						key={time.key}
						title={`Play on ${time.label} Time`}
						position='top'
					>
						<Button
							onClick={(e) => handlePlayButtonClick(e, time.key)}
						>
							{time.label}
						</Button>
					</Tooltip>
				))}
			</div>
		</div>
	);
};
