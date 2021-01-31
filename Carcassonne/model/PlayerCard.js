export default class PlayerCard {
  constructor(
    side1,
    side2,
    side3,
    side4,
    name,
    point1,
    point2,
    point3,
    point4,
    point5,
  ) {
    this.side1 = side1;
    this.side2 = side2;
    this.side3 = side3;
    this.side4 = side4;
    this.name = name;
    this.point1 = point1;
    this.point2 = point2;
    this.point3 = point3;
    this.point4 = point4;
    this.point5 = point5;
    this.side5 = 'center';
    this.chipPos = -1;
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

    const tempPoint1 = this.point1;
    const tempPoint2 = this.point2;
    const tempPoint3 = this.point3;
    const tempPoint4 = this.point4;
    this.point1 = tempPoint3;
    this.point2 = tempPoint1;
    this.point3 = tempPoint4;
    this.point4 = tempPoint2;
  }
}
