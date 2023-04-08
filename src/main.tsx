import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<AuthProvider>
			<GameProvider>
				<App />
			</GameProvider>
		</AuthProvider>
	</React.StrictMode>
);
