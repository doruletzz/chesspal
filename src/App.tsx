import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import api from './api';
import TopBar from './components/TopBar';
import { loginSuccess, useAuthContext } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';
// import AnalysisPage from './pages/Analysis';

const AnalysisPage = lazy(() => import('./pages/Analysis'));
const PratisePage = lazy(() => import('./pages/Practise'));
const HomePage = lazy(() => import('./pages/Home'));
const LoginPage = lazy(() => import('./pages/Login'));
const RegisterPage = lazy(() => import('./pages/Register'));
const PlayPage = lazy(() => import('./pages/Play'));
const MatchMakingPage = lazy(() => import('./pages/MatchMaking'));

import './styles/global.scss';
import { getTokenFromLocalStorage } from './utils/auth';
import { PAGE_ROUTE } from './constants';

export const App = () => {
	const {
		state: { sessionId, user, error },
		dispatch,
	} = useAuthContext();

	useEffect(() => {
		if (!sessionId) {
			const token = getTokenFromLocalStorage();
			if (token) {
				dispatch(loginSuccess(token));
				api.defaults.headers.common[
					'Authorization'
				] = `Bearer ${sessionId}`;
			}
		} else {
			api.defaults.headers.common[
				'Authorization'
			] = `Bearer ${sessionId}`;

			console.log(api.defaults.headers);
		}
	}, [sessionId]);

	return (
		<BrowserRouter>
			<TopBar />
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path={PAGE_ROUTE.HOME} element={<HomePage />} />
					<Route
						path={`${PAGE_ROUTE.ANALYSIS}/:id`}
						element={<AnalysisPage />}
					/>
					<Route
						path={PAGE_ROUTE.PRACTISE}
						element={<PratisePage />}
					/>
					<Route
						path={PAGE_ROUTE.ANALYSIS}
						element={<AnalysisPage />}
					/>
					<Route path={PAGE_ROUTE.LOGIN} element={<LoginPage />} />
					<Route
						path={PAGE_ROUTE.REGISTER}
						element={<RegisterPage />}
					/>
					<Route path={PAGE_ROUTE.PLAY} element={<PlayPage />} />
					<Route
						path={PAGE_ROUTE.MATCHMAKING}
						element={<MatchMakingPage />}
					/>
					<Route path='*' element={<Navigate to='home/' />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export default App;
