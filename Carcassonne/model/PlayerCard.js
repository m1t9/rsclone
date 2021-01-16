export default class PlayerCard {
  constructor(
    side1,
    side2,
    side3,
    side4,
    name = 'playerCard',
  ) {
    this.side1 = side1;
    this.side2 = side2;
    this.side3 = side3;
    this.side4 = side4;
    this.name = name;
  }

  turnCard() {
    const temp1 = this.side1;
    const temp2 = this.side2;
    const temp3 = this.side3;
    const temp4 = this.side4;
    this.side1 = temp3;
    this.side2 = temp1;
    this.side3 = temp4;
    this.side4 = temp2;
  }
}
