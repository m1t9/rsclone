/* eslint-disable import/extensions */
import { objectGenerator } from '../utils/objectGenerator.js';
import shuffle from '../utils/shuffle.js';

// const CARDS = [
//   {
//     number: 0,
//     name: 'road_straight',
//     side1: 'grass',
//     side2: 'road',
//     side3: 'road',
//     side4: 'grass',
//     points: 1,
//   },
//   {
//     number: 1,
//     name: 'road_bend',
//     side1: 'grass',
//     side2: 'grass',
//     side3: 'road',
//     side4: 'road',
//     points: 1,
//   },
// ];
const CARDS = shuffle(shuffle(shuffle(objectGenerator())));

// (function() {
//   // const obj = objectGenerator();
//   console.log(CARDS);
// }());

export default CARDS;
