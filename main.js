import { drawMatrix, drawGameState } from './display.js';
import { Tetromino, DELAY, tetrominos } from './tetrominos.js';
import { getDirection } from './input.js';

let level = 1;
let score = 0;
let tetrominosCount = 1;

let lost = false;
let clearedLines = 0;
let nextTetromino = new Tetromino();
let currentTetromino, coordX, coordY;
let lastRenderTime = 0;

let matrixHeight = 20;
let matrixWidth = 10;
let matrix = [...Array(matrixHeight)].map(() => Array(matrixWidth).fill(0));
let completedTetrominosMatrix = JSON.parse(JSON.stringify(matrix));
newTetromino();

function gameLoop(timeStamp) {
  update(timeStamp);
  drawMatrix(matrix, matrixHeight, matrixWidth);
  if (lost) {
    alert(`You lost, score: ${score}`);
    return;
  }
  window.requestAnimationFrame(gameLoop);
}

function update(timeStamp) {
  if (coordY <= 0) {
    renderTetromino(coordX, coordY);
  }
  let delay = (1 / DELAY[level] / 60) * 1000;
  if (timeStamp - lastRenderTime > delay) {
    lowerTetromino();
    lastRenderTime = timeStamp;
  }
  updateDirections();
}

function renderTetromino(newCoordX = coordX, newCoordY = coordY) {
  let cells = currentTetromino.cells;
  let length = cells.length;
  let newMatrix = JSON.parse(JSON.stringify(completedTetrominosMatrix));
  for (let y = 0; y < length; y++) {
    for (let x = 0; x < length; x++) {
      if (!cells[y][x]) {
        continue;
      }
      let matrixRow = newMatrix[newCoordY + y];
      if (
        !matrixRow ||
        matrixRow[newCoordX + x] > 0 ||
        matrixRow[newCoordX + x] === undefined
      ) {
        return false;
      }
      let tetrominoCell = cells[y][x];
      newMatrix[newCoordY + y][newCoordX + x] = tetrominoCell;
    }
  }
  matrix = newMatrix;
  coordX = newCoordX;
  coordY = newCoordY;
  return true;
}

function lowerTetromino() {
  if (!renderTetromino(coordX, coordY + 1)) {
    completedTetrominosMatrix = JSON.parse(JSON.stringify(matrix));
    newTetromino();
  }
}

function left() {
  renderTetromino(coordX - 1, coordY);
}

function right() {
  renderTetromino(coordX + 1, coordY);
}

function hardDrop() {
  let currentTetrominosCount = tetrominosCount;
  while (currentTetrominosCount === tetrominosCount) {
    lowerTetromino();
  }
}

function rotate() {
  let cells = currentTetromino.cells;
  let lastCells = cells;
  let length = cells.length;
  let rotatedTetromino = [...Array(length)].map(() => Array(length).fill(0));
  for (let y = 0; y < length; y++) {
    for (let x = 0; x < length; x++) {
      let cell = cells[y][x];
      if (cell) {
        rotatedTetromino[x][length - y - 1] = cell;
      }
    }
  }
  currentTetromino.cells = rotatedTetromino;
  console.log(currentTetromino.cells);
  if (!renderTetromino(coordX, coordY)) {
    currentTetromino.cells = lastCells;
  }
}

function newTetromino() {
  currentTetromino = nextTetromino;
  nextTetromino = new Tetromino();
  tetrominosCount++;
  coordX = currentTetromino.coords[0];
  coordY = currentTetromino.coords[1];
  checkCompletedLines();
  checkForLosing();
  drawGameState(nextTetromino, score, level, clearedLines);
}

function checkCompletedLines() {
  let clearedRows = 0;
  for (let row of completedTetrominosMatrix) {
    let completed = row.every((cell) => cell > 0);
    if (completed) {
      clearedRows++;
      completedTetrominosMatrix.splice(
        completedTetrominosMatrix.indexOf(row),
        1,
      );
      completedTetrominosMatrix.unshift(Array(matrixWidth).fill(0));
    }
  }
  if (clearedRows) {
    clearedLines += clearedRows;
    addScore(clearedRows);
    clearedLines % 10 === 0 && level++;
  }
}

function addScore(completedRows) {
  switch (completedRows) {
    case 1:
      score += 40 * level;
      break;
    case 2:
      score += 100;
      break;
    case 3:
      score += 300;
      break;
    default:
      score += 1200;
  }
  console.log(score);
}

function checkForLosing() {
  let firstLineIsOccupied = completedTetrominosMatrix[0]
    .slice(3, 8)
    .some((cell) => cell > 0);
  let secondLineIsOccupied = completedTetrominosMatrix[1]
    .slice(3, 8)
    .some((cell) => cell > 0);
  if (firstLineIsOccupied || secondLineIsOccupied) {
    lost = true;
  }
}

function updateDirections() {
  switch (getDirection()) {
    case 'left':
      left();
      console.log('left');
      break;
    case 'right':
      right();
      console.log('right');
      break;
    case 'soft drop':
      lowerTetromino();
      console.log('soft drop');
      break;
    case 'hard drop':
      hardDrop();
      console.log('hard drop');
      break;
    case 'rotate':
      rotate();
      break;
  }
}

window.requestAnimationFrame(gameLoop);
