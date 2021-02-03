/* eslint-disable import/extensions */
import { cardNames } from '../utils/objectGenerator.js';
import CONSTANTS from '../utils/CONSTANTS.js';

export default function loadImages() {
  this.load.image('back', 'assets/back2.png');
  this.load.image('chip_1', 'assets/chips/meeple_blue.png');
  this.load.image('chip_2', 'assets/chips/meeple_green.png');
  this.load.image('chip_3', 'assets/chips/meeple_red.png');
  this.load.image('chip_4', 'assets/chips/meeple_yellow.png');
  this.load.image('chipHUD_1', 'assets/chips/board_meeple_blue_big.png');
  this.load.image('chipHUD_2', 'assets/chips/board_meeple_green_big.png');
  this.load.image('chipHUD_3', 'assets/chips/board_meeple_red_big.png');
  this.load.image('chipHUD_4', 'assets/chips/board_meeple_yellow_big.png');
  this.load.image('chipBoard_1', 'assets/chips/board_meeple_blue_small.png');
  this.load.image('chipBoard_2', 'assets/chips/board_meeple_green_small.png');
  this.load.image('chipBoard_3', 'assets/chips/board_meeple_red_small.png');
  this.load.image('chipBoard_4', 'assets/chips/board_meeple_yellow_small.png');
  this.load.image('pointer_side1', 'assets/pointers/point_side1.png');
  this.load.image('pointer_side2', 'assets/pointers/point_side2.png');
  this.load.image('pointer_side3', 'assets/pointers/point_side3.png');
  this.load.image('pointer_side4', 'assets/pointers/point_side4.png');
  this.load.image('pointer_side5', 'assets/pointers/point_side5.png');
  this.load.image('empty', `assets/${CONSTANTS.EMPTY_CELL}.png`);
  cardNames.forEach((name) => {
    for (let i = 1; i < 5; i += 1) {
      this.load.image(`${name}_${i}`, `assets/pack3/${name}_${i}.png`);
    }
  });

  cardNames.forEach((name) => {
    for (let i = 1; i < 5; i += 1) {
      this.load.image(`${name}`, `assets/hud_cards/${name}.png`);
    }
  });
}