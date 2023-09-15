import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

import './ClockComponent.scss';

type Time = {
	white: number;
	black: number;
};

type ClockComponentProps = {
	time: Time;
	setTime: Dispatch<SetStateAction<Time>>;
	toMove: 'white' | 'black' | null;
};

export const ClockComponent = ({
	time,
	setTime,
	toMove,
}: ClockComponentProps) => {
	const [localTime, setLocalTime] = useState<Time>({ white: 0, black: 0 });

	useEffect(() => {
		if (toMove) {
			const interval = setInterval(
				() =>
					setLocalTime((prev) => ({
						white: Math.max(
							0,
							prev.white - (toMove === 'white' ? 1 : 0)
						),
						black: Math.max(
							0,
							prev.black - (toMove === 'black' ? 1 : 0)
						),
					})),
				1000
			);

			return () => clearInterval(interval);
		}
	}, [time, toMove]);

	useEffect(() => {
		setLocalTime(time);
	}, [time]);

	return (
		<>
			{time && (
				<div className='time-container'>
					<div className='time white'>
						{Math.floor(localTime.white / 60)} :{' '}
						{String(localTime.white % 60).padStart(2, '0')}
					</div>
					<div className='time black'>
						{Math.floor(localTime.black / 60)} :{' '}
						{String(localTime.black % 60).padStart(2, '0')}
					</div>
				</div>
			)}
		</>
	);
};
