/* eslint-disable import/extensions */
import CONSTANTS from '../utils/CONSTANTS.js';
import config from '../index.js';
// import MainScene from '../index.js';
import addRules from '../utils/addGameRules.js';
import { en, ru, de } from '../utils/gameObjectsLang.js';

export default class HUD extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene'});
    // super({ key: 'UIScene', active: true });
    
    this.score = 0;
    this.underCardText = '';
    this.currentCardHUD = null;
    // this.currentCardNumber = 0;
    this.music = undefined;
    this.musicON = true;
    // this.settingsBtn;
    this.lang = undefined;
  }

  // init() {
  //   this.nextBtn = this.add.image(this.game.config.width -  200, this.game.config.height - 100, 'next_step_btn').setInteractive();
  //   this.turnBtn = this.add.image(this.game.config.width -  150, this.game.config.height - 100, 'turn_btn').setInteractive();
  //   this.setChipBtn = this.add.image(this.game.config.width -  100, this.game.config.height - 100, 'set_chip_btn').setInteractive();
  // }

  preload() {
    window.HUD = this;
    // this.load.image('chip1', 'assets/chip-1.png');
    // this.load.image('road_straight', 'assets/pack1/road_straight.png');
    // this.load.image('road_bend', 'assets/pack1/road_bend.png');
    this.load.scenePlugin(
      'rexuiplugin',
      'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      'rexUI',
      'rexUI',
    );
  }
  
  enableNextButton() {
    this.nextBtn.setInteractive();
    this.nextBtn.clearTint();
  }

  disableNextButton() {
    this.nextBtn.setTint(CONSTANTS.BTNS_HOVER_COLOR);
    this.nextBtn.disableInteractive();
  }

  enableChipButton() {
    this.setChipBtn.setInteractive();
    this.setChipBtn.clearTint();
  }

  disableChipButton() {
    this.setChipBtn.setTint(CONSTANTS.BTNS_HOVER_COLOR);
    this.setChipBtn.disableInteractive();
  }

  enableTurnButton() {
    this.turnBtn.setInteractive();
    this.turnBtn.clearTint();
  }

  disableTurnButton() {
    this.turnBtn.setTint(CONSTANTS.BTNS_HOVER_COLOR);
    this.turnBtn.disableInteractive();
  }

  create() {
    this.lang = window.StartScreen.lang;
    // this.add.image(650, 410, 'chip1');
    const mainScene = this.scene.get('MainScene').board.currentCard;
    // this.add.text(10, 10, 'Current card:', { font: '20px', fill: '#ffffff' });
    this.underCardText = this.add.text(10, 5, `Current card (1 / ${CONSTANTS.CARDS_COUNT}):`, { fontFamily: 'Thintel', fontSize: '40px', fill: '#ffffff' });
    // this.currentCardHUD.setInteractive();
    // this.currentCardHUD.on('pointerdown', function (pointer) {
    //   console.log('current_card');
    // });

    this.music = this.sound.add('kingdom_sound', {
      volume: 0.5,
      rate: 1,
      loop: true,
      delay: 1000
    });
    // this.music.play();

    this.nextBtn = this.add.image(this.game.config.width - 300, this.game.config.height - 100, 'next_step_btn').setInteractive();
    this.turnBtn = this.add.image(this.game.config.width - 220, this.game.config.height - 100, 'turn_btn').setInteractive();
    this.setChipBtn = this.add.image(this.game.config.width - 140, this.game.config.height - 100, 'set_chip_btn').setInteractive();

    this.turnBtn.on('pointerover', function(pointer) {
      console.log(this.turnBtn.x)
      this.turnBtnText = this.add.text(this.turnBtn.x - 45, this.turnBtn.y - 70, this.lang.turnCard_btn.name, { color: 'black', fontFamily: 'Thintel', fontSize: '30px'});
    }, this)

    this.turnBtn.on('pointerout', function(pointer) {
      this.turnBtnText.destroy();
    }, this)

    this.nextBtn.on('pointerover', function(pointer) {
      this.nextBtnText = this.add.text(this.nextBtn.x - 45, this.nextBtn.y - 70, this.lang.nextStep_btn.name, { color: 'black', fontFamily: 'Thintel', fontSize: '30px'});
    }, this)

    this.nextBtn.on('pointerout', function(pointer) {
      this.nextBtnText.destroy();
    }, this);

    this.setChipBtn.on('pointerover', function(pointer) {
      this.setChipBtnText = this.add.text(this.setChipBtn.x - 45, this.setChipBtn.y - 70, this.lang.setChip_btn.name, { color: 'black', fontFamily: 'Thintel', fontSize: '30px'});
    }, this)

    this.setChipBtn.on('pointerout', function(pointer) {
      this.setChipBtnText.destroy();
    }, this)

    this.openScoreFieldBtn = this.add.image(this.game.config.width - 150, this.game.config.height - 400, 'open_score').setInteractive();
    this.openScoreFieldBtn.on('pointerup', function(pointer) {
      this.scoreField = this.add.sprite(this.game.config.width / 2 , this.game.config.height /2, 'score_field').setScale(0.8).setInteractive();
    }, this);

    let menu = undefined;
    const settingsBtn = this.add.image(this.game.config.width - 50, 40, 'settings_2').setInteractive();
    // this.settingsBtn = this.add.image(this.game.config.width - 50, 30, 'settings_2');

    const items = [
      { name: this.lang.newGame_btn.name },
      { name: this.lang.saveGame_btn.name },
      { name: this.lang.loadGame_btn.name },
      { name: this.lang.sound_btn.name },
      { name: this.lang.gameRules_btn.name },
      // { name: this.lang.lang_btn.name ,
      //   children: [
      //     { name: 'en' },
      //     { name: 'ru' },
      //     { name: 'de' },
      //   ]
      // },
    ];

    settingsBtn.on('pointerover', function () {
      this.setScale(CONSTANTS.BTNS_ACTIVE_SCALE);
    });

    settingsBtn.on('pointerout', function () {
      this.setScale(CONSTANTS.BTNS_DEFAULT_SCALE);
    });

    settingsBtn.on('pointerdown', function (pointer) {
      if (menu === undefined) {
        settingsBtn.setTint(CONSTANTS.BTNS_HOVER_COLOR);
        settingsBtn.setScale(CONSTANTS.BTNS_DEFAULT_SCALE);

        menu = createMenu(this, this.game.config.width - 200, 50, items);
      } else if (!menu.isInTouching(pointer)) {
        // console.log('collapse!');
        menu.collapse();
        menu = undefined;
        settingsBtn.clearTint();
      }
    }, this);

    // for (let i = 1; i < parseInt(window.StartScreen.numOfPlayers, 10) + 1; i += 1) {
    //   this["player_" + i] = this.add.text(700 + i*100, 20, `Player ${i}`, { fontFamily: 'Thintel', fontSize: '40px', fill: '#ffffff' });
    // }
    
    if (window.StartScreen.playerNames.length === 0) {
      this.players = new Array(Number(window.StartScreen.numOfPlayers)).fill().map((v, i) => v = `Player ${i + 1}`);
    } else {
      this.players = [...new Set(window.StartScreen.playerNames)];
    }

    console.log(this.players);
  
  }

  initHudCard(name) {
    setTimeout(() => {
      this.currentCardHUD = this.add.image(100, 140, name);
      this.currentCardHUD.setScale(0.3);
    }, 100);
  }

  getNextStepButton() {
    const buttons = this.controlBtns;
    // console.log(typeof this.controlBtns === 'undefined');
    // // while (typeof this.controlBtns === 'undefined') {
    // //   console.log(false);
    // // }
    // setTimeout(() => {
    //   console.log(this.controlBtns);
    // }, 1000);
    // console.log(buttons);
    // return button;

    // const button = await new Promise((resolve, reject) => resolve(this.controlBtns));
    // return null;
    // console.log(this.controlBtns);
    return buttons;
  }

  updateCardNumber(number) {
    if (number !== CONSTANTS.CARDS_COUNT + 1) {
      this.underCardText.setText(`Current card (${number} / ${CONSTANTS.CARDS_COUNT}):`);
    } else {
      this.underCardText.setText('Finish');
      this.currentCardHUD.destroy();
    }
    // console.log(number);
  }

  updateCard(name, angle) {
    this.currentCardHUD.destroy();
    this.currentCardHUD = this.add.image(100, 140, name);
    this.currentCardHUD.setScale(0.3);
    if (angle) this.currentCardHUD.setAngle(angle);
  }

  turnHudCard(name, side) {
    const angle = (side - 1) * 90;
    console.log(angle);
    this.updateCard(name, angle);
  }

  destroyCard() {
    this.currentCardHUD.destroy();
  }
}

