/* eslint-disable import/extensions */
import { objectGenerator } from '../utils/objectGenerator.js';
import shuffle from '../utils/shuffle.js';

const CARDS = shuffle(shuffle(shuffle(objectGenerator())));

export default CARDS;
