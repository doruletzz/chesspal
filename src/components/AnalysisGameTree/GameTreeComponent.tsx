import React from 'react';
import GameTree, { GameTreeNode } from '../../utils/GameTree';
import Button from '../Button';

type GameTreeComponentProps = {
	game: GameTree;
};

type GameTreeLineProps = {
	primary?: boolean;
	node: GameTreeNode;
};

const GameTreeLine = ({ primary = false, node }: GameTreeLineProps) => {
	return (
		<React.Fragment>
			<Button
				key={node.move}
				className={
					primary
						? 'game-tree-line primary'
						: 'game-tree-line secondary'
				}
				onClick={() => alert(node.move)}
			>
				{node.move}
			</Button>
			{node.lines.map((child, index) =>
				index === 0 ? (
					<GameTreeLine key={index} primary={primary} node={child} />
				) : (
					<GameTreeLine key={index} node={child} />
				)
			)}
		</React.Fragment>
	);
};

export const AnalysisGameTreeComponent = ({ game }: GameTreeComponentProps) => {
	return (
		<div className='game-tree-container'>
			<GameTreeLine primary node={game.root} />
		</div>
	);
};