const createMenu = function (scene, x, y, items, onClick) {

  let menu = scene.rexUI.add
    .menu({
      x: x,
      y: y,
      width: 220,
      height: 55,
      orientation: 'y',
      items: items,
      space: { left: 20, right: 20, top: 10, bottom: 10, item: 10 },

      createButtonCallback: function (item, i) {
        let btnsBackgrounds = {};
        // let btnsBackgrounds = {
        //   'newGame_btn': 'start_btn',
        //   'saveGame_btn': 'save_btn',
        //   'loadGame_btn': 'load_btn',
        //   'sound_btn': scene.musicON ? 'sound_btn' : 'no_sound_btn',
        //   'gameRules_btn': 'about_btn'
        // }
        Object.values(scene.lang).forEach((obj) => {
            btnsBackgrounds[obj['name']] = obj.btn;
        });
        return createMenuBtn(scene, item, scene.add.image(x, y, btnsBackgrounds[item.name]), 15, scene.lang === en ? 40 : 65, 0, 10);
      },

      easeIn: {
        duration: 500,
        orientation: 'y'
      },
      easeOut: {
        duration: 300,
        orientation: 'y'
      }
    })


  menu.on('button.over', function (button, index, pointer, event) {
    // button.backgroundChildren[0].setTint(CONSTANTS.BTNS_HOVER_COLOR);
    button.setScale(CONSTANTS.BTNS_ACTIVE_SCALE);
  });

  menu.on('button.out', function (button, index, pointer, event) {
    // button.backgroundChildren[0].clearTint();
    button.setScale(CONSTANTS.BTNS_DEFAULT_SCALE);
  });

  // menu.on('button.click', function (button, index, pointer, event) {
  //   console.log(`Click button ${button.name}`) 
  // }, scene);

  let newGameBtn = menu.getButton(0);
  newGameBtn.on('pointerup', function(pointer) {
    newGameBtn.backgroundChildren[0].setTint(CONSTANTS.BTNS_HOVER_COLOR);
    // newGameBtn.setScale(CONSTANTS.BTNS_DEFAULT_SCALE);
    this.sys.game.destroy(true);
    new Phaser.Game(config);
  }, scene);

  let soundBtn = menu.getButton(3);
  soundBtn.on('pointerup', function(pointer) {
    scene.musicON = !scene.musicON;
      if (scene.musicON) {
        scene.musicON = true;
        scene.music.resume();
        // scene.music.pause();
        soundBtn.backgroundChildren[0].setTexture('sound_btn', 0);
        soundBtn.backgroundChildren[0].clearTint();
        // soundBtn.setScale(CONSTANTS.BTNS_DEFAULT_SCALE);
      } else {
        scene.musicON = false;
        scene.music.pause();
        soundBtn.backgroundChildren[0].setTexture('no_sound_btn', 0);
        soundBtn.backgroundChildren[0].setTint(CONSTANTS.BTNS_HOVER_COLOR);
        soundBtn.setScale(CONSTANTS.BTNS_DEFAULT_SCALE);
      }
  }, scene);

  let rulesBtn = menu.getButton(4);
  let rulesOpen = undefined;
  rulesBtn.on('pointerup', function(pointer) {
    if (rulesOpen === undefined) {
      rulesBtn.backgroundChildren[0].setTint(CONSTANTS.BTNS_HOVER_COLOR);
      rulesBtn.setScale(CONSTANTS.BTNS_DEFAULT_SCALE);

      const rulesBackground = scene.add.image(0, 0, 'game_rules');
      rulesOpen = addRules(scene, scene.game.config.width / 2 + 400, 400, rulesBackground, this.lang.gameRulesContent.text);
    } else if (!rulesOpen.isInTouching(pointer)) {
      // rulesOpen.destroy();
      rulesOpen.fadeOut(300);
      rulesOpen = undefined;
      rulesBtn.backgroundChildren[0].clearTint();
    }
  }, scene);

  return menu;
}

const createMenuBtn = function (scene, text, background, left=0, right=0, top=0, bottom=0) {
  return scene.rexUI.add.label({
     // width: 50,
    // height: 55,
    name: text.name,
    text: scene.add.text(0, 0, text.name, {
      fontFamily: 'Thintel',
      fontSize: '38px',
      color: 'black',
    }),
    background: background,
    space: {
      left: left,
      right: right,
      top: top,
      bottom: bottom,
    },
    align: 'center',
  })
}

const createBtn = function (scene, text, background, left=0, right=0, top=0, bottom=0) {
  return scene.rexUI.add.label({
    // width: 50,
    // height: 55,
    name: text,
    text: scene.add.text(0, 0, text, {
      fontFamily: 'Thintel',
      fontSize: '38px',
      color: 'black',
    }),
    background: background,
    space: {
      left: left,
      right: right,
      top: top,
      bottom: bottom,
    },
    align: 'center',
  });
}