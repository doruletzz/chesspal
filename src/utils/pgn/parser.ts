// import { GameTreeNode } from '../../types/analysis';

import GameTree, { GameTreeNode } from '../GameTree';

import { Pgn } from 'cm-pgn/src/cm-pgn/Pgn.js';
import { Header } from 'cm-pgn/src/cm-pgn/Header.js';

export const PGN = `1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 (3... Nf6 {- Berlin Defense} 4. O-O (4. d3 {Like
    all of the d3 lines, the eval is equal} 4... Bc5 (4... Nd4 5. Nxd4 exd4 6. 
    O-O c6 7. Bc4 d5 8. exd5 cxd5 9. Bb5+ Bd7 10. Bxd7+ Qxd7 11. Re1+ Kd8 (11... Be7
    12. Bf4 O-O 13. Nd2 Rae8) 12. Bg5 Rc8 13. Nd2 Bb4 14. a3 Ba5)) (4... Nxe4 {- Open
    Variation}) (4... d6 {Improved Steinitz Defence} 5. d4 d6 (5... exd4 6. g4))
`;

// const handleComment = (
//   index: number,
//   words: Array<string>
// ): [number, string] => {
//   let comment = "";
//   while (index < words.length) {
//     if (words[index][words[index].length - 1] === "}") {
//       // end case
//       const word =
//         words[index][0] === "{" ? words[index].substring(1) : words[index];
//       comment += word.substring(0, word.length - 1);
//       return [index, comment];
//     }

//     const word =
//       words[index][0] === "{" ? words[index].substring(1) : words[index];
//     comment += `${word} `;
//     ++index;
//   }

//   return [index, comment];
// };

// export const pgnToGame = (input: string): GameTreeNode => {
//   const words = input.replace(/\n/g, " ").split(" ");
//   console.log();

//   let crtGame = new GameTreeNode();
//   const root = crtGame;

//   let index = 0;
//   let totalMoves = 0;

//   let totalSubvariations = 0;

//   while (index < words.length) {
//     let word = words[index];
//     if (!word) {
//       ++index;
//       continue;
//     }

//     if (word[0] === "(") {
//       // subvariation
//       crtGame = crtGame.prev;
//       word = word.substring(1);
//     } else if (word[0] === "{") {
//       // comment
//       [index, crtGame.comment] = handleComment(index, words);
//     } else if (word.match(/^([0-9])+\./g) || word.match(/^([0-9])+\.\.\./g)) {
//       // white's move
//       // game.isWhite = true;
//     } else if (word[word.length - 1] === ")") {
//       let prevNode = crtGame;
//       // handle multiple sublines

//       while (prevNode && prevNode.prev && word[word.length - 1] === ")") {
//         prevNode = prevNode.prev;

//         word = word.substring(0, word.length - 1);
//         // go to previous mainline
//         while (prevNode && prevNode.prev && prevNode.lines.length === 1) {
//           prevNode = prevNode.prev;
//         }
//       }
//       const newNode = new GameTreeNode();
//       newNode.move = word;
//       newNode.isWhite = !crtGame.isWhite;
//       newNode.moveNumber = crtGame.moveNumber ? crtGame.moveNumber : 0;
//       newNode.moveNumber += crtGame.isWhite ? 0 : 1;
//       newNode.prev = crtGame;
//       crtGame.lines.push(newNode);

//       crtGame = prevNode.lines[0];
//     } else {
//       //TODO: handle score result (1-0 0-1 1/2-1/2)
//       const newNode = new GameTreeNode();
//       newNode.move = word;
//       newNode.isWhite = !crtGame.isWhite;
//       newNode.moveNumber = crtGame.moveNumber ? crtGame.moveNumber : 0;
//       newNode.moveNumber += crtGame.isWhite ? 0 : 1;
//       newNode.prev = crtGame;
//       crtGame.lines.push(newNode);

//       crtGame = crtGame.lines[crtGame.lines.length - 1];
//     }
//     ++index;
//   }

//   return root;
// };

