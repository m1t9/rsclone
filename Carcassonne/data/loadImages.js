/* eslint-disable import/extensions */
import { cardNames } from '../utils/objectGenerator.js';

export default function loadImages() {
  // this.load.image('tile', 'assets/test2.png');
  this.load.image('empty', 'assets/test2emptyB.png');
  // this.load.image('t1', 'assets/card1test.png');
  // this.load.image('road_straight_1', 'assets/pack2/road_straight_1.png');
  // this.load.image('road_straight_2', 'assets/pack2/road_straight_2.png');
  // this.load.image('road_straight_3', 'assets/pack2/road_straight_3.png');
  // this.load.image('road_straight_4', 'assets/pack2/road_straight_4.png');
  // this.load.image('road_bend_1', 'assets/pack2/road_bend_1.png');
  // this.load.image('road_bend_2', 'assets/pack2/road_bend_2.png');
  // this.load.image('road_bend_3', 'assets/pack2/road_bend_3.png');
  // this.load.image('road_bend_4', 'assets/pack2/road_bend_4.png');
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
