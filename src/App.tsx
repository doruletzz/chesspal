import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import TopBar from './components/TopBar';
// import AnalysisPage from './pages/Analysis';

const AnalysisPage = lazy(() => import('./pages/Analysis'));
const HomePage = lazy(() => import('./pages/Home'));
const LoginPage = lazy(() => import('./pages/Login'));
const RegisterPage = lazy(() => import('./pages/Register'));
const PlayPage = lazy(() => import('./pages/Play'));

import './styles/global.scss';

const navItems = [
	{ name: 'analysis', to: 'analysis' },
	{ name: 'play', to: 'play' },
	{ name: 'about', to: 'about' },
];

export const App = () => {
	return (
		<BrowserRouter>
			<TopBar items={navItems} logo={'chesspal'} />
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path='home/' element={<HomePage />} />
					<Route path='analysis/:id' element={<AnalysisPage />} />
					<Route path='analysis/' element={<AnalysisPage />} />
					<Route path='login/' element={<LoginPage />} />
					<Route path='register/' element={<RegisterPage />} />
					<Route path='play/:id' element={<PlayPage />} />
					<Route path='*' element={<Navigate to='home/' />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export default App;
