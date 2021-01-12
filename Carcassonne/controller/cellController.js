/* eslint-disable import/extensions */
// import Card from '../model/Card.js';
import CONSTANTS from '../utils/CONSTANTS.js';
import Card from '../model/Card.js';

export default function addCell(board, xx, yy, type) {
  const cell = this.add.isoSprite(xx, yy, 0, type, this.isoGroup);
  // cell.scaleX = 0.5;
  // cell.scaleY = 1;
  // cell.angle = 45;
  // cell.setScale(0.5);
  // cell.setAngle(45);
  // cell.setScale(0.25, 0.5);
  // cell.setX(2);
  cell.setInteractive();
  cell.number = board.cellsCount;

  if (cell.texture.key === 'empty') {
    cell.on('pointerover', function () {
      this.setTint(0x86bfda);
      this.isoZ += 7;
    });

    cell.on('pointerout', function () {
      this.clearTint();
      this.isoZ -= 7;
    });

    cell.on('pointerdown', (pointer) => {
      if (pointer.leftButtonDown()) {
        cell.setTexture('tile');
        cell.removeAllListeners();
        cell.isoPosition.z = 0;
        addNeib.call(this, board, xx, yy);
      }
    });
  }

  return cell;
}

function addEmpty(board, x, y) {
  const card = new Card(this.cellsCount, x, y);
  board.addItem(card);
  board.cellsCountIncrease();
  addCell.call(this, board, x, y, 'empty', board.cellsCount);
}

function addNeib(board, x, y) {
  const localBoard = board.board.map((item) => {
    const localItem = item;
    if (localItem.cardNumber === board.cellsCount) {
      localItem.type = 'tile';
    }
    return localItem;
  });

  if (localBoard.filter((cell) => (cell.x === x + CONSTANTS.SIZE && cell.y === y)).length === 0) {
    // console.log('4');
    addEmpty.call(this, board, x + CONSTANTS.SIZE, y);
  }

  if (localBoard.filter((cell) => (cell.x === x - CONSTANTS.SIZE && cell.y === y)).length === 0) {
    // console.log('1');
    addEmpty.call(this, board, x - CONSTANTS.SIZE, y);
  }

  if (localBoard.filter((cell) => (cell.x === x && cell.y === y + CONSTANTS.SIZE)).length === 0) {
    // console.log('3');
    addEmpty.call(this, board, x, y + CONSTANTS.SIZE);
  }

  if (localBoard.filter((cell) => (cell.x === x && cell.y === y - CONSTANTS.SIZE)).length === 0) {
    // console.log('2');
    addEmpty.call(this, board, x, y - CONSTANTS.SIZE);
  }
}
