/* eslint-disable import/extensions */
import CONSTANTS from '../utils/CONSTANTS.js';
import config from '../index.js';
// import MainScene from '../index.js';
import addRules from '../utils/addGameRules.js';
import { en, ru, de } from '../utils/gameObjectsLang.js';
import COORDS from '../utils/deskCoordinates.js';

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
    this.player = undefined;
    // this.scoreField = undefined;
    // this.scoreTable = undefined;

    this.playerPoints = {
      player1: 14,
      player2: 8,
      player3: 37,
      player4: 25,
    };
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

  addScoreText(number, x, y) {
    let textPlayers = [];
    for (let i = 0; i < number.length; i += 1) {
      textPlayers.push(this.add.text(x + i *10, y  + i *10, 'Hello World', { 
        color: 'red', 
        fontFamily: 'Thintel',
        fontSize: '30px',
        fixedWidth: 150,
        fixedHeight: 40,
        align: 'center',
        halign: 'center',
      }).setDepth(1));

      return textPlayers;
    } 
  }
  
  create() {
    this.lang = window.StartScreen.lang;
    // this.add.image(650, 410, 'chip1');
    const mainScene = this.scene.get('MainScene').board.currentCard;
    // this.add.text(10, 10, 'Current card:', { font: '20px', fill: '#ffffff' });
    this.underCardText = this.add.text(10, 5, `${this.lang.currentCard.text} (1 / ${CONSTANTS.CARDS_COUNT}):`, { fontFamily: 'Thintel', fontSize: '40px', fill: '#ffffff' });
    // this.currentCardHUD.setInteractive();
    // this.currentCardHUD.on('pointerdown', function (pointer) {
    //   console.log('current_card');
    // });

    this.music = this.sound.add('kingdom_sound', {
      volume: 0.5,
      rate: 1,
      loop: true,
      delay: 1000,
    });
    // this.music.play();

    this.nextBtn = this.add.image(this.game.config.width - 300, this.game.config.height - 100, 'next_step_btn').setInteractive();
    this.turnBtn = this.add.image(this.game.config.width - 220, this.game.config.height - 100, 'turn_btn').setInteractive();
    this.setChipBtn = this.add.image(this.game.config.width - 140, this.game.config.height - 100, 'set_chip_btn').setInteractive();
    this.otherCardBtn = this.add.image(this.game.config.width - 60, this.game.config.height - 100, 'other_card_btn').setInteractive();

    this.turnBtn.on('pointerover', function(pointer) {
      // console.log(this.turnBtn.x)
      this.turnBtnText = this.add.text(this.turnBtn.x - 45, this.turnBtn.y - 70, this.lang.turnCard_btn.name, { color: 'black', fontFamily: 'Thintel', fontSize: '30px'});
      this.turnBtn.setScale(CONSTANTS.BTNS_ACTIVE_SCALE);
    }, this);

    this.turnBtn.on('pointerout', function(pointer) {
      this.turnBtnText.destroy();
      this.turnBtn.setScale(CONSTANTS.BTNS_DEFAULT_SCALE);
    }, this);

    this.nextBtn.on('pointerover', function(pointer) {
      this.nextBtnText = this.add.text(this.nextBtn.x - 45, this.nextBtn.y - 70, this.lang.nextStep_btn.name, { color: 'black', fontFamily: 'Thintel', fontSize: '30px'});
      this.nextBtn.setScale(CONSTANTS.BTNS_ACTIVE_SCALE);
    }, this);

    this.nextBtn.on('pointerout', function(pointer) {
      this.nextBtnText.destroy();
      this.nextBtn.setScale(CONSTANTS.BTNS_DEFAULT_SCALE);
    }, this);

    this.setChipBtn.on('pointerover', function(pointer) {
      this.setChipBtnText = this.add.text(this.setChipBtn.x - 45, this.setChipBtn.y - 70, this.lang.setChip_btn.name, { color: 'black', fontFamily: 'Thintel', fontSize: '30px'});
      this.setChipBtn.setScale(CONSTANTS.BTNS_ACTIVE_SCALE);
    }, this)

    this.setChipBtn.on('pointerout', function(pointer) {
      this.setChipBtnText.destroy();
      this.setChipBtn.setScale(CONSTANTS.BTNS_DEFAULT_SCALE);
    }, this)

    this.otherCardBtn.on('pointerover', function(pointer) {
      this.otherCardBtnText = this.add.text(this.otherCardBtn.x - 45, this.otherCardBtn.y - 70, this.lang.otherCard_btn.name, { color: 'black', fontFamily: 'Thintel', fontSize: '30px'});
      this.otherCardBtn.setScale(CONSTANTS.BTNS_ACTIVE_SCALE);
    }, this);

    this.otherCardBtn.on('pointerout', function(pointer) {
      this.otherCardBtnText.destroy();
      this.otherCardBtn.setScale(CONSTANTS.BTNS_DEFAULT_SCALE);
    }, this);

    this.openScoreFieldBtn = this.add.image(100, this.game.config.height - 100, 'open_score_btn').setInteractive();

    this.openScoreFieldBtn.on('pointerover', function () {
      this.openScoreFieldText = this.add.text(this.openScoreFieldBtn.x - 45, this.openScoreFieldBtn.y - 70, this.lang.otherCard_btn.name, { color: 'black', fontFamily: 'Thintel', fontSize: '30px'});
      this.openScoreFieldBtn.setScale(CONSTANTS.BTNS_ACTIVE_SCALE);
    }, this);

    this.openScoreFieldBtn.on('pointerout', function (pointer) {
      this.openScoreFieldText.destroy();
      this.openScoreFieldBtn.setScale(CONSTANTS.BTNS_DEFAULT_SCALE);
    }, this);

    this.scoreField = undefined;
    this.scoreTable = undefined;

    this.openScoreFieldBtn.on('pointerdown', function(pointer) {
      // this.scoreFieldOpen != this.scoreFieldOpen;
        if (this.scoreField === undefined && this.scoreTable === undefined) {
          this.openScoreFieldBtn.setTint(CONSTANTS.BTNS_HOVER_COLOR);
          this.openScoreFieldBtn.setScale(CONSTANTS.BTNS_DEFAULT_SCALE);
  
          this.scoreField = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'score_field').setScale(1).setAlpha(0).setInteractive();

          this.tweens.add({
            targets: this.scoreField,
            alpha: 1,
            ease: 'Sine.easeInOut',
            duration: 500
          }, this);
  
          this.showChips();
          this.scoreTable = addDialog(150, this.openScoreFieldBtn.x + 120, this.openScoreFieldBtn.y - 200, this, this.players.length);
          // this.scoreTable = addDialog(150, this.game.config.width / 2, this.game.config.height / 2, this, this.players.length);


        } else if (!this.scoreTable.isInTouching(pointer)) {
          this.removeChips();

          this.tweens.add({
            targets: this.scoreField,
            alpha: 0,
            duration: 2000,
            ease: 'Sine.easeInOut'
          }, this);

          this.scoreField.destroy();

          this.scoreTable.fadeOut(500);
          this.scoreTable = undefined;
          this.scoreField = undefined;
          
          this.openScoreFieldBtn.clearTint();
          // this.scoreFieldOpen = false;
        }

    
    }, this);

    let menu = undefined;
    const settingsBtn = this.add.image(this.game.config.width - 50, 40, 'settings_2').setInteractive();
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
        this.rulesOpen.fadeOut(300);
        this.rulesOpen = undefined;
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

    this.player = this.add.text(this.game.config.width - this.game.config.width / 2, 70, this.players[0], { color: 'white', fontFamily: 'Thintel', fontSize: '30px' });
    this.playerChip = this.add.sprite(this.game.config.width - this.game.config.width / 2 - 50, 85, 'chipHUD_1');
    // console.log(this.players);
  }

  updatePlayerName(playerNumber) {
    this.player.setText(this.players[playerNumber]);
    this.playerChip.destroy();
    this.playerChip = this.add.sprite(this.game.config.width - this.game.config.width / 2 - 50, 85, `chipHUD_${playerNumber + 1}`);
  }

  showChips() {
    this.chipsOnDesk = [];
    // this.playerPoints.forEach((point, index) => {
    //   this.chipsOnDesk.push(this.add.sprite(index + 100, index + 100, )
    // });
    for (let i = 0; i < this.players.length; i += 1) {
      // console.log(this.playerPoints[`player${i + 1}`]);
      this.chipsOnDesk.push(this.add.sprite(
        this.game.config.width / 2 + COORDS[this.playerPoints[`player${i + 1}`] % 50].x - i * 5,
        this.game.config.height / 2 + COORDS[this.playerPoints[`player${i + 1}`] % 50].y + i * 5,
        `chipBoard_${i + 1}`,
      ));
    }

    // console.log(this.chipsOnDesk);
  }

  removeChips() {
    this.chipsOnDesk.forEach((chip) => {
      chip.destroy();
    });

    this.chipsOnDesk = [];
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
  scene.rulesOpen = undefined;
  rulesBtn.on('pointerup', function(pointer) {
    if (scene.rulesOpen === undefined) {
      rulesBtn.backgroundChildren[0].setTint(CONSTANTS.BTNS_HOVER_COLOR);
      rulesBtn.setScale(CONSTANTS.BTNS_DEFAULT_SCALE);

      const rulesBackground = scene.add.image(0, 0, 'game_rules');
      scene.rulesOpen = addRules(scene, scene.game.config.width / 2 + 400, 400, rulesBackground, this.lang.gameRulesContent.text);
    } else if (!scene.rulesOpen.isInTouching(pointer)) {
      // rulesOpen.destroy();
      scene.rulesOpen.fadeOut(300);
      scene.rulesOpen = undefined;
      rulesBtn.backgroundChildren[0].clearTint();
    }
  }, scene);

  return menu;
}

