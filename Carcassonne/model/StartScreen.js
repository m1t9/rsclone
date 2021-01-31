import CONSTANTS from '../utils/CONSTANTS.js';

export default class StartScreen extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScreen' });
  }

  preload() {
    window.StartScreen = this;
    this.load.image('cursor', './assets/other/cursor.png');
    this.load.image('new_game', './assets/btns/start_btn.png');
    this.load.image('about', './assets/btns/about_btn.png');

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
    const optionsBtnBackground = this.add.image(0, 0, 'about');
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
          createBtn(this, 'About', optionsBtnBackground),
        ],
        // space: { item: 10 },
        expand: true
      })
      .layout();

    // startScreenBtns.on('button.click', function (button, index, pointer, event) {
    //   console.log(`Click button ${button.text}`);
    //   // this.scene.launch('Boot');
    //   // this.scene.stop('StartScreen');
    //   // startBtn.clearButtons(true);
    // }, this);

    startScreenBtns.on('button.over', function(button, index, ponter, event) {
      button.backgroundChildren[0].setTint(CONSTANTS.BTNS_HOVER_COLOR);
    });

    startScreenBtns.on('button.out', function(button, index, ponter, event) {
      button.backgroundChildren[0].clearTint();
    });

    let newGameBtn = startScreenBtns.getButton(0);
    newGameBtn.on('pointerup', function() {

      newGameBtn.disableInteractive();

      let dialog = this.rexUI.add.dialog({
        // x: 412,
        // y: 250,
        anchor: {
          left: 'center-455',
          centerY: 'center-220',
        },
        background: this.rexUI.add.roundRectangle(0, 0, 50, 50, 20, 0xe3b483),
        title: this.rexUI.add.label({
          background: this.rexUI.add.roundRectangle(0, 0, 50, 20, 10, 0xaf6a39),
          text: this.add.text(0, 0, 'Select the number of players', {
            fontFamily: 'Thintel',
            fontSize: '35px'
          }),
          space: {
            left: 15,
            right: 15,
            top: 0,
            bottom: 10
          }
        }),

        // content: this.add.text(0, 0, '1 + 1 + 1 + 1 + 1 = ', {
        //   fontSize: '24px'
        // }),

        choices: [
          createLabel(this, '2'),
          createLabel(this, '3'),
          createLabel(this, '4'),
        ],

        space: {
          title: 10,
          content: 0,
          choice: 10,

          left: 10,
          right: 10,
          top: 10,
          bottom: 10
        },
        align: 'center',

        expand: {
          content: false // Content is a pure text object
        }
      })
      .layout()
      .popUp(500);

      // this.print = this.add.text(0, 0, '')
      dialog.on('button.click', function (button, groupName, index) {
            // this.print.text += index + ': ' + button.text + '\n'
        this.numOfPlayers = button.text;
        this.scene.launch('Boot');
        this.scene.stop('StartScreen');
      },this)
        .on('button.over', function (button, groupName, index) {
          button.getElement('background').setStrokeStyle(2, 0x7b4626)
        })
        .on('button.out', function (button, groupName, index) {
          button.getElement('background').setStrokeStyle()
        })

    }, this);

  }
}

const createLabel = function (scene, text, backgroundColor) {
  return scene.rexUI.add.label({
    background: scene.rexUI.add.roundRectangle(0, 0, 50, 40, 20, 0xaf6a39),

    text: scene.add.text(0, 0, text, {
      fontFamily: 'Thintel',
      fontSize: '35px'
    }),
    space: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 5
    },
    align: 'center',
  })
}

const createBtn = function (scene, text, background) {
  return scene.rexUI.add.label({
    width: 30,
    height: 55,
    name: text,
    text: scene.add.text(0, 0, text, {
      fontFamily: 'Thintel',
      fontSize: '38px',
      color: 'black',
    }),
    background: background,
    space: {
      left: 30,
      right: 45,
      top: 0,
      bottom: 10,
      // item: 10
    },
    align: 'center',
  });
}
