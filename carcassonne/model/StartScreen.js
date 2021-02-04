import CONSTANTS from '../utils/CONSTANTS.js';
import addRules from '../utils/addGameRules.js';
import { en, ru, de } from '../utils/gameObjectsLang.js';

export default class StartScreen extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScreen' });

    this.playerNames = [];
    this.lang = en;
    this.selectLang = {
      en,
      ru,
      de,
    };
  }

  preload() {
    window.StartScreen = this;
    this.load.image('cursor', './assets/other/cursor.png');
    this.load.image('new_game', './assets/btns/start_btn.png');
    this.load.image('about', './assets/btns/about_btn.png');
    this.load.image('game_logo', './assets/other/logo.png');
    this.load.image('game_rules', './assets/other/rules_scroll.png');
    this.load.image('castle1', './assets/startScreen/castle_01.png');
    this.load.image('castle2', './assets/startScreen/castle_02.png');
    this.load.image('castle3', './assets/startScreen/castle_03.png');
    this.load.image('castle4', './assets/startScreen/castle_04.png');
    this.load.image('castle5', './assets/startScreen/castle_05.png');
    this.load.image('castle6', './assets/startScreen/castle_06.png');

    this.load.image('lang_btn', './assets/btns/language_btn.png');
    this.load.image('en_btn', './assets/btns/language_btn_small.png');
    this.load.image('ru_btn', './assets/btns/language_btn_small.png');
    this.load.image('de_btn', './assets/btns/language_btn_small.png');

    this.load.image('grey_btn', './assets/btns/grey_button06.png');
    this.load.scenePlugin(
      'rexuiplugin',
      'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      'rexUI',
      'rexUI',
    );
    this.load.plugin('rextexteditplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js', true);
  }

  create() {
    this.cameras.main.setBackgroundColor(CONSTANTS.START_SCENE_BACKGROUND);
    this.input.setDefaultCursor('url(./assets/other/cursor.png), pointer');
    this.logo = this.add.sprite(this.game.config.width / 2 + 220, 100, 'game_logo');

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

    this.castle = this.add.sprite(this.game.config.width / 2 + 150, this.game.config.height / 2 + 50, 'castle1').play('castleAnim');

    if (window.innerWidth <= 1280) {
      this.castle.setScale(0.8);
      this.logo.setScale(0.3);
      this.logo.setPosition(this.game.config.width / 2 + 150, 100);
    } else if (window.innerWidth > 1280) {
      this.castle.setScale(1.2);
      this.logo.setScale(0.5);
    }

    const startBtnBackground = this.add.image(0, 0, 'new_game');
    const aboutBtnBackground = this.add.image(0, 0, 'about');
    const langBtnBackground = this.add.image(0, 0, 'lang_btn');
    const startScreenBtns = this.rexUI.add
      .buttons({
        x: 0,
        y: 0,
        width: (window.innerWidth > 1280) ? 200 : 150,
        orientation: 'y',
        space: {
          item: (window.innerWidth > 1280) ? 10 : 8,
        },
        anchor: (window.innerWidth > 1280) ? { left: 'center-400', centerY: 'center+50' } : { left: 'center-220', centerY: 'center+40' },
        buttons: [
          createBtn(this, this.lang.newGame_btn.name, startBtnBackground, 10, 50, 0, 10),
          createBtn(this, this.lang.gameRules_btn.name, aboutBtnBackground, 10, 40, 0, 10),
          createBtn(this, this.lang.lang_btn.name, langBtnBackground, 10, 50, 0, 10),
        ],
        expand: true,
      })
      .layout();

    startScreenBtns.on('button.over', (button, index, ponter, event) => {
      button.setScale(CONSTANTS.BTNS_ACTIVE_SCALE);
    });

    startScreenBtns.on('button.out', (button, index, ponter, event) => {
      button.setScale(CONSTANTS.BTNS_DEFAULT_SCALE);
    });

    const rulesBtn = startScreenBtns.getButton(1);
    this.rulesOpen = undefined;

    rulesBtn.on('pointerup', function (pointer) {
      if (this.rulesOpen === undefined) {
        rulesBtn.backgroundChildren[0].setTint(CONSTANTS.BTNS_HOVER_COLOR);
        rulesBtn.setScale(CONSTANTS.BTNS_DEFAULT_SCALE);

        const rulesBackground = this.add.image(0, 0, 'game_rules');
        this.rulesOpen = addRules(this, this.game.config.width / 2 + 160, 460,
          rulesBackground, this.lang.gameRulesContent.text);

        if (window.innerWidth <= 1280) {
          this.rulesOpen.setPosition(this.game.config.width / 2 + 160, 300);
        }
      } else if (!this.rulesOpen.isInTouching(pointer)) {
        // rulesOpen.destroy();
        this.rulesOpen.fadeOut(300);
        this.rulesOpen = undefined;
        rulesBtn.backgroundChildren[0].clearTint();
      }
    }, this);

    const newGameBtn = startScreenBtns.getButton(0);
    this.dialog = undefined;

    newGameBtn.on('pointerup', function (pointer) {
      newGameBtn.backgroundChildren[0].setTint(CONSTANTS.BTNS_HOVER_COLOR);
      newGameBtn.setScale(CONSTANTS.BTNS_DEFAULT_SCALE);
      newGameBtn.disableInteractive();

      this.selectPlayersNum = this.rexUI.add.dialog({
        width: (window.innerWidth > 1280) ? 300 : 200,
        anchor: (window.innerWidth > 1280) ? { left: 'center-450', centerY: 'center-210' } : { left: 'center-480', centerY: 'center+40' },
        background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0xe3b483),
        title: this.rexUI.add.label({
          background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0xaf6a39),
          text: this.add.text(0, 0, this.lang.selectNumberOfPlayers.text, {
            fontFamily: 'Thintel',
            fontSize: (window.innerWidth > 1280) ? '30px' : '23px',
            align: 'right',
          }),
          space: {
            left: 11,
            right: 31,
            top: 5,
            bottom: 10,
          },
        }),
        choices: [
          createLabel(this, '2'),
          createLabel(this, '3'),
          createLabel(this, '4'),
        ],
        space: {
          title: 10,
          choice: 5,
          left: 15,
          right: 15,
          top: 15,
          bottom: 15,
        },
        align: {
          title: 'center',
          content: 'center',
          description: 'center',
          choices: 'center',
          actions: 'center',
        },
        expand: {
          content: false,
        },
      })
        .layout()
        .fadeIn(500);

      this.selectPlayersNum.on('button.click', function (button, groupName, index) {
        this.numOfPlayers = button.text;
        this.selectPlayersNum.destroy();

        if (this.dialog === undefined) {
          // this.selectPlayersNum = null;

          this.controlTooltip = this.add.text(newGameBtn.x + 700, 180, this.lang.controlToolTip.text, { fontFamily: 'Thintel', fontSize: '25px', wordWrap: { width: 380 }, align: 'left' });

          this.tooltipStart = this.add.text(newGameBtn.x - 430, 150, this.lang.tooltip_start.text, {
            fontFamily: 'Thintel', fontSize: '30px', wordWrap: { width: 200 }, align: 'center',
          });

          this.dialog = addDialog(this, Number(this.numOfPlayers), newGameBtn);

          if (window.innerWidth <= 1280) {
            this.tooltipStart.setPosition(this.game.config.width / 2 - 470, 45);
            this.controlTooltip.setPosition(this.game.config.width / 2 + 320, 115);
            this.controlTooltip.setWordWrapWidth(300);
            this.controlTooltip.setAlign('justify');
            this.controlTooltip.setFontSize('23px');
          }
        }
      }, this)
        .on('button.over', (button, groupName, index) => {
          button.getElement('background').setStrokeStyle(4, 0x7b4626);
        }, this)
        .on('button.out', (button, groupName, index) => {
          button.getElement('background').setStrokeStyle();
        }, this);
    }, this);

    const changeLangBtn = startScreenBtns.getButton(2);
    this.selectLangBtns = undefined;

    changeLangBtn.on('pointerup', function (pointer) {
      if (this.selectLangBtns === undefined) {
        changeLangBtn.backgroundChildren[0].setTint(CONSTANTS.BTNS_HOVER_COLOR);
        changeLangBtn.setScale(CONSTANTS.BTNS_DEFAULT_SCALE);

        const enBtnBackground = this.add.image(0, 0, 'en_btn');
        const ruBtnBackground = this.add.image(0, 0, 'ru_btn');
        const deBtnBackground = this.add.image(0, 0, 'de_btn');

        this.selectLangBtns = this.rexUI.add.buttons({
          x: changeLangBtn.x,
          y: changeLangBtn.y + 70,
          orientation: 'x',
          space: {
            item: 8,
          },
          buttons: [
            createBtn(this, 'en', enBtnBackground, 15, 15, 0, 10),
            createBtn(this, 'ru', ruBtnBackground, 15, 15, 0, 10),
            createBtn(this, 'de', deBtnBackground, 15, 15, 0, 10),
          ],
        })
          .layout()
          .fadeIn(500);

        this.selectLangBtns.on('button.click', function (button, groupName, index) {
          this.lang = this.selectLang[button.text];
          changeLangBtn.text = this.lang.lang_btn.name;
          changeLangBtn.setText(this.lang.lang_btn.name);
          rulesBtn.setText(this.lang.gameRules_btn.name);
          newGameBtn.setText(this.lang.newGame_btn.name);

          if (this.controlTooltip !== undefined) this.controlTooltip.setText(this.lang.controlToolTip.text);
          if (this.tooltipStart !== undefined) this.tooltipStart.setText(this.lang.tooltip_start.text);
          if (this.rulesOpen !== undefined) this.rulesOpen.setText(this.lang.gameRulesContent.text);

          if (this.selectPlayersNum !== undefined && this.selectPlayersNum.active === true) {
            this.selectPlayersNum.children[1].children[1].setText(this.lang.selectNumberOfPlayers.text);
          }

          if (this.dialog !== undefined && this.selectPlayersNum.active === false) {
            this.dialog.children[1].children[1].setText(this.lang.enterName.text);

            if (this.dialog.children[2].buttons.length === 3) {
              this.dialog.children[2].buttons[0].setText(this.lang.playerName.text);
              this.dialog.children[2].buttons[1].setText(this.lang.playerName.text);
              this.dialog.children[2].buttons[2].setText(this.lang.readyPlay.text);
            } else if (this.dialog.children[2].buttons.length === 4) {
              this.dialog.children[2].buttons[0].setText(this.lang.playerName.text);
              this.dialog.children[2].buttons[1].setText(this.lang.playerName.text);
              this.dialog.children[2].buttons[2].setText(this.lang.playerName.text);
              this.dialog.children[2].children[3].setText(this.lang.readyPlay.text);
            } else if (this.dialog.children[2].buttons.length === 5) {
              this.dialog.children[2].buttons[0].setText(this.lang.playerName.text);
              this.dialog.children[2].buttons[1].setText(this.lang.playerName.text);
              this.dialog.children[2].buttons[2].setText(this.lang.playerName.text);
              this.dialog.children[2].children[3].setText(this.lang.playerName.text);
              this.dialog.children[2].children[4].setText(this.lang.readyPlay.text);
            }
          }
        }, this);
      } else if (!this.selectLangBtns.isInTouching(pointer)) {
        this.selectLangBtns.fadeOut(300);
        this.selectLangBtns = undefined;
        changeLangBtn.backgroundChildren[0].clearTint();
      }
    }, this);
  }
}

