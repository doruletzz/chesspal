import React from 'react';
import Tooltip from '../../Tooltip';
import './WinLossDrawRatioComponent.scss';

type WinLossDrawRatioComponentProps = {
	ratio: Ratio;
};

export const WinLossDrawRatioComponent = ({
	ratio,
}: WinLossDrawRatioComponentProps) => {
	return (
		<div className='win-loss-draw-wrapper'>
			<Tooltip
				title={`1-0 happens ${ratio.black.toFixed(2)}% of the time`}
				position='top'
				style={{ flexBasis: ratio.white.toFixed() + '%' }}
				className='white'
			>
				{ratio.white.toFixed(2)}%
			</Tooltip>
			<Tooltip
				title={`1/2 happens ${ratio.black.toFixed(2)}% of the time`}
				position='top'
				style={{ flexBasis: ratio.draws.toFixed() + '%' }}
				className='draw'
			>
				{ratio.draws.toFixed(2)}%
			</Tooltip>
			<Tooltip
				title={`1-0 happens ${ratio.black.toFixed(2)}% of the time`}
				position='top'
				style={{ flexBasis: ratio.black.toFixed() + '%' }}
				className='black'
			>
				{ratio.black.toFixed(2)}%
			</Tooltip>
		</div>
	);
};
