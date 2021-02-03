/* eslint-disable import/extensions */
import PlayerCard from '../model/PlayerCard.js';
import CARDS from '../data/gameCards.js';

export default function nextCard(step) {
  const newCard = CARDS[step];

  this.currentCardDir = 1;
  this.currentCard = new PlayerCard(
    newCard.side1,
    newCard.side2,
    newCard.side3,
    newCard.side4,
    newCard.name,
    newCard.point1,
    newCard.point2,
    newCard.point3,
    newCard.point4,
    newCard.point5,
  );

  this.currentCardTexture = `${this.currentCard.name}_${this.currentCardDir}`;
}