const createInput = function (scene, content) {
  const keyObj = scene.input.keyboard.addKey('ENTER');
  const text = scene.add.text(0, 0, content, {
    color: 'white',
    fontFamily: 'Thintel',
    fontSize: (window.innerWidth > 1280) ? '30px' : '23px',
    fixedWidth: 150,
    fixedHeight: 40,
    align: 'center',
    halign: 'center',
  });

  text.setInteractive().on('pointerdown', () => {
    const config = {
      onTextChanged(textObject, text) {
        textObject.text = text;
      },
      selectAll: true,
    };

    scene.plugins.get('rextexteditplugin').edit(text, config);
    text.setColor('black');
  });

  return text;
};

const createInetactiveLabel = function (scene, content, backgroundColor) {
  return scene.rexUI.add.label({
    background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0xaf6a39),
    text: createInput(scene, content),
    space: (window.innerWidth > 1280) ? { left: 20, right: 10, top: 5, bottom: 5, } : { left: 10, right: 10, top: 5, bottom: 5 },
    align: 'center',
    halign: 'center',
  });
};

const createLabel = function (scene, text, backgroundColor) {
  return scene.rexUI.add.label({
    background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0xaf6a39),
    name: 'READY TO PLAY!',
    text: scene.add.text(0, 0, text, {
      fontFamily: 'Thintel',
      fontSize: (window.innerWidth > 1280) ? '30px' : '23px',
      align: 'center',
    }),
    space: {
      left: 10,
      right: 10,
      top: 5,
      bottom: 10,
    },
    align: 'center',
  });
};

