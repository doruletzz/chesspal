import { faChessRook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

import './TopBarComponent.scss';

type NavItem = {
	name: string;
	to: string;
};

const loggedInNavItems = [
	{ name: 'analysis', to: 'analysis' },
	{ name: 'play', to: 'play' },
	{ name: 'practice', to: 'practise' },
	{ name: 'profile', to: 'profile' },
];

const loggedOutNavItems = [
	{ name: 'analysis', to: 'analysis' },
	{ name: 'play', to: 'play' },
	{ name: 'sign in', to: 'login' },
];

export const TopBarComponent = () => {
	const {
		state: { sessionId },
	} = useAuthContext();

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => console.log(location), [location]);

	return (
		<div className='topbar-container'>
			<div className='logo' onClick={(e) => navigate('/')}>
				<FontAwesomeIcon icon={faChessRook} />
				{'chesspal'}
			</div>
			<ul className='nav-items'>
				{(sessionId ? loggedInNavItems : loggedOutNavItems).map(
					(item) => (
						<li
							key={item.name}
							id={item.name}
							className={`nav-item ${
								location.pathname.replace('/', '') === item.to
									? 'active'
									: ''
							}`}
							onClick={(e) => navigate(item.to)}
						>
							{item.name}
						</li>
					)
				)}
			</ul>
		</div>
	);
};
