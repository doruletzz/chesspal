import { faChessRook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './TopBarComponent.scss';

type NavItem = {
	name: string;
	to: string;
};

type TopBarComponentProps = {
	logo: ReactNode;
	items: Array<NavItem>;
};

export const TopBarComponent = ({ items, logo }: TopBarComponentProps) => {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => console.log(location), [location]);

	return (
		<div className='topbar-container'>
			<div className='logo' onClick={(e) => navigate('/')}>
				<FontAwesomeIcon icon={faChessRook} />
				{logo}
			</div>
			<ul className='nav-items'>
				{items.map((item) => (
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
				))}
			</ul>
		</div>
	);
};
