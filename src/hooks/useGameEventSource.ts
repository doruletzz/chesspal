import React, { useEffect, useState } from 'react';

type GameEvent = {
	spentWhite: string;
	spentBlack: string;
	lastMove: string;
	state: string;
};

export const useGameEventSource = (url: string, gameId?: number | null) => {
	if (!gameId) return;

	const [data, setData] = useState<GameEvent | null>(null);

	useEffect(() => {
		const sse = new EventSource(`${url}?gameId=${gameId}`);

		sse.onmessage = (e) => {
			setData(JSON.parse(e.data).stateResponse);
			console.log(JSON.parse(e.data));
		};

		sse.onerror = (e) => sse.close();
	}, [url]);

	return data;
};
