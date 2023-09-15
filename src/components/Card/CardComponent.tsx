import React, { MouseEvent, ReactNode } from 'react';

import './CardComponent.scss';

type CardComponentProps = {
	rotate?: boolean;
	children: ReactNode;
};

export const CardComponent = ({
	rotate = true,
	children,
}: CardComponentProps) => {
	const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();

		const cursorPosition = {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		};

		const rotateDegree = {
			y: (cursorPosition.y - rect.height / 2) / rect.height / 2,
			x: (cursorPosition.x - rect.width / 2) / rect.width / 2,
		};

		e.currentTarget.style.setProperty('--mouse-x', `${cursorPosition.x}px`);
		e.currentTarget.style.setProperty('--mouse-y', `${cursorPosition.y}px`);

		if (!rotate) return;

		e.currentTarget.style.setProperty(
			'--rotate-x',
			`${rotateDegree.x * 5}deg`
		);
		e.currentTarget.style.setProperty(
			'--rotate-y',
			`${rotateDegree.y * 15}deg`
		);
	};

	return (
		<div onMouseMove={handleMouseMove} className='card-container'>
			{children}
		</div>
	);
};
