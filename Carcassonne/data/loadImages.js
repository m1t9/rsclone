/* eslint-disable import/extensions */
import { cardNames } from '../utils/objectGenerator.js';
import CONSTANTS from '../utils/CONSTANTS.js';

export default function loadImages() {
  // this.load.json('empty-mett', 'assets/card-shape.json');
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