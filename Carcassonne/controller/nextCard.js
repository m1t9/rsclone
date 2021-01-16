/* eslint-disable import/extensions */
import PlayerCard from '../model/PlayerCard.js';
import CARDS from '../data/gameCards.js';

export default function nextCard() {
  const newCardNumber = Math.floor(Math.random() * Math.floor(2));
  const newCard = CARDS[newCardNumber];

  this.currentCardDir = 1;
  this.currentCard = new PlayerCard(
    newCard.side1,
    newCard.side2,
    newCard.side3,
    newCard.side4,
    newCard.name,
  );

  this.currentCardTexture = `${this.currentCard.name}_${this.currentCardDir}`;
}
