import { tetrominoColors } from './tetrominos.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.scale(3.5, 3.5);
function setupCanvas() {
  ctx.strokeStyle = 'black';
  ctx.font = '15px Cascadia Code';
  ctx.beginPath();
  ctx.moveTo(140.5, 0);
  ctx.lineTo(140.5, 280);
  ctx.moveTo(140, 56);
  ctx.lineTo(280, 56);
  ctx.moveTo(140, 90);
  ctx.lineTo(280, 90);
  ctx.moveTo(140, 124);
  ctx.lineTo(280, 124);
  ctx.stroke();
  ctx.fillText(`Next: `, 150, 32);
}
setupCanvas();
ctx.scale(14, 14);

function drawMatrix(matrix, height, width) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let matrixCell = matrix[y][x];
      let tetrominoColor = tetrominoColors[matrixCell - 1];
      ctx.fillStyle = tetrominoColor;
      if (matrixCell === 0) {
        ctx.fillStyle = '#FAF9F6';
      }
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

function drawGameState(nextTetromino, score, level) {
  let cells = nextTetromino.cells;
  let length = cells.length;
  ctx.clearRect(15, 0, 4, 3);
  for (let y = 0; y < length; y++) {
    for (let x = 0; x < length; x++) {
      let cell = cells[y][x];
      if (cell === 0) {
        continue;
      }
      let tetrominoColor = tetrominoColors[cell - 1];
      ctx.fillStyle = tetrominoColor;
      ctx.fillRect(x + 15, y, 1, 1);
    }
  }
  ctx.fillStyle = 'black';
  ctx.scale(1 / 14, 1 / 14);
  ctx.clearRect(150, 60, 130, 22);
  ctx.clearRect(150, 94, 130, 22);
  ctx.fillText(`Score: ${score}`, 150, 80);
  ctx.fillText(`Level: ${level}`, 150, 114);
  ctx.fillText(`Controls`, 150, 140);
  ctx.fillText(`Rotate: W`, 150, 164);
  ctx.fillText(`Left: A`, 150, 192);
  ctx.fillText(`Right: D`, 150, 220);
  ctx.fillText(`Soft Drop: S`, 150, 248);
  ctx.fillText(`Hard Drop: S`, 150, 276);

  ctx.scale(14, 14);
}

export { drawMatrix, drawGameState };
