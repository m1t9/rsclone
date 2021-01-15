/* eslint-disable import/extensions */
import addCell from '../controller/cellController.js';
import Card from './Card.js';
import CONSTANTS from '../utils/CONSTANTS.js';
import moveCamera from '../utils/camera.js';

export default class Board {
  constructor() {
    this.board = [];
    this.cellsCount = 0;
    this.currentCard = 'cardTest_1';
    this.currentCardSide = 1;
    // this.cardText = '';
    this.currentCardSprite = null;
  }

  initBoard() {
    this.board = [];
  }

  addItem(cell) {
    this.board.push(cell);
  }

  initialization() {
    // this.cardText = this.add.text(10, 10, 'Current card:', { font: '20px', fill: '#ffffff' });
    this.currentCardImage = this.add.image(80, 80, 't1');
    this.currentCardImage.destroy();
    this.currentCardImage = this.add.image(80, 80, 'tile');
    console.log(this.currentCardImage);
    this.currentCardImage.setInteractive();
    this.currentCardImage.on('pointerdown', function(pointer) {
      console.log('wow');
    });

    // console.log(this.iso.projector.origin);
    // const iso = this.iso.projector.origin;
    // console.log(iso);

    // this.input.keyboard.on('keydown', function (event) {
    //   // this.iso.projector.origin.x += 1;
    //   console.log(this.iso);
    //   console.log('wow');
    // });
    moveCamera.call(this);

    let xx = -CONSTANTS.SIZE;
    let yy = -CONSTANTS.SIZE;

    for (let x = 0; x < 3; x += 1) {
      yy = 0;
      xx += CONSTANTS.SIZE;
      for (let y = 0; y < 3; y += 1) {
        yy += CONSTANTS.SIZE;
        const card = new Card(this.cellsCount, xx, yy);

        if ((x !== 0 || y !== 0)
          && (x !== 0 || y !== 2)
          && (x !== 2 || y !== 0)
          && (x !== 2 || y !== 2)) {
          if (x === 1 && y === 1) {
            addCell.call(this, this.board, xx, yy, 'tile', this.cellsCount);
            card.type = 'tile';
            this.board.addItem(card);
          } else {
            addCell.call(this, this.board, xx, yy, 'empty', this.cellsCount);
            card.type = 'empty';
            this.board.addItem(card);
          }
          this.cellsCount += 1;
        }
      }
    }

    // const testDrag = addCell.call(this, this.board, 0, 0, 'card1', this.cellsCount);
    // testDrag.setAngle(0);
    // testDrag.setScale(1, 0.5);
    // // const testDrag = this.addItem.sprite(100, 100, 'tile');
    // testDrag.setInteractive();
    // this.input.setDraggable(testDrag);

    // this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
    //   console.log(gameObject.isoPosition);
    //   console.log(`${dragX} ${dragY} ${gameObject.x} ${gameObject.y}`);
    //   gameObject.isoPosition.x = dragX - 400;
    //   gameObject.isoPosition.y = dragY - 200;
    //   // gameObject.z = 0;
    // });
  }

  cellsCountIncrease() {
    this.cellsCount += 1;
  }
}
