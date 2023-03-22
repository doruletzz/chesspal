import React, { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Tooltip from '../../components/Tooltip';

import './MatchMakingPageComponent.scss';

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

	const handlePlayButtonClick = (
		e: MouseEvent<HTMLButtonElement>,
		time: string
	) => {
		navigate('/play/1');
		console.log('going to play with time: ', time);
	};

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
