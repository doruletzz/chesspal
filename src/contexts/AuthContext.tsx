import React, {
	createContext,
	useReducer,
	useContext,
	Dispatch,
	ReactNode,
} from 'react';
import { User } from '../types/User';

type AuthState = {
	sessionId: string | null;
	user: User | null;
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
const initialState: AuthState = {
	sessionId: null,
	user: null,
	error: null,
};

// Actions
export enum AuthTypes {
	LOGIN_SUCCESS = 'LOGIN_SUCCESS',
	LOGIN_FAIL = 'LOGIN_FAIL',
	LOGOUT = 'LOGOUT',
}

type AuthPayload = {
	[AuthTypes.LOGIN_SUCCESS]: {
		sessionId: string;
		user?: User;
	};
	[AuthTypes.LOGIN_FAIL]: {
		error: string;
	};
	[AuthTypes.LOGOUT]: null;
};

export type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];

// Action creators
export const loginSuccess = (sessionId: string, user?: User): AuthActions => {
	return { type: AuthTypes.LOGIN_SUCCESS, payload: { sessionId, user } };
};

export const loginFail = (error: string): AuthActions => {
	return { type: AuthTypes.LOGIN_FAIL, payload: { error } };
};

export const logout = (): AuthActions => {
	return { type: AuthTypes.LOGOUT };
};

// Reducer
export const authReducer = (
	state: AuthState,
	action: AuthActions
): AuthState => {
	switch (action.type) {
		case AuthTypes.LOGIN_SUCCESS:
			return {
				...state,
				sessionId: action.payload?.sessionId || null,
				user: action.payload?.user || null,
				error: null,
			};
		case AuthTypes.LOGIN_FAIL:
			return {
				...state,
				sessionId: null,
				user: null,
				error: action.payload?.error || null,
			};
		case AuthTypes.LOGOUT:
			return { ...state, sessionId: null, user: null };
		default:
			return state;
	}
};

const AuthContext = createContext<{
	state: AuthState;
	dispatch: Dispatch<AuthActions>;
}>({ state: initialState, dispatch: () => null });

type AuthProps = {
	children: ReactNode;
};

const AuthProvider = ({ children }: AuthProps) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuthContext = () => {
	return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };
