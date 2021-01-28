export default class StartScreen extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScreen' });
  }

  preload() {
    this.load.image('cursor', './assets/other/cursor.png');
    this.load.image('new_game', './assets/btns/start_btn.png');
    this.load.image('options', './assets/btns/options_btn.png');

    this.load.image('castle1', './assets/startScreen/castle_01.png')
    this.load.image('castle2', './assets/startScreen/castle_02.png');
    this.load.image('castle3', './assets/startScreen/castle_03.png');
    this.load.image('castle4', './assets/startScreen/castle_04.png');
    this.load.image('castle5', './assets/startScreen/castle_05.png');
    this.load.image('castle6', './assets/startScreen/castle_06.png');

    this.load.image('grey_btn', './assets/btns/grey_button06.png');
    this.load.scenePlugin(
      'rexuiplugin',
      'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      'rexUI',
      'rexUI',
    );
  }

  create() {
    // this.stage.background = 0x1b1a1c;
    this.cameras.main.setBackgroundColor(0x1b1a1c);

    this.input.setDefaultCursor('url(./assets/other/cursor.png), pointer');

    this.anims.create({
      key: 'castleAnim',
      frames: [
        { key: 'castle1', duration: 100 },
        { key: 'castle2', duration: 100 },
        { key: 'castle3', duration: 100 },
        { key: 'castle4', duration: 100 },
        { key: 'castle5', duration: 100 },
        { key: 'castle6', duration: 100 },
      ],
      frameRate: 8,
      repeat: -1,
    });

    this.add.sprite(this.game.config.width / 2 + 150, 430, 'castle1').setScale(1.1).play('castleAnim');

    const startBtnBackground = this.add.image(0, 0, 'new_game');
    const optionsBtnBackground = this.add.image(0, 0, 'options');
    let startScreenBtns = this.rexUI.add
      .buttons({
        x: 0,
        y: 0,
        width: 200,
        orientation: 'y',
        space: {
          item: 10,
        },
        anchor: {
          left: 'center-400',
          centerY: 'center-30',
        },
        buttons: [
          createBtn(this, 'New Game', startBtnBackground),
          createBtn(this, 'Options', optionsBtnBackground),
        ],
        // space: { item: 10 },
        expand: true
      })
      .layout();

    startScreenBtns.on('button.click', function (button, index, pointer, event) {
      console.log(`Click button ${button.text}`);
      // this.scene.launch('UIScene');
      // this.scene.launch('MainScene');
      this.scene.launch('Boot');
      this.scene.remove('StartScreen');
      // startBtn.clearButtons(true);
    }, this);
  }
}

const createBtn = function (scene, text, background) {
  return scene.rexUI.add.label({
    width: 30,
    height: 55,
    name: text,
    text: scene.add.text(0, 0, text, {
      fontSize: 18,
      color: 'black',
    }),
    background: background,
    space: {
      left: 30,
      right: 45,
      top: 10,
      bottom: 10,
      // item: 10
    },
    align: 'center',
  });
}
