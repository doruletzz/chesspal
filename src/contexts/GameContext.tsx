import React, {
	createContext,
	useReducer,
	useContext,
	Dispatch,
	ReactNode,
} from 'react';

type GameState = {
	variant?: 'multiplayer' | 'engine';
	gameId: number | null;
	isFetching: boolean;
	error: string | null;
};

type ActionMap<M extends { [index: string]: any }> = {
	[Key in keyof M]: M[Key] extends undefined
		? {
				type: Key;
		  }
		: {
				type: Key;
				payload?: M[Key];
		  };
};
// Initial state
const initialState: GameState = {
	variant: 'multiplayer',
	gameId: null,
	isFetching: false,
	error: null,
};

// Actions
export enum GameTypes {
	SET_GAME_ID,
	SET_VARIANT,
	SET_IS_FETCHING,
	SET_ERROR,
}

type GamePayload = {
	[GameTypes.SET_VARIANT]: {
		variant: 'multiplayer' | 'engine';
	};
	[GameTypes.SET_GAME_ID]: {
		gameId: number;
	};
	[GameTypes.SET_IS_FETCHING]: {
		isFetching: boolean;
	};
	[GameTypes.SET_ERROR]: {
		error: string;
	};
};

export type GameActions = ActionMap<GamePayload>[keyof ActionMap<GamePayload>];

// Action creators
export const setVariant = (variant: 'multiplayer' | 'engine'): GameActions => {
	return { type: GameTypes.SET_VARIANT, payload: { variant } };
};

export const setGameId = (gameId: number): GameActions => {
	return { type: GameTypes.SET_GAME_ID, payload: { gameId } };
};

export const setGameError = (error: string): GameActions => {
	return { type: GameTypes.SET_ERROR, payload: { error } };
};

export const setGameIsFetching = (isFetching: boolean): GameActions => {
	return { type: GameTypes.SET_IS_FETCHING, payload: { isFetching } };
};

// Reducer
export const authReducer = (
	state: GameState,
	action: GameActions
): GameState => {
	switch (action.type) {
		case GameTypes.SET_VARIANT:
			return {
				...state,
				variant: action.payload?.variant ?? 'multiplayer',
			};
		case GameTypes.SET_GAME_ID:
			return {
				...state,
				gameId: action.payload?.gameId || null,
			};
		case GameTypes.SET_IS_FETCHING:
			return {
				...state,
				isFetching: action.payload?.isFetching || false,
			};
		case GameTypes.SET_ERROR:
			return { ...state, error: action.payload?.error || null };
		default:
			return state;
	}
};

const GameContext = createContext<{
	state: GameState;
	dispatch: Dispatch<GameActions>;
}>({ state: initialState, dispatch: () => null });

type GameProps = {
	children: ReactNode;
};

const GameProvider = ({ children }: GameProps) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	return (
		<GameContext.Provider value={{ state, dispatch }}>
			{children}
		</GameContext.Provider>
	);
};

const useGameContext = () => {
	return useContext(GameContext);
};

export { GameProvider, useGameContext };
