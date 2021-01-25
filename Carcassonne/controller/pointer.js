export default function addPointerSides(cell, x, y) {
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

  const side1 = this.add.isoSprite(x, y, 1, 'pointer_side1');
  const side2 = this.add.isoSprite(x, y, 1, 'pointer_side2');
  const side3 = this.add.isoSprite(x, y, 1, 'pointer_side3');
  const side4 = this.add.isoSprite(x, y, 1, 'pointer_side4');
  const side5 = this.add.isoSprite(x, y, 1, 'pointer_side5');

  side1.alpha = 0.05;
  side2.alpha = 0.05;
  side3.alpha = 0.05;
  side4.alpha = 0.05;
  side5.alpha = 0.05;

  side1.setInteractive(shape_side1, Phaser.Geom.Polygon.Contains);
  side2.setInteractive(shape_side2, Phaser.Geom.Polygon.Contains);
  side3.setInteractive(shape_side3, Phaser.Geom.Polygon.Contains);
  side4.setInteractive(shape_side4, Phaser.Geom.Polygon.Contains);
  side5.setInteractive(shape_side5, Phaser.Geom.Polygon.Contains);

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
}
