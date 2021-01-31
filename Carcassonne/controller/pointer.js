function setChip(side, x, y, z) {
  this.board.playersChips[`player${this.board.currnetPlayerNumber}`] -= 1;
  this.board.currentCard.chipPos = side;
  this.board.destroyPointers();
  console.log(`X: ${x} Y: ${y}`);
  // console.log(x - 10);
  // const xx = x - 50;
  // const yy = y - 50;
  // this.add.isoSprite(x + 30, y - 30, 50, 'blue_chip', this.sideGroup);
  this.add.isoSprite(x, y, z, 'blue_chip', this.sideGroup);
}

export default function addPointerSides(x, y) {
  const shape_side1 = new Phaser.Geom.Polygon([
    new Phaser.Geom.Point(0, 75),
    new Phaser.Geom.Point(94, 75),
    new Phaser.Geom.Point(150, 48),
    new Phaser.Geom.Point(150, 0),
    new Phaser.Geom.Point(0, 75),
  ]);
  const shape_side2 = new Phaser.Geom.Polygon([
    new Phaser.Geom.Point(150, 0),
    new Phaser.Geom.Point(150, 46),
    new Phaser.Geom.Point(205, 75),
    new Phaser.Geom.Point(300, 75),
    new Phaser.Geom.Point(150, 0),
  ]);
  const shape_side3 = new Phaser.Geom.Polygon([
    new Phaser.Geom.Point(0, 75),
    new Phaser.Geom.Point(95, 75),
    new Phaser.Geom.Point(150, 105),
    new Phaser.Geom.Point(150, 150),
    new Phaser.Geom.Point(0, 75),
  ]);
  const shape_side4 = new Phaser.Geom.Polygon([
    new Phaser.Geom.Point(205, 75),
    new Phaser.Geom.Point(300, 75),
    new Phaser.Geom.Point(150, 150),
    new Phaser.Geom.Point(150, 100),
    new Phaser.Geom.Point(205, 75),
  ]);

  const shape_side5 = new Phaser.Geom.Polygon([
    new Phaser.Geom.Point(95, 75),
    new Phaser.Geom.Point(150, 45),
    new Phaser.Geom.Point(205, 75),
    new Phaser.Geom.Point(150, 104),
    new Phaser.Geom.Point(95, 75),
  ]);

  const side1 = this.add.isoSprite(x, y, 1, 'pointer_side1', this.sideGroup);
  const side2 = this.add.isoSprite(x, y, 1, 'pointer_side2', this.sideGroup);
  const side3 = this.add.isoSprite(x, y, 1, 'pointer_side3', this.sideGroup);
  const side4 = this.add.isoSprite(x, y, 1, 'pointer_side4', this.sideGroup);
  const side5 = this.add.isoSprite(x, y, 1, 'pointer_side5', this.sideGroup);

  side1.alpha = 0.05;
  side2.alpha = 0.05;
  side3.alpha = 0.05;
  side4.alpha = 0.05;
  side5.alpha = 0.05;

  // const sideGroup = this.add.group({
  //   classType: Phaser.GameObjects.Sprite,
  //   defaultKey: null,
  //   defaultFrame: null,
  //   active: true,
  //   maxSize: -1,
  //   runChildUpdate: false,
  //   createCallback: null,
  //   removeCallback: null,
  //   createMultipleCallback: null,
  // });

  side1.setInteractive(shape_side1, Phaser.Geom.Polygon.Contains);
  side2.setInteractive(shape_side2, Phaser.Geom.Polygon.Contains);
  side3.setInteractive(shape_side3, Phaser.Geom.Polygon.Contains);
  side4.setInteractive(shape_side4, Phaser.Geom.Polygon.Contains);
  side5.setInteractive(shape_side5, Phaser.Geom.Polygon.Contains);

  // console.log(sideGroup);
  // sideGroup.add(side1);
  // sideGroup.add(side2);
  // sideGroup.add(side3);
  // sideGroup.add(side4);
  // sideGroup.add(side5);
  // console.log(sideGroup);

  // const testSprite = new Phaser.Plugin.Isometric.IsoSprite(this, x, y, 1, 'pointer_side1');
  // console.log(testSprite);
  // this.sideGroup.setInteractive(shape_side5, Phaser.Geom.Polygon.Contains);

  side1.on('pointerover', () => {
    side1.alpha = 0.5;
  });

  side1.on('pointerout', () => {
    side1.alpha = 0.01;
  });

  side2.on('pointerover', () => {
    side2.alpha = 0.5;
  });

  side2.on('pointerout', () => {
    side2.alpha = 0.01;
  });

  side3.on('pointerover', () => {
    side3.alpha = 0.5;
  });

  side3.on('pointerout', () => {
    side3.alpha = 0.01;
  });

  side4.on('pointerover', () => {
    side4.alpha = 0.5;
  });

  side4.on('pointerout', () => {
    side4.alpha = 0.01;
  });

  side5.on('pointerover', () => {
    side5.alpha = 0.5;
  });

  side5.on('pointerout', () => {
    side5.alpha = 0.01;
  });

  side1.on('pointerup', () => setChip.call(this, 1, x - 25, y + 20, 50));
  side2.on('pointerup', () => setChip.call(this, 2, x + 30, y - 30, 50));
  side3.on('pointerup', () => setChip.call(this, 3, x - 10, y + 40, 1));
  side4.on('pointerup', () => setChip.call(this, 4, x + 30, y - 20, 1));
  side5.on('pointerup', () => setChip.call(this, 5, x, y, 20));

  return [side1, side2, side3, side4, side5];
}