const subVariation = (game: GameTreeNode): string => {
	let var_pgn = '';
	let crt = game;
	if (crt) {
		if (crt.move) {
			var_pgn += crt.isWhite
				? `${crt.moveNumber}. `
				: `${crt.moveNumber}... `;
			var_pgn += `${crt.move}`;
		}

		if (crt.lines.length > 0 && crt.lines[0].move) {
			var_pgn += crt.lines[0].isWhite
				? ` ${crt.lines[0].moveNumber}.`
				: '';
			var_pgn += ` ${crt.lines[0].move} `;
		}

		var_pgn = crt.lines.reduce(
			(pgn, node, idx) =>
				(pgn += idx === 0 ? '' : ` (${subVariation(node)})`),
			var_pgn
		);

		if (crt.lines.length > 0) var_pgn += `${variation(crt.lines[0])}`;
		// if (crt.lines.length > 0)
		//   var_pgn += `${crt.lines[0].move} ${variation(crt.lines[0])}`;
	}

	return var_pgn;
};

const variation = (crt: GameTreeNode): string => {
	let var_pgn = '';
	if (crt) {
		if (crt.lines.length > 0 && crt.lines[0].move) {
			var_pgn += crt.lines[0].isWhite
				? ` ${crt.lines[0].moveNumber}.`
				: '';
			var_pgn += ` ${crt.lines[0].move}`;
		}

		var_pgn = crt.lines.reduce(
			(pgn, node, idx) =>
				(pgn += idx !== 0 ? ` (${subVariation(node)})` : ''),
			var_pgn
		);

		if (crt.lines.length > 0) var_pgn += `${variation(crt.lines[0])}`;
	}
	return var_pgn;
};

export const readPGN = (pgn: string): void => {
	try {
		const newPgn = new Pgn(pgn.replace(/\r\n/g, '\n').replace(/\t/g, ' '));
		console.log(newPgn, newPgn.history);
	} catch (error) {
		console.log(error);
	}
};

export const handleVariation = (variation: any, prev: GameTreeNode) => {
	let crt = prev;

	for (let i in variation) {
		const newNode = new GameTreeNode();

		newNode.move = variation[i].san;
		newNode.prev = crt;
		newNode.isWhite = variation[i].color === 'w';
		newNode.moveNumber = crt.moveNumber ? crt.moveNumber : 0;
		newNode.moveNumber += crt.isWhite ? 0 : 1;
		newNode.comment = variation[i].commentAfter ?? '';

		crt.lines.push(newNode);
		if (variation[i].variations.length > 0) {
			// handle variations
			for (let ii in variation[i].variations) {
				handleVariation(variation[i].variations[ii], crt);
			}
		}
		crt = newNode;
	}
};

export const pgnHeaderExtract = (headerStr: string): string => {
	return new Header(
		headerStr.trim().replace(/\r\n/g, '\n').replace(/\t/g, ' ')
	);
};

export const pgnToGame = (pgn: string): GameTree => {
	const parsedPgn = new Pgn(
		pgn.trim().replace(/\r\n/g, '\n').replace(/\t/g, ' ')
	);

	const game = new GameTree();

	const root = game.root;
	let crt = root;

	const moves = parsedPgn.history.moves ?? [];
	for (let i in parsedPgn.history.moves) {
		const newNode = new GameTreeNode();

		newNode.move = moves[i].san;
		newNode.prev = crt;
		newNode.isWhite = moves[i].color === 'w';
		newNode.moveNumber = crt.moveNumber ? crt.moveNumber : 0;
		newNode.moveNumber += crt.isWhite ? 0 : 1;
		newNode.comment = moves[i].commentAfter ?? '';

		crt.lines.push(newNode);

		if (moves[i].variations.length > 0) {
			// handle variations
			for (let ii in moves[i].variations) {
				handleVariation(moves[i].variations[ii], crt);
			}
		}

		crt = newNode;
	}

	console.log(root);
	return game;
};

export const GameToPgn = (game: GameTreeNode): string => {
	return variation(game);
};
