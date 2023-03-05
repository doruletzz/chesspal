import React from 'react';
import Tooltip from '../../Tooltip';

import './OccurenceRatioComponent.scss';

type OccurenceRatioComponentProps = {
	occurence: number;
};

export const OccurenceRatioComponent = ({
	occurence,
}: OccurenceRatioComponentProps) => {
	return (
		<div className='occurence-wrapper'>
			<Tooltip position='top' title='Occurence Ratio'>
				<div
					className='occurence'
					style={{ flexBasis: (occurence * 100).toFixed(0) + '%' }}
				>
					{(occurence * 100).toFixed(2)}%
				</div>
				<div className='empty' />
			</Tooltip>
		</div>
	);
};
