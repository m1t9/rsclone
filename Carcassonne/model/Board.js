/* eslint-disable import/extensions */
import { addCell, addNeib, turnCard } from '../controller/cellController.js';
// import addNeib from '../controller/cellController.js';
import Card from './Card.js';
// import PlayerCard from './PlayerCard.js';
import CONSTANTS from '../utils/CONSTANTS.js';
// import moveCamera from '../utils/camera.js';
// import CARDS from '../data/gameCards.js';
import nextCard from '../controller/nextCard.js';
import addPointerSides from '../controller/pointer.js';
import calculatePoints from '../utils/calculatePoints.js';

export default class Board {
  constructor() {
    this.board = [];
    this.cellsCount = 0;
    this.currentCardTexture = 'road_straight_1';
    this.currentCardDir = 1;
    this.currentCard = null;
    this.previousCard = null;
    this.currentCardName = null; // ?
    this.step = 2;
    this.isWin = false;
    this.emptyCells = [];

    this.currentX = 0;
    this.currenty = 0;

    this.currnetPlayerNumber = 1;
    // this.currentCardOnBoard = null;
    this.sides = [];

    this.playersCount = 2;
    this.playersCards = {
      player1: [],
      player2: [],
      player3: [],
      player4: [],
    };
    this.playersChips = {
      player1: 10,
      player2: 10,
      player3: 10,
      player4: 10,
    };

    this.allCards = [];
    this.playersPointCards = {
      player1: [],
      player2: [],
      player3: [],
      player4: [],
    };
    this.playersPoints = {
      player1: 0,
      player2: 0,
      player3: 0,
      player4: 0,
    };

    this.localOwner = 'nobody';
    // this.nextStep = null;
  }

  initBoard() {
    this.board = [];
  }

  addItem(cell) {
    this.board.push(cell);
  }

