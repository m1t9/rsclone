import loadImages from '../data/loadImages.js'
import { cardNames } from '../utils/objectGenerator.js'

export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' })
  }

  preload() {
    let width = this.game.config.width;
    let graphics = this.add.graphics();
    let newGraphics = this.add.graphics();
    let progressBar = this.add.rectangle((width / 2) - 400, 450, 805, 50);
    let progressBarFill = this.add.rectangle((width / 2) - 395, 455, 795, 40);
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRectShape(progressBar);
    newGraphics.fillStyle(0x3587e2, 1);
    newGraphics.fillRectShape(progressBarFill);

    let loadingText = this.add.text((width / 2) - 100, 380, 'Loading...', {
      fontFamily: 'Thintel',
      fontSize: '60px',
      fill: '#fff',
    });

    loadImages.call(this);

    this.load.audio('kingdom_sound', './assets/audio/kingdom.mp3');
    // this.load.image('settings', './assets/btns/settings.png');
    this.load.image('settings_2', './assets/btns/settings_2.png');
    this.load.image('start_btn', './assets/btns/start_btn.png');
    this.load.image('save_btn', './assets/btns/save_btn.png');
    this.load.image('load_btn', './assets/btns/load_btn.png');
    this.load.image('about_btn', './assets/btns/about_btn.png');
    this.load.image('options_btn', './assets/btns/options_btn.png');
    this.load.image('sound_btn', './assets/btns/sound_btn.png');
    this.load.image('no_sound_btn', './assets/btns/no_sound_btn.png');
    this.load.image('turn_btn', './assets/btns/turn_btn.png');
    this.load.image('set_chip_btn', './assets/btns/set_chip_btn.png');
    this.load.image('next_step_btn', './assets/btns/next_step_btn.png');

    this.load.on('progress', function (value) {
      newGraphics.clear();
      newGraphics.fillStyle(0x3587e2, 1);
      // this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(205, 205, percentage*390, 40));
      newGraphics.fillRect((width / 2) - 395, 455, 795 * value, 40);
      loadingText.setText('Loading ' + (value * 100).toFixed(2) + '%');
    });

    this.load.on('complete', this.completeBar, { scene: this.scene });
  }

  async completeBar() {
    this.scene.start('UIScene');
    setTimeout(() => {
      this.scene.start('MainScene');
    }, 1110);
  }
}
