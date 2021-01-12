export default class Card {
  constructor(
    number,
    x,
    y,
    left = 'none',
    right = 'none',
    top = 'none',
    bottom = 'none',
    type = 'empty',
  ) {
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
    this.type = type;
    this.number = number;
    this.x = x;
    this.y = y;
  }
}
