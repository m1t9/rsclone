/* eslint-disable import/extensions */
import CONSTANTS from './CONSTANTS.js';

export default function calculatePoints(cards, boardCards) {
  let count = 0;

  cards.forEach((card) => {
    const currentBoardCard = boardCards.find((boardCard) => (boardCard.x === card.x
      && boardCard.y === card.y));
    if (!currentBoardCard.isCalculated) {
      if (card.card.name.includes(CONSTANTS.TWO_SHIELD)) {
        count += 6;
      } else if (card.card.name.includes(CONSTANTS.ONE_SHIELD)) {
        count += 4;
      } else {
        count += 2;
      }
    }
  });

  return count;
}
