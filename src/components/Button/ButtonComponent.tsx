import React, { MouseEventHandler, ReactNode } from 'react';

import './ButtonComponent.scss';

export type ButtonComponentProps = {
	className?: string;
	disabled?: boolean;
	variant?: 'primary' | 'secondary' | 'text';
	onClick: MouseEventHandler<HTMLButtonElement>;
	children: ReactNode;
};

export const ButtonComponent = ({
	variant,
	disabled = false,
	className,
	onClick,
	children,
}: ButtonComponentProps) => {
	return (
		<button
			disabled={!!disabled}
			className={`button ${variant ?? 'primary'} ${className ?? ''}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
