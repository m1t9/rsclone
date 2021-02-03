import loadImages from '../data/loadImages.js';
// import { cardNames } from '../utils/objectGenerator.js'

export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  preload() {
    const { width } = this.game.config;
    const graphics = this.add.graphics();
    const newGraphics = this.add.graphics();
    const progressBar = this.add.rectangle((width / 2) - 400, 450, 805, 50);
    const progressBarFill = this.add.rectangle((width / 2) - 395, 455, 795, 40);
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRectShape(progressBar);
    newGraphics.fillStyle(0x3587e2, 1);
    newGraphics.fillRectShape(progressBarFill);

    const loadingText = this.add.text((width / 2) - 100, 380, 'Loading...', {
      fontFamily: 'Thintel',
      fontSize: '60px',
      fill: '#fff',
    });

    this.load.scenePlugin(
      'rexuiplugin',
      'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      'rexUI',
      'rexUI',
    );

    this.load.image('gameBg', './assets/other/image_1.png');
    this.load.audio('kingdom_sound', './assets/audio/kingdom.mp3');
    this.load.image('settings_2', './assets/btns/settings_2.png');
    this.load.image('start_btn', './assets/btns/start_btn.png');
    this.load.image('save_btn', './assets/btns/save_btn.png');
    this.load.image('load_btn', './assets/btns/load_btn.png');
    this.load.image('about_btn', './assets/btns/about_btn.png');
    this.load.image('options_btn', './assets/btns/options_btn.png');
    this.load.image('sound_btn', './assets/btns/sound_btn.png');
    this.load.image('no_sound_btn', './assets/btns/no_sound_btn.png');
    this.load.image('game_rules', './assets/other/rules_scroll.png');
    this.load.image('score_field', './assets/other/score_field.png');
    this.load.image('open_score_btn', './assets/btns/score_board_btn.png');
    // this.load.image('lang_btn', './assets/btns/language_btn.png');
    // this.load.image('small_lang_btn', './assets/btns/language_btn_small.png');

    this.load.image('turn_btn', './assets/btns/turn_btn.png');
    this.load.image('set_chip_btn', './assets/btns/set_chip_btn.png');
    this.load.image('next_step_btn', './assets/btns/next_step_btn.png');
    this.load.image('other_card_btn', './assets/btns/other_card_btn.png');

    loadImages.call(this);

    this.load.on('progress', (value) => {
      newGraphics.clear();
      newGraphics.fillStyle(0x3587e2, 1);
      // this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(205, 205, percentage*390, 40));
      newGraphics.fillRect((width / 2) - 395, 455, 795 * value, 40);
      loadingText.setText(`Loading ${(value * 100).toFixed(2)}%`);
    });

    this.load.on('complete', this.completeBar, { scene: this.scene });
  }

  async completeBar() {
    this.scene.start('UIScene');
    setTimeout(() => {
      this.scene.start('MainScene');
    }, 1000);
  }
}
