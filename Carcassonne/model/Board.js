/* eslint-disable import/extensions */
import addCell from '../controller/cellController.js';
import Card from './Card.js';
// import PlayerCard from './PlayerCard.js';
import CONSTANTS from '../utils/CONSTANTS.js';
import moveCamera from '../utils/camera.js';
// import CARDS from '../data/gameCards.js';
import nextCard from '../controller/nextCard.js';
// import CARDS from '../data/gameCards.js';

export default class Board {
  constructor() {
    this.board = [];
    this.cellsCount = 0;
    this.currentCardTexture = 'road_straight_1';
    this.currentCardDir = 1;
    this.currentCard = null;
    this.currentCardName = null; // ?
    this.step = 2;
    this.isWin = false;
    this.emptyCells = [];
  }

  initBoard() {
    this.board = [];
  }

  addItem(cell) {
    this.board.push(cell);
  }

  initialization() {
    const card = new Card(this.board.cellsCount, CONSTANTS.SIZE, CONSTANTS.SIZE);

    moveCamera.call(this);
    this.board.cellsCount += 1;
    addCell.call(this, this.board, CONSTANTS.SIZE, CONSTANTS.SIZE, 'empty', this.cellsCount);
    card.name = 'empty';
    this.board.addItem(card);
    // this.board.currentCard = new PlayerCard('grass', 'road', 'road', 'grass', 'road_straight');

    nextCard.call(this.board, 0);
    window.HUD.initHudCard(this.board.currentCard.name);
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

  checkOne(x, y) {
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

    return true;
  }

  checkFull() {
    let possibleCells = 0;

    this.board.forEach((item) => {
      if (item.name === 'empty') {
        if (this.checkOne(item.x, item.y)) possibleCells += 1;
      }
    });

    return possibleCells > 0;
  }

  nextCard() {
    window.HUD.updateCardNumber(this.step);

    if (this.step === CONSTANTS.CARDS_COUNT + 1) {
      this.isWin = true;
      this.emptyCells.forEach((cell) => {
        cell.removeAllListeners();
      });
      return;
    }

    nextCard.call(this, this.step - 1);
    this.step += 1;
    window.HUD.updateCard(this.currentCard.name);
  }
}
