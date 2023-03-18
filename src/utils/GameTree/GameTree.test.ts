import { GameTree } from './GameTree';
import { expect, it, describe, beforeEach } from 'vitest';

const default_line = ['e4', 'e5', 'Nf3', 'Nf6'];
const secondary_line = ['e4', 'c5', 'Nf3', 'Nc6'];
const tertiary_line = ['e4', 'd5'];

describe('Game Tree Class', () => {
	let gameTree: GameTree;

	beforeEach(() => {
		gameTree = new GameTree();
		gameTree.addLine(default_line);
	});

	it('Should add lines to game tree', () => {
		expect(gameTree.root.lines.length).toEqual(1);
		expect(gameTree.root.lines[0].move).toEqual('e4');
		expect(gameTree.crt?.move).toEqual('Nf6');

		gameTree.addLine(secondary_line);
		expect(gameTree.root.lines.length).toEqual(1);
		expect(gameTree.root.lines[0].move).toEqual('e4');
		expect(gameTree.root.lines[0].lines[0].move).toEqual('e5');
		expect(gameTree.root.lines[0].lines[1].move).toEqual('c5');
		expect(gameTree.crt?.move).toEqual('Nc6');
	});

	it('Should add line and delete it after', () => {
		gameTree.addLine(secondary_line);

		const node = gameTree.root.lines[0].lines[1];
		gameTree.deleteNode(node);
		expect(gameTree.root.lines[0].lines.length).toEqual(1);
		expect(gameTree?.crt?.move).toEqual(gameTree.root.lines[0].move);
	});

	it('Should move up and down node', () => {
		gameTree.addLine(secondary_line);
		gameTree.addLine(tertiary_line);
		const node = gameTree.root.lines[0].lines[1];

		expect(gameTree.root.lines[0].lines[0].move).toEqual('e5');
		expect(node.move).toEqual('c5');

		gameTree.moveNodeUp(node);
		expect(gameTree.root.lines[0].lines[0].move).toEqual('c5');
		expect(gameTree.root.lines[0].lines[1].move).toEqual('e5');

		gameTree.moveNodeDown(node);
		expect(gameTree.root.lines[0].lines[0].move).toEqual('e5');
		expect(gameTree.root.lines[0].lines[1].move).toEqual('c5');

		gameTree.crt = gameTree.root.lines[0].lines[2];
		gameTree.moveNodeFirst(gameTree.crt);
		expect(gameTree.root.lines[0].lines[0].move).toEqual('d5');
		expect(gameTree.root.lines[0].lines[1].move).toEqual('c5');
		expect(gameTree.root.lines[0].lines[2].move).toEqual('e5');
	});
});
