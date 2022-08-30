const T = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0],
];

const I = [
  [0, 0, 0, 0],
  [2, 2, 2, 2],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const J = [
  [0, 3, 0],
  [0, 3, 0],
  [3, 3, 0],
];

const L = [
  [0, 4, 0],
  [0, 4, 0],
  [0, 4, 4],
];

const O = [
  [5, 5],
  [5, 5],
];

const S = [
  [0, 0, 0],
  [0, 6, 6],
  [6, 6, 0],
];

const Z = [
  [0, 0, 0],
  [7, 7, 0],
  [0, 7, 7],
];

const tetrominos = [T, I, J, L, O, S, Z];

const tetrominoColors = [
  'purple',
  'cyan',
  'blue',
  'orange',
  'yellow',
  'green',
  'red',
];

const tetrominoCoords = [
  [3, -1],
  [3, -1],
  [4, 0],
  [3, 0],
  [4, 0],
  [3, -1],
  [4, -1],
];

class Tetromino {
  index = Math.floor(Math.random() * 7);
  cellNumber = this.index + 1;
  cells = tetrominos[this.index];
  color = tetrominoColors[this.index];
  coords = tetrominoCoords[this.index];
}

const DELAY = {
  1: 0.01667,
  2: 0.021017,
  3: 0.026977,
  4: 0.035256,
  5: 0.04693,
  6: 0.06361,
  7: 0.0879,
  8: 0.1236,
  9: 0.1775,
  10: 0.2598,
  11: 0.388,
  12: 0.59,
  13: 0.92,
  14: 1.46,
  15: 2.36,
};

export { Tetromino, DELAY, tetrominos, tetrominoColors };
