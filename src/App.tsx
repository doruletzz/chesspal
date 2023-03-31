import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import TopBar from './components/TopBar';
// import AnalysisPage from './pages/Analysis';

const AnalysisPage = lazy(() => import('./pages/Analysis'));
const HomePage = lazy(() => import('./pages/Home'));
const LoginPage = lazy(() => import('./pages/Login'));
const RegisterPage = lazy(() => import('./pages/Register'));
const PlayPage = lazy(() => import('./pages/Play'));
const MatchMakingPage = lazy(() => import('./pages/MatchMaking'));

import './styles/global.scss';

export const App = () => {
	return (
		<BrowserRouter>
			<TopBar logo={'chesspal'} />
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path='home/' element={<HomePage />} />
					<Route path='analysis/:id' element={<AnalysisPage />} />
					<Route path='analysis/' element={<AnalysisPage />} />
					<Route path='login/' element={<LoginPage />} />
					<Route path='register/' element={<RegisterPage />} />
					<Route path='play/:id' element={<PlayPage />} />
					<Route path='matchmaking/' element={<MatchMakingPage />} />
					<Route path='*' element={<Navigate to='home/' />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export default App;
