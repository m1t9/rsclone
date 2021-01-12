/* eslint-disable import/extensions */
import addCell from '../controller/cellController.js';
import Card from './Card.js';
import CONSTANTS from '../utils/CONSTANTS.js';

export default class Board {
  constructor() {
    this.board = [];
    this.cellsCount = 0;
  }

  initBoard() {
    this.board = [];
  }

  addItem(cell) {
    this.board.push(cell);
  }

  initialization() {
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
  }

  cellsCountIncrease() {
    this.cellsCount += 1;
  }
}
