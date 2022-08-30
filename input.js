let direction = 'idle';

export const getDirection = () => {
  let currentDirection = direction;
  direction = 'idle';
  return currentDirection;
};

function handleKey(event) {
  switch (event.which) {
    case 87:
    case 38:
      direction = 'rotate';
      break;
    case 83:
    case 40:
      direction = 'soft drop';
      break;
    case 32:
      direction = 'hard drop';
      break;
    case 65:
    case 37:
      direction = 'left';
      break;
    case 68:
    case 39:
      direction = 'right';
  }
}

document.addEventListener('keydown', handleKey);
