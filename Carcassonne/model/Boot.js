import loadImages from '../data/loadImages.js'
import { cardNames } from '../utils/objectGenerator.js'

export default class Boot extends Phaser.Scene {
  constructor () {
    super({ key: 'Boot' })
  }

  preload () {
    let width = this.game.config.width;
    let graphics = this.add.graphics();
    let newGraphics = this.add.graphics();
    let progressBar = this.add.rectangle((width / 2) - 400, 450, 805, 50);
    let progressBarFill = this.add.rectangle((width / 2) - 395, 455, 795, 40);
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRectShape(progressBar);
    newGraphics.fillStyle(0x3587e2, 1);
    newGraphics.fillRectShape(progressBarFill);

    let loadingText = this.add.text((width / 2) - 100, 400, 'Loading...', {
      fontSize: '30px',
      fill: '#fff'
    });

    loadImages.call(this);

    this.load.on('progress', function (value) {
      newGraphics.clear()
      newGraphics.fillStyle(0x3587e2, 1)
      // this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(205, 205, percentage*390, 40));
      newGraphics.fillRect((width/ 2) - 395, 455, 795 * value, 40)
      loadingText.setText('Loading ' + (value * 100).toFixed(2) + '%')
    })

    this.load.on('complete', this.completeBar, { scene: this.scene })
  }

  completeBar () {
    this.scene.start('UIScene')
    this.scene.start('MainScene')
  }
}
