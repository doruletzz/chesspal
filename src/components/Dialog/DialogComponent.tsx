import React, { ReactNode, useEffect, useState } from 'react';

import './DialogComponent.scss';

type DialogComponentProps = {
	open: boolean;
	backdrop?: boolean;
	onClose: Function;
	children: ReactNode;
};

export const DialogComponent = ({
	open,
	backdrop = true,
	onClose,
	children,
}: DialogComponentProps) => {
	useEffect(() => {
		if (!open) {
			onClose();
		}
	}, [open]);

	return (
		<div className='dialog-wrapper'>
			{backdrop && (
				<div
					onClick={() => {
						onClose();
					}}
					className='backdrop'
				/>
			)}
			<div className='dialog'>{children}</div>
		</div>
	);
};
