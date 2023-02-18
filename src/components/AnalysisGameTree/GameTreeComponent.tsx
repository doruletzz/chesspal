import React, { Dispatch, MouseEvent, SetStateAction, useEffect } from 'react';
import GameTree, { GameTreeNode } from '../../utils/GameTree';
import Button from '../Button';

import './GameTreeComponent.scss';

type GameTreeComponentProps = {
	game: GameTree;
	setGame: Dispatch<SetStateAction<GameTree>>;
};

type GameTreeLineProps = {
	primary?: boolean;
	node: GameTreeNode;
	game: GameTree;
	setGame: Dispatch<SetStateAction<GameTree>>;
};

const GameTreeLine = ({
	primary = false,
	node,
	game,
	setGame,
}: GameTreeLineProps) => {
	const handleLineClick = (
		e: MouseEvent<HTMLButtonElement>,
		node: GameTreeNode
	) => {
		game.crt = node;
		setGame(new GameTree(game));
	};

	return (
		<>
			{node && node.lines[0] && (
				<>
					{node.lines[0].isWhite && primary && (
						<div className='move-number'>
							{node.lines[0].moveNumber}
						</div>
					)}

					<Button
						key={node.lines[0].move}
						className={`game-tree-line-${
							primary ? 'primary' : 'secondary'
						} ${node.lines[0].isWhite ? 'white' : 'black'} ${
							game.crt === node.lines[0] ? 'current' : ''
						}${game.nxt === node.lines[0] ? 'next' : ''}`}
						onClick={(e) => handleLineClick(e, node.lines[0])}
					>
						<div className='move-nr'>
							{!primary &&
								node.lines[0].isWhite &&
								`${node.lines[0].moveNumber}.`}
						</div>
						<div className='move'>{node.lines[0].move}</div>
					</Button>
				</>
			)}
			{node.lines.length > 1 && (
				<div className='game-tree-line-secondary-container'>
					{node.lines.map(
						(child, index) =>
							index > 0 && (
								<div className='secondary-wrapper' key={index}>
									<Button
										key={child.move}
										className={`game-tree-line-secondary  ${
											game.crt === child ? 'current' : ''
										}${game.nxt === child ? 'next' : ''}`}
										onClick={(e) =>
											handleLineClick(e, child)
										}
									>
										<div className='move-number'>
											{`${node.lines[0].moveNumber}.${
												!node.lines[0].isWhite
													? '..'
													: ''
											}`}
										</div>
										<div className='move'>{child.move}</div>
									</Button>
									<GameTreeLine
										key={index}
										node={child}
										game={game}
										setGame={setGame}
									/>
								</div>
							)
					)}
				</div>
			)}
			{node && node.lines[0] && (
				<GameTreeLine
					primary={primary}
					node={node.lines[0]}
					game={game}
					setGame={setGame}
				/>
			)}
		</>
	);
};

export const AnalysisGameTreeComponent = ({
	game,
	setGame,
}: GameTreeComponentProps) => {
	return (
		<div className='game-tree-container'>
			<GameTreeLine
				primary
				node={game.root}
				game={game}
				setGame={setGame}
			/>
		</div>
	);
};