const createMenuBtn = function (scene, text, background, left = 0, right = 0, top = 0, bottom = 0) {
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

const createBtn = function (scene, text, background, left = 0, right = 0, top = 0, bottom = 0) {
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


const createInput = function(scene, content) {
  let keyObj = scene.input.keyboard.addKey('ENTER'); 
  // const text = scene.add.text(400, 300, 'Hello World', { fixedWidth: 150, fixedHeight: 36 })
  let text = scene.add.text(0, 0, content, {
    color: 'white',
    fontFamily: 'Thintel',
    fontSize: '30px',
    fixedWidth: 50,
    fixedHeight: 30,
    align: 'center',
    halign: 'center',
  })

	text.setInteractive().on('pointerdown', () => {
    // scene.rexUI.edit(text);
    let config = {
      onTextChanged: function(textObject, text) {
        textObject.text = text;
      },
      selectAll: false
    } 
    scene.plugins.get('rextexteditplugin').edit(text, config);
    text.setColor('black');
    // scene.playerNames.push(text);
    // let saveScore = scene.scoreTable.children[scene.scoreTable.children.length - 1].children[scene.scoreTable.children[scene.scoreTable.children.length - 1].children.length - 1];
    // saveScore.on('pointerdown', function() {
    //   scene.playerPoints.player1 = Number(text);

    //   console.log(scene.playerPoints);
    // })
    
  });

  keyObj.on('up', function(event) { 
    // if (text.text !== 'Player Name') {
    //   scene.playerNames.push(text.text);
    // }
  });

  return text;
}

const createInetactiveLabel = function (scene, content, icon, backgroundColor) {
  return scene.rexUI.add.label({
    background: scene.rexUI.add.roundRectangle(0, 0, 100, 50, 20, 0xaf6a39),
    name: content,
    icon: scene.add.image(0, 0, icon.texture.key),
    text: createInput(scene, content),
    space: {
      left: 10,
      right: 10,
      top: 5,
      bottom: 10
    },
    align: 'center',
    halign: 'center',
  })
  
}

const addDialog = function(width, x, y, scene, numberOfPlayers) {
  let dialog = scene.rexUI.add.dialog({
      x: x,
      y: y,
      width: width,
      // anchor: {
      //   left: 'center-450',
      //   centerY: 'center-240',
      // },
      background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0xe3b483),
      // (new Array(scene.players.length).fill().map((v, i) => v = createLabel(scene, scene.players[i]))),
      title: scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 100, 50, 20, 0xaf6a39),
        text: scene.add.text(0, 0, 'Количество очков каждого игрока', {
          fontFamily: 'Thintel',
          fontSize: '30px',
          align: 'center',
        }),
        space: { left: 10, right: 10, top: 5, bottom: 10}
      }),
      choices: (new Array(scene.players.length).fill().map((v, i) => v = createInetactiveLabel(scene, scene.playerPoints[`player${i + 1}`], scene.chipsOnDesk[i]))).concat([createLabel(scene, 'Сохранить')]),
      space: {
        title: 5,
        content: 5,
        choice: 5,
        left: 5,
        right: 5,
        top: 5,
        bottom: 10
      },
      align: 'center',
      expand: {
        content: false // Content is a pure text object
      }
    })
    .layout()
    .fadeIn(500)
  
  dialog.on('button.click', function (button, groupName, index) {
    if (button.name === 'save') {

      console.log(dialog.getChoice(0).text);

      scene.playerPoints.player1 = parseInt(dialog.getChoice(0).text, 10);
      scene.playerPoints.player2 = parseInt(dialog.getChoice(1).text, 10);

      if (dialog.getChoice(2) !== undefined && !isNaN(parseInt(dialog.getChoice(2).text, 10))) {
        scene.playerPoints.player3 = parseInt(dialog.getChoice(2).text, 10);
      } 

      if (dialog.getChoice(3) !== undefined && !isNaN(parseInt(dialog.getChoice(3).text, 10))) {
        scene.playerPoints.player4 = parseInt(dialog.getChoice(3).text, 10);
      }

      scene.removeChips();
      scene.showChips();
      // console.log(dialog.getChoice(2).text)
      // scene.playerPoints["player" + i] = parseInt(dialog.getChoice(index).text, 10);
      
      console.log(scene.playerPoints);

    }
  },scene)

    // .on('button.over', function (button, groupName, index) {
    //   button.getElement('background').setStrokeStyle(4, 0x7b4626)
    // },scene)
    // .on('button.out', function (button, groupName, index) {
    //   // button.backgroundChildren[0].clearTint();
    //   button.getElement('background').setStrokeStyle()
    //   // button.backgroundChildren[0].setFillStyle()
    // },scene);

  return dialog;
}


const createLabel = function (scene, text, backgroundColor) {
  return scene.rexUI.add.label({
    background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0xaf6a39),
    name: 'save',
    text: scene.add.text(0, 0, text, {
      fontFamily: 'Thintel',
      fontSize: '30px',
      align: 'center',
    }),
    space: {
      // left: 0,
      // right: 0,
      // top: 0,
      // bottom: 5,
      left: 10,
      right: 10,
      top: 5,
      bottom: 10
    },
    align: 'center',
  })
}