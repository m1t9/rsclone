/* eslint-disable import/extensions */
import { cardNames } from '../utils/objectGenerator.js';
import CONSTANTS from '../utils/CONSTANTS.js';

export default function loadImages() {
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