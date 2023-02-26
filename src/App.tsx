import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Button from './components/Button';
import TopBar from './components/TopBar';
// import AnalysisPage from './pages/Analysis';

const AnalysisPage = lazy(() => import('./pages/Analysis'));
const HomePage = lazy(() => import('./pages/Home'));

import './styles/global.scss';

const navItems = [
	{ name: 'analysis', to: 'analysis' },
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
					<Route path='*' element={<Navigate to='home/' />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};

export default App;
