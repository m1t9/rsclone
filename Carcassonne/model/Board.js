/* eslint-disable import/extensions */
import addCell from '../controller/cellController.js';
import Card from './Card.js';
import PlayerCard from './PlayerCard.js';
import CONSTANTS from '../utils/CONSTANTS.js';
import moveCamera from '../utils/camera.js';

export default class Board {
  constructor() {
    this.board = [];
    this.cellsCount = 0;
    this.currentCardTexture = 'road_t1_1';
    this.currentCardDir = 1;
    this.currentCard = null;
    this.currentCardSprite = null;
  }

  initBoard() {
    this.board = [];
  }

  addItem(cell) {
    this.board.push(cell);
  }

  initialization() {
    moveCamera.call(this);

    // let xx = CONSTANTS.SIZE;
    // let yy = CONSTANTS.SIZE;

    // for (let x = 0; x < 3; x += 1) {
    //   yy = 0;
    //   xx += CONSTANTS.SIZE;
    //   for (let y = 0; y < 3; y += 1) {
    //     yy += CONSTANTS.SIZE;
    //     const card = new Card(this.cellsCount, xx, yy);

    //     if ((x !== 0 || y !== 0)
    //       && (x !== 0 || y !== 2)
    //       && (x !== 2 || y !== 0)
    //       && (x !== 2 || y !== 2)) {
    //       if (x === 1 && y === 1) {
    //         addCell.call(this, this.board, xx, yy, 'tile', this.cellsCount);
    //         card.name = 'tile';
    //         this.board.addItem(card);
    //       } else {
    //         addCell.call(this, this.board, xx, yy, 'empty', this.cellsCount);
    //         card.name = 'empty';
    //         this.board.addItem(card);
    //       }
    //       this.cellsCount += 1;
    //     }
    //   }
    // }
    const card = new Card(this.board.cellsCount, CONSTANTS.SIZE, CONSTANTS.SIZE);
    this.board.cellsCount += 1;
    addCell.call(this, this.board, CONSTANTS.SIZE, CONSTANTS.SIZE, 'empty', this.cellsCount);
    card.name = 'empty';
    this.board.addItem(card);

    this.board.currentCard = new PlayerCard('grass', 'road', 'road', 'grass');
    console.log(this.board.board);
  }

  cellsCountIncrease() {
    this.cellsCount += 1;
  }

  addCardToBoard(number) {
    this.board[number - 1].name = this.currentCardTexture;
    this.board[number - 1].side1 = this.currentCard.side1;
    this.board[number - 1].side2 = this.currentCard.side2;
    this.board[number - 1].side3 = this.currentCard.side3;
    this.board[number - 1].side4 = this.currentCard.side4;
  }

  check(x, y) {
    let result = true;
    let checkedCell = this.board.filter((cell) => (cell.x === x + CONSTANTS.SIZE && cell.y === y));
    if (checkedCell.length !== 0) {
      if (checkedCell[0].name !== 'empty') {
        // console.log('4');
        if (checkedCell[0].side1 !== this.currentCard.side4) return false;
      }
    }

    checkedCell = this.board.filter((cell) => (cell.x === x - CONSTANTS.SIZE && cell.y === y));
    if (checkedCell.length !== 0) {
      if (checkedCell[0].name !== 'empty') {
        // console.log('1');
        if (checkedCell[0].side4 !== this.currentCard.side1) return false;
      }
    }

    checkedCell = this.board.filter((cell) => (cell.x === x && cell.y === y + CONSTANTS.SIZE));
    if (checkedCell.length !== 0) {
      if (checkedCell[0].name !== 'empty') {
        // console.log('3');
        if (checkedCell[0].side2 !== this.currentCard.side3) return false;
      }
    }

    checkedCell = this.board.filter((cell) => (cell.x === x && cell.y === y - CONSTANTS.SIZE));
    if (checkedCell.length !== 0) {
      if (checkedCell[0].name !== 'empty') {
        // console.log('2');
        if (checkedCell[0].side3 !== this.currentCard.side2) return false;
      }
    }

    return result;
  }
}
