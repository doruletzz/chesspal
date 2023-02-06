export class GameTreeNode {
	constructor() {
		this.lines = new Array<GameTreeNode>();
	}

	moveNumber?: number;
	isWhite?: boolean;
	move?: string;
	prev?: GameTreeNode;
	lines: Array<GameTreeNode>;
	comment?: string;
}
