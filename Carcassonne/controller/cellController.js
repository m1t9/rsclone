/* eslint-disable import/extensions */
// import Card from '../model/Card.js';
import CONSTANTS from '../utils/CONSTANTS.js';
import Card from '../model/Card.js';
// import addPointerSides from './pointer.js';
// import HUD from '../model/Hud.js';

export default function addCell(board, xx, yy, type) {
  const shape = new Phaser.Geom.Polygon([
    new Phaser.Geom.Point(0, 75),
    new Phaser.Geom.Point(150, 150),
    new Phaser.Geom.Point(300, 75),
    new Phaser.Geom.Point(150, 0),
  ]);

  const cell = this.add.isoSprite(xx, yy, 0, type, this.isoGroup);
  let checker = false;
  // cell.scaleX = 0.5;
  // cell.scaleY = 1;
  // cell.angle = 45;
  // cell.setScale(2);
  // cell.setAngle(45);
  // cell.setScale(0.25, 0.5);
  // cell.setX(2);
  // cell.setInteractive();
  cell.setInteractive(shape, Phaser.Geom.Polygon.Contains);
  cell.number = board.cellsCount;

  cell.addMode = false;

  if (cell.texture.key === 'empty') {
    cell.on('pointerover', function () {
      cell.addMode = !cell.addMode;
      cell.setTexture(board.currentCardTexture);
      this.isoZ += 7;
    });

    cell.on('pointerout', function () {
      cell.setTexture('empty');
      cell.addMode = !cell.addMode;
      this.isoZ -= 7;
    });

    // window.HUD.controlBtns.buttons[0].on('pointerdown', () => {
    //   console.log('wow');
    // });
    // console.log(window.HUD.getNextStepButton().buttons[0]);

    cell.on('pointerdown', (pointer) => {
      // console.log(window.HUD.controlBtns.buttons[0]);
      if (pointer.leftButtonDown()) {
        if (board.checkOne(xx, yy) && board.isWin === false) {
          cell.removeAllListeners();
          cell.isoPosition.z = 0;
          // addNeib.call(this, board, xx, yy);
          board.setCurrentCoords(xx, yy);
          board.addCardToBoard(cell.number);

          window.HUD.enableNextButton();
          window.HUD.enableChipButton();
          window.HUD.disableTurnButton();
          window.HUD.destroyCard();

          board.playersCards[`player${board.currnetPlayerNumber}`].push(board.currentCard);
          // checker = board.nextCard();
          // while (checker === false) {
          // }
          // addPointerSides.call(this, xx, yy);
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
  console.log(`${x} ${y}`);
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