  initialization() {
    const card = new Card(this.board.cellsCount, CONSTANTS.SIZE, CONSTANTS.SIZE);

    // moveCamera.call(this);
    this.board.cellsCount += 1;
    addCell.call(this, this.board, CONSTANTS.SIZE, CONSTANTS.SIZE, 'empty', this.cellsCount);
    card.name = 'empty';
    this.board.addItem(card);
    // this.board.currentCard = new PlayerCard('grass', 'road', 'road', 'grass', 'road_straight');

    nextCard.call(this.board, 0);
    window.HUD.initHudCard(this.board.currentCard.name);

    window.HUD.disableNextButton();
    window.HUD.disableChipButton();

    window.HUD.turnBtn.on('pointerup', function () {
      // this.board.currentCardDir += 1;
      turnCard(this.board);
      window.HUD.turnHudCard(this.board.currentCard.name, this.board.currentCardDir);
    }, this);

    // NEXT STEP----------------------------------------------------------------------------------
    window.HUD.nextBtn.on('pointerup', function () {
      const itemsToDelete = [];
      if (this.board.playersPointCards[`player${this.board.currnetPlayerNumber}`].length !== 0) {
        this.board.playersPointCards[`player${this.board.currnetPlayerNumber}`].forEach((item, index) => {
          const type = item.card[`side${item.chipSide}`];
          const checkedCards = this.board.getCheckPoints(item, type);
          // console.log(checkedCards);
          console.log(item.card[`side${item.chipSide}`]);

          if (this.board.isComplete(checkedCards, type)) {
            this.board.playersPoints[`player${this.board.currnetPlayerNumber}`] += calculatePoints(checkedCards, this.board.allCards);
            itemsToDelete.push(index);
            console.log(this.board.playersPoints);
            item.chip.destroy();

            checkedCards.forEach((checkCard) => {
              this.board.allCards.forEach((boardCard) => {
                if (checkCard.x === boardCard.x && checkCard.y === boardCard.y) {
                  boardCard.isCalculated = true;
                }
              });
            });

            // console.log(this.board.allCards);
          }
        });

        if (itemsToDelete.length > 0) {
          itemsToDelete.forEach((index) => {
            this.board.playersPointCards[`player${this.board.currnetPlayerNumber}`].splice(index, 1);
          });
          // console.log(this.board.playersPointCards[`player${this.board.currnetPlayerNumber}`]);
        }
      }

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
      this.board.currnetPlayerNumber += 1;

      if (this.board.currnetPlayerNumber > this.board.playersCount) {
        this.board.currnetPlayerNumber = 1;
      }
      console.log(`current player: ${this.board.currnetPlayerNumber}`);
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

  getCheckPoints(item, type) {
    // console.log(this);
    // const cardsToCheck = this.allCards;
    // cardsToCheck.forEach((item) => {

    // })
    const arr = [];
    arr.push(item);
    // console.log(item);
    const checkedX = [item.x];
    const checkedY = [item.y];

    console.log(item);
    // if (item.card.name.includes('castle_two_quarter_opposite')) {
    //   // console.log('WTF');
    //   if (item.chipSide === 1) {
    //     // 1
    //     // checkedX.push(item.x);
    //     // checkedY.push(item.y - CONSTANTS.SIZE);
    //     // 2
    //     // checkedX.push(item.x);
    //     // checkedY.push(item.y - CONSTANTS.SIZE);
    //     // 3
    //     // checkedX.push(item.x);
    //     // checkedY.push(item.y + CONSTANTS.SIZE);
    //     // 4
    //     checkedX.push(item.x + CONSTANTS.SIZE);
    //     checkedY.push(item.y);
    //   }
    //   if (item.chipSide === 2) {

    //   }
    //   if (item.chipSide === 3) {

    //   }
    //   if (item.chipSide === 4) {

    //   }
    // }

    // console.log(item)
    this.findNeibs(item.x, item.y, type).forEach((neib) => {
      if (neib.length !== 0) {
        let firstIncludes = false;
        for (let k = 0; k < checkedX.length; k += 1) {
          if (checkedX[k] === neib[0].x && checkedY[k] === neib[0].y) firstIncludes = true;
        }
        if (!firstIncludes) arr.push(neib[0]);
        // console.log(neib[0])
      }
    });

    console.log(arr);

    let i = 1;

    while (i !== arr.length) {
      const neibs = this.findNeibs(arr[i].x, arr[i].y, type);
      // console.log(neibs);
      checkedX.push(arr[i].x);
      checkedY.push(arr[i].y);

      neibs.forEach((neib) => {
        // if (neib.length !== 0 && neib.getSide) {
        //   checkedX.push(neib[0].x);
        //   checkedY.push(neib[0].y);
        // } else 
        if (neib.length !== 0) {
          let includes = false;
          for (let k = 0; k < checkedX.length; k += 1) {
            if (checkedX[k] === neib[0].x && checkedY[k] === neib[0].y) includes = true;
          }
          if (!includes) {
            console.log('woww');
            arr.push(neib[0]);
            checkedX.push(neib[0].x);
            checkedY.push(neib[0].y);
          }
        }
      });

      console.log(`wow ${i} ${arr.length}`);
      i += 1;

      // if (i === 20) return;
    }

    console.log(arr);
    // console.log('start check');
    // console.log(checkedX);
    // console.log(checkedY);
    // this.playersPointCards[`player${this.currnetPlayerNumber}`].forEach((item) => {
    // });
    return arr;
  }

  isComplete(cards, type) {
    let checCardsClose = true;
    cards.forEach((card) => {
      // console.log(this.checkOneCard(card));
      checCardsClose = checCardsClose && this.checkOneCard(card, type);
    });
    // console.log('end check');

    // if (checCardsClose) console.log('Castle close!');
    return checCardsClose;
  }

  checkOneCard(item, type) {
    const neibs = this.findNeibs(item.x, item.y, type);
    // console.log(neibs);
    let isClose1 = false;
    let isClose2 = false;
    let isClose3 = false;
    let isClose4 = false;
    let isClose = false;
    if ((item.card.side1 === 'land' && neibs[0].length !== 0) || item.card.side1 !== 'land') isClose1 = true;
    if ((item.card.side2 === 'land' && neibs[1].length !== 0) || item.card.side2 !== 'land') isClose2 = true;
    if ((item.card.side3 === 'land' && neibs[2].length !== 0) || item.card.side3 !== 'land') isClose3 = true;
    if ((item.card.side4 === 'land' && neibs[3].length !== 0) || item.card.side4 !== 'land') isClose4 = true;

    isClose = isClose1 && isClose2 && isClose3 && isClose4;

    // console.log(neibs[0].getSide);
    // console.log(neibs[1].getSide);
    // console.log(neibs[2].getSide);
    // console.log(neibs[3].getSide);
    // if (neibs[0].getSide || neibs[1].getSide || neibs[2].getSide || neibs[3].getSide) {
    //   // if (neibs[item.getSide].length > 0) isClose = true;
    //   isClose = true;
    // }

    // console.log(item);
    // console.log(neibs);
    // console.log(isClose);

    // if (neibs.length !== 0) {
    //   neibs.forEach((neib) => {
    //     console.log(neib);
    //     isClose = isClose && this.checkOneCard(neib);
    //   });
    // }

    return isClose;
  }

  findNeibs(x, y, type, playerNumber) {
    let neib1;
    let neib2;
    let neib3;
    let neib4;

    if (type === 'land') {
      neib1 = this.allCards.filter((cell) => {
        if (cell.x === x - CONSTANTS.SIZE && cell.y === y && cell.card.side4 === 'land') {
          // if (neib1.card.belongs)
          // cell.card.belongs = `player${this.currnetPlayerNumber}`;
          return cell;
        }
      });
      neib2 = this.allCards.filter((cell) => {
        if (cell.x === x && cell.y === y - CONSTANTS.SIZE && cell.card.side3 === 'land') {
          // if (playerNumber)
          // cell.card.belongs = `playerR${this.currnetPlayerNumber}`;
          return cell;
        }
      });
      neib3 = this.allCards.filter((cell) => {
        if (cell.x === x && cell.y === y + CONSTANTS.SIZE && cell.card.side2 === 'land') {
          // if (playerNumber)
          // cell.card.belongs = `player${this.currnetPlayerNumber}`;
          return cell;
        }
      });
      neib4 = this.allCards.filter((cell) => {
        if (cell.x === x + CONSTANTS.SIZE && cell.y === y && cell.card.side1 === 'land') {
          // if (playerNumber)
          // cell.card.belongs = `player${this.currnetPlayerNumber}`;
          return cell;
        }
      });
    } else if (type === 'road') {
      // __________________________________________________________________________________________
      // neib1 = this.allCards.filter((cell) => {
      //   if (cell.x === x - CONSTANTS.SIZE && cell.y === y && cell.card.side4 === 'land') {
      //     cell.card.belongs = `player${this.currnetPlayerNumber}`;
      //     return cell;
      //   }
      // });
      // neib2 = this.allCards.filter((cell) => {
      //   if (cell.x === x && cell.y === y - CONSTANTS.SIZE && cell.card.side3 === 'land') {
      //     cell.card.belongs = `player${this.currnetPlayerNumber}`;
      //     return cell;
      //   }
      // });
      // neib3 = this.allCards.filter((cell) => {
      //   if (cell.x === x && cell.y === y + CONSTANTS.SIZE && cell.card.side2 === 'land') {
      //     cell.card.belongs = `player${this.currnetPlayerNumber}`;
      //     return cell;
      //   }
      // });
      // neib4 = this.allCards.filter((cell) => {
      //   if (cell.x === x + CONSTANTS.SIZE && cell.y === y && cell.card.side1 === 'land') {
      //     cell.card.belongs = `player${this.currnetPlayerNumber}`;
      //     return cell;
      //   }
      // });
    }
    // console.log(this.allCards);
    // console.log([neib1, neib2, neib3, neib4]);
    // console.log(neib1);
    // if (neib1.length > 0) {
    //   // if (neib1[0].card.name.includes('castle_two_quarter')) neib1.getSide = 4;
    //   // this.allCards = this.allCards.map((cell) => {
    //   // });
    //   neib1.belongs = `player${this.currnetPlayerNumber}`;
    // }
    // if (neib2.length > 0) {
    //   // if (neib2[0].card.name.includes('castle_two_quarter')) neib1.getSide = 3;
    //   neib2.belongs = `player${this.currnetPlayerNumber}`;
    // }
    // if (neib3.length > 0) {
    //   // if (neib3[0].card.name.includes('castle_two_quarter')) neib1.getSide = 2;
    //   neib3.belongs = `player${this.currnetPlayerNumber}`;
    // }
    // if (neib4.length > 0) {
    //   // if (neib4[0].card.name.includes('castle_two_quarter')) neib1.getSide = 1;
    //   neib4.belongs = `player${this.currnetPlayerNumber}`;
    // }
    // console.log([neib1, neib2, neib3, neib4]);
    console.log([neib1, neib2, neib3, neib4]);
    console.log(neib4[0]);

    if (neib1.length > 0) {
      // neib2.card.belongs = neib1.card.belongs;
      // neib3.card.belongs = neib1.card.belongs;
      // neib4.card.belongs = neib1.card.belongs;
      if (neib1[0].card.belongs !== 'nobody') this.localOwner = neib1[0].card.belongs;
    }

    if (neib2.length > 0) {
      // neib1.card.belongs = neib2.card.belongs;
      // neib3.card.belongs = neib2.card.belongs;
      // neib4.card.belongs = neib2.card.belongs;
      if (neib2[0].card.belongs !== 'nobody') this.localOwner = neib2[0].card.belongs;
    }

    if (neib3.length > 0) {
      // neib1.card.belongs = neib3.card.belongs;
      // neib2.card.belongs = neib3.card.belongs;
      // neib4.card.belongs = neib3.card.belongs;
      if (neib3[0].card.belongs !== 'nobody') this.localOwner = neib3[0].card.belongs;
    }

    if (neib4.length > 0) {
      // neib1[0].card.belongs = neib4.card.belongs;
      // neib2[0].card.belongs = neib4.card.belongs;
      // neib3[0].card.belongs = neib4.card.belongs;
      if (neib4[0].card.belongs !== 'nobody') this.localOwner = neib4[0].card.belongs;
    }

    console.log(this.localOwner);
    return [neib1, neib2, neib3, neib4];
  }

  checkOwner(item, type) {
    const arr = this.getCheckPoints(item, type);
    console.log(arr);
    let isBusy = true;
    arr.forEach((card) => {
      console.log(card.card.belongs);
      console.log(`player${this.currnetPlayerNumber}`);
      if (card.card.belongs === `player${this.currnetPlayerNumber}`) {
        isBusy = false;
      }
      if (card.card.belongs === 'nobody') {
        isBusy = false;
      }
    });

    console.log(isBusy);

    return isBusy;
  }
}
