/* eslint-disable import/extensions */
import CONSTANTS from '../utils/CONSTANTS.js';
import Card from '../model/Card.js';

export default function addCell(board, xx, yy, type) {
  const shape = new Phaser.Geom.Polygon([
    new Phaser.Geom.Point(0, 75),
    new Phaser.Geom.Point(150, 150),
    new Phaser.Geom.Point(300, 75),
    new Phaser.Geom.Point(150, 0),
  ]);

  const cell = this.add.isoSprite(xx, yy, 0, type, this.isoGroup);
  const back = this.add.isoSprite(xx, yy, -5, 'back', this.isoGroup);

  let checker = false;
  cell.setInteractive(shape, Phaser.Geom.Polygon.Contains);
  cell.number = board.cellsCount;

  cell.addMode = false;

  if (cell.texture.key === 'empty') {
    cell.on('pointerover', function () {
      cell.addMode = !cell.addMode;
      cell.setTexture(board.currentCardTexture);
      this.isoZ += 7;
      back.isoZ += 7;
    });

    cell.on('pointerout', function () {
      cell.setTexture('empty');
      cell.addMode = !cell.addMode;
      this.isoZ -= 7;
      back.isoZ -= 7;
    });

    cell.on('pointerdown', (pointer) => {
      if (pointer.leftButtonDown()) {
        if (board.checkOne(xx, yy) && board.isWin === false) {
          cell.removeAllListeners();
          cell.isoPosition.z = 0;
          back.isoPosition.z = -5;
          board.setCurrentCoords(xx, yy);
          board.addCardToBoard(cell.number);

          window.HUD.enableNextButton();
          window.HUD.enableChipButton();
          window.HUD.disableTurnButton();
          window.HUD.destroyCard();

          board.playersCards[`player${board.currnetPlayerNumber}`].push(board.currentCard);
          board.emptyCells.forEach((item) => {
            item.disableInteractive();
          });
        } else {
          cell.setTint(0xff0000);
          setTimeout(() => {
            cell.clearTint();
          }, 200);
        }
      } else if (pointer.rightButtonDown()) {
        turnCard(board, cell);
      }
    });

    if (type === 'empty') board.emptyCells.push(cell);
  }

  return cell;
}

function addEmpty(board, x, y) {
  const card = new Card(this.board.cellsCount, x, y);
  board.addItem(card);
  board.cellsCountIncrease();
  const emptyCell = addCell.call(this, board, x, y, 'empty', board.cellsCount);
  this.board.emptyCells.push(emptyCell);
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
    addEmpty.call(this, board, x + CONSTANTS.SIZE, y);
  }

  if (localBoard.filter((cell) => (cell.x === x - CONSTANTS.SIZE && cell.y === y)).length === 0) {
    addEmpty.call(this, board, x - CONSTANTS.SIZE, y);
  }

  if (localBoard.filter((cell) => (cell.x === x && cell.y === y + CONSTANTS.SIZE)).length === 0) {
    addEmpty.call(this, board, x, y + CONSTANTS.SIZE);
  }

  if (localBoard.filter((cell) => (cell.x === x && cell.y === y - CONSTANTS.SIZE)).length === 0) {
    addEmpty.call(this, board, x, y - CONSTANTS.SIZE);
  }
}

function turnCard(board, cell) {
  board.currentCardDir += 1;

  if (board.currentCardDir === 5) {
    board.currentCardDir = 1;
  }

  board.currentCard.turnCard();
  board.currentCardTexture = `${board.currentCard.name}_${board.currentCardDir}`;
  if (cell) cell.setTexture(board.currentCardTexture);
  window.HUD.turnHudCard(board.currentCard.name, board.currentCardDir);
}

export {
  turnCard,
  addCell,
  addNeib,
};
