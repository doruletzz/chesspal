import { GameTreeNode } from './GameTreeNode';

export class GameTree {
	_root: GameTreeNode;
	_crt: GameTreeNode | null;

	constructor() {
		this._root = new GameTreeNode();
		this._crt = null;
	}

	get root() {
		return this._root;
	}

	get crt() {
		return this._crt;
	}

	set crt(value) {
		this._crt = value;
	}

	deleteNode(node: GameTreeNode): void {
		const prev = node.prev ?? this._root;
		prev.lines.splice(
			prev?.lines.findIndex((e) => e === node),
			1
		);

		this._crt = prev;
	}

	addLine(history: Array<string>, node?: GameTreeNode): void {
		let crt = node ?? this._root;
		for (let index = 0; index < history.length; ++index) {
			const move = history[index];
			const isWhite = index % 2 === 0;
			const next = crt.lines.find((e: GameTreeNode) => e.move === move);

			if (next) {
				crt = next;
			} else {
				const newNode = new GameTreeNode();
				newNode.move = move;
				newNode.moveNumber = 1 + Math.floor(index / 2);
				newNode.isWhite = isWhite;
				newNode.prev = crt;
				crt.lines.push(newNode);
				if (crt === this._root)
					this._root = { ...this._root, ...crt.lines };
				crt = newNode;
			}
		}

		this._crt = crt;
	}

	moveNodeUp(node: GameTreeNode): void {
		const prev = node.prev ?? this._root;
		const index = prev.lines.findIndex((e) => e === node);

		[prev.lines[index], prev.lines[Math.max(index - 1, 0)]] = [
			prev.lines[Math.max(index - 1, 0)],
			prev.lines[index],
		];
	}

	moveNodeDown(node: GameTreeNode): void {
		const prev = node.prev ?? this._root;
		const index = prev.lines.findIndex((e) => e === node);

		[
			prev.lines[index],
			prev.lines[Math.min(index + 1, prev.lines.length - 1)],
		] = [
			prev.lines[Math.min(index + 1, prev.lines.length - 1)],
			prev.lines[index],
		];
	}

	moveNodeFirst(node: GameTreeNode): void {
		const prev = node.prev ?? this._root;
		const index = prev.lines.findIndex((e) => e === node);

		[prev.lines[index], prev.lines[0]] = [prev.lines[0], prev.lines[index]];
	}
}