const createBtn = function (scene, text, background, left = 0, right = 0, top = 0, bottom = 0) {
  return scene.rexUI.add.label({

    name: text,
    text: scene.add.text(0, 0, text, {
      fontFamily: 'Thintel',
      fontSize: (window.innerWidth > 1280) ? '38px' : '30px',
      color: 'black',
    }),
    background,
    space: {
      left,
      right,
      top,
      bottom,
    },
    align: 'center',
  });
};

const addDialog = function (scene, numberOfPlayers) {
  const dialog = scene.rexUI.add.dialog({
    width: (window.innerWidth > 1280) ? 300 : 200,
    anchor: (window.innerWidth > 1280) ? { left: 'center-455', centerY: 'center-210' } : { left: 'center-460', centerY: 'center+20' },
    background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0xe3b483),
    title: scene.rexUI.add.label({
      background: scene.rexUI.add.roundRectangle(0, 0, 100, 50, 20, 0xaf6a39),
      text: scene.add.text(0, 0, scene.lang.enterName.text, {
        fontFamily: 'Thintel',
        fontSize: (window.innerWidth > 1280) ? '30px' : '23px',
        align: 'center',
      }),
      space: (window.innerWidth > 1280) ? { left: 20, right: 20, top: 5, bottom: 10, } : { left: 10, right: 10, top: 5, bottom: 5 },
    }),
    choices: (new Array(numberOfPlayers).fill().map((v) => v = createInetactiveLabel(scene, scene.lang.playerName.text))).concat([createLabel(scene, scene.lang.readyPlay.text)]),
    space: {
      title: 5,
      content: 5,
      choice: 5,
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
    },
    align: 'center',
    expand: {
      content: false,
    },
  })
    .layout()
    .fadeIn(500);

  dialog.on('button.click', (button, groupName, index) => {

    if (button.name === 'READY TO PLAY!') {

      if (Number(scene.numOfPlayers) === 2) {

        scene.playerNames.push(dialog.getChoice(0).text, dialog.getChoice(1).text);

      } else if (Number(scene.numOfPlayers) === 3) {

        scene.playerNames.push(dialog.getChoice(0).text, dialog.getChoice(1).text, dialog.getChoice(2).text);

      } else if (Number(scene.numOfPlayers) === 4) {

        scene.playerNames.push(dialog.getChoice(0).text, dialog.getChoice(1).text, dialog.getChoice(2).text, dialog.getChoice(3).text);

      }
  
      scene.scene.launch('Boot');
      scene.scene.stop('StartScreen');

    }
  }, scene)
    .on('button.over', (button, groupName, index) => {
      button.getElement('background').setStrokeStyle(4, 0x7b4626);
    }, scene)
    .on('button.out', (button, groupName, index) => {
      button.getElement('background').setStrokeStyle();
    }, scene);

  return dialog;
};
