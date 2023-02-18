import React from 'react';

import './OccurenceRatioComponent.scss';

type OccurenceRatioComponentProps = {
	occurence: number;
};

export const OccurenceRatioComponent = ({
	occurence,
}: OccurenceRatioComponentProps) => {
	return (
		<div className='occurence-wrapper'>
			<div
				className='occurence'
				style={{ flexBasis: (occurence * 100).toFixed(0) + '%' }}
			>
				{(occurence * 100).toFixed(2)}%
			</div>
			<div className='empty' />
		</div>
	);
};
