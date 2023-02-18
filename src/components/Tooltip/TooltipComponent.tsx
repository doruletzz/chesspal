import React, { CSSProperties } from 'react';

import './TooltipComponent.scss';

interface TooltipComponentProps<T extends React.ElementType> {
	component?: T;
	style: CSSProperties;
	title?: string | boolean;
	className?: string;
	position?: 'left' | 'right' | 'top' | 'bottom';
	children: React.ReactNode;
}

export const TooltipComponent = <T extends React.ElementType = 'div'>({
	title,
	style,
	className,
	component,
	position = 'right',
	children,
}: TooltipComponentProps<T>) => {
	const OverridenComponent = component || 'div';
	return (
		<OverridenComponent
			style={style}
			className={`tooltip-wrapper ${className ? className : ''}`}
		>
			{title && <div className={'tooltip ' + position}>{title}</div>}
			{children}
		</OverridenComponent>
	);
};
