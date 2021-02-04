export default class Card {
  constructor(
    number,
    x,
    y,
    side1 = 'none',
    side2 = 'none',
    side3 = 'none',
    side4 = 'none',
    name = 'empty',
  ) {
    this.number = number;
    this.x = x;
    this.y = y;
    this.side1 = side1;
    this.side2 = side2;
    this.side3 = side3;
    this.side4 = side4;
    this.name = name;
  }
}
