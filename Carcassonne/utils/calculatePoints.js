/* eslint-disable import/extensions */
import CONSTANTS from './CONSTANTS.js';

export default function calculatePoints(cards, boardCards) {
  let count = 0;
  console.log(cards);

  cards.forEach((card) => {
    const currentBoardCard = boardCards.find((boardCard) => (boardCard.x === card.x
      && boardCard.y === card.y));
    // let currentBoardCard;
    // boardCards.forEach((boardCard) => {
    //   console.log(boardCard.x);
    //   console.log(card.x);
    //   if (boardCard.x === card.card.x && boardCard.y === card.card.y) currentBoardCard = boardCard;
    // });

    // console.log(boardCards[0].x);
    // console.log(cards);
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
