/* eslint-disable import/extensions */
import { addCell, addNeib, turnCard } from '../controller/cellController.js';
// import addNeib from '../controller/cellController.js';
import Card from './Card.js';
// import PlayerCard from './PlayerCard.js';
import CONSTANTS from '../utils/CONSTANTS.js';
// import moveCamera from '../utils/camera.js';
// import CARDS from '../data/gameCards.js';
import CARDS from '../data/gameCards.js';
import nextCard from '../controller/nextCard.js';
import addPointerSides from '../controller/pointer.js';

// import CARDS from '../data/gameCards.js';

export default class Board {
  constructor() {
    this.board = [];
    this.cellsCount = 0;
    this.currentCardTexture = 'road_straight_1';
    this.currentCardDir = 1;
    this.currentCard = null;
    this.currentCardName = null;
    this.step = 2;
    this.isWin = false;
    this.emptyCells = [];
    this.currentX = 0;
    this.currenty = 0;

    this.currnetPlayerNumber = 1;
    this.currentCardOnBoard = null;
    this.sides = [];
    this.playersCards = {
      player1: [],
      player2: [],
      player3: [],
      player4: [],
    };

    this.playersCount = 2;

    // this.currnetPlayer = 1;

    this.playersChips = {
      player1: 10,
      player2: 10,
      player3: 10,
      player4: 10,
    };
    // this.nextStep = null;
  }

  initBoard() {
    this.board = [];
  }

  addItem(cell) {
    this.board.push(cell);
  }

  initialization() {
    this.board.playersCount = window.HUD.players.length;
    const card = new Card(this.board.cellsCount, CONSTANTS.SIZE, CONSTANTS.SIZE);

    // moveCamera.call(this);
    this.board.cellsCount += 1;
    addCell.call(this, this.board, CONSTANTS.SIZE, CONSTANTS.SIZE, 'empty', this.cellsCount);
    card.name = 'empty';
    this.board.addItem(card);
    // this.board.currentCard = new PlayerCard('grass', 'road', 'road', 'grass', 'road_straight');

    nextCard.call(this.board, 0);
    window.HUD.initHudCard(this.board.currentCard.name);

    // console.log(this.scene.manager.getScene('MainScene') === true)
    // console.log(this.scene.get('UIScene'))
    // if(this.textures.exists('imageFromSceneA')) this.scene.start('sceneC')
    // console.log(window.HUD.nextBtn);
    // window.HUD.nextBtn.on('pointerup', function () {
    //   console.log('wow')
    // })

    // console.log(window.StartScreen.numOfPlayers)
    // let cc = false;
    // while (cc === false) {
    //   cc = window.HUD.complete;
    //   console.log(window.HUD.complete);
    // }

    // console.log(this.nextStep);
    // this.nextStep.on('click', function() {
    //   console.log('wow');
    // });
    // console.log(window.HUD.nextBtn);
    // const sc = this;
    window.HUD.disableNextButton();
    window.HUD.disableChipButton();

    // console.log(this.board.currentCard);

    window.HUD.turnBtn.on('pointerup', function () {
      // this.board.currentCardDir += 1;
      turnCard(this.board);
      window.HUD.turnHudCard(this.board.currentCard.name, this.board.currentCardDir);
    }, this);

    window.HUD.nextBtn.on('pointerup', function () {
      // console.log(this.board.playersChips[`player${this.board.currnetPlayerNumber}`]);
      // console.log(this.board.currnetPlayerNumber);
      addNeib.call(this, this.board, this.board.currentX, this.board.currentY);
      this.board.nextCard();

      window.HUD.disableNextButton();
      window.HUD.disableChipButton();
      window.HUD.enableTurnButton();

      this.board.emptyCells.forEach((item) => {
        item.setInteractive();
      });

      this.board.destroyPointers();

      this.board.sides = [];

      // console.log(this.board.playersCards);
      this.board.nextPlayer();
    console.log(this.board.currnetPlayerNumber);

    }, this);

    window.HUD.setChipBtn.on('pointerup', function () {
      this.board.sides = this.board.sides.concat(
        addPointerSides.call(this, this.board.currentX, this.board.currentY),
      );
      window.HUD.disableChipButton();
    }, this);
  }

  destroyPointers() {
    // console.log('destroy');
    this.sides.forEach((item) => {
      item.destroy(true);
    });
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

  setCurrentCoords(x, y) {
    this.currentX = x;
    this.currentY = y;
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

  nextPlayer() {
    this.currnetPlayerNumber += 1;
    if (this.currnetPlayerNumber > this.playersCount) this.currnetPlayerNumber = 1;
    window.HUD.updatePlayerName(this.currnetPlayerNumber - 1);
  }

  nextCardWrong() {
    CARDS.push(CARDS[this.step - 2]);
    nextCard.call(this, this.step - 1);
    window.HUD.updateCard(this.currentCard.name);
  }
}
