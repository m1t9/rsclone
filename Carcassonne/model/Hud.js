/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import CONSTANTS from '../utils/CONSTANTS.js';
import config from '../index.js';
// import MainScene from '../index.js';
import addRules from '../utils/addGameRules.js';
import { en, ru, de } from '../utils/gameObjectsLang.js';
import { COORDS_SMALL, COORDS_LARGE } from '../utils/deskCoordinates.js';

export default class HUD extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });

    this.score = 0;
    this.underCardText = '';
    this.currentCardHUD = null;
    this.music = undefined;
    this.musicON = true;
    this.lang = undefined;
    this.player = undefined;
    this.playerPoints = {
      player1: 0,
      player2: 0,
      player3: 0,
      player4: 0,
    };
  }

  preload() {
    window.HUD = this;
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
    this.underCardText = this.add.text(10, 5, `${this.lang.currentCard.text} (1 / ${CONSTANTS.CARDS_COUNT}):`, { fontFamily: 'Thintel', fontSize: (window.innerWidth > 1280) ? '40px' : '32px', fill: '#ffffff' });

    this.music = this.sound.add('kingdom_sound', {
      volume: 0.5,
      rate: 1,
      loop: true,
      delay: 1000,
    });
    this.music.play();

    this.turnCardSound = this.sound.add('turn_sound');
    this.insertSound = this.sound.add('insert_sound');

    this.nextBtn = this.add.image(this.game.config.width - 300, this.game.config.height - 100, 'next_step_btn').setInteractive();
    this.turnBtn = this.add.image(this.game.config.width - 220, this.game.config.height - 100, 'turn_btn').setInteractive();
    this.setChipBtn = this.add.image(this.game.config.width - 140, this.game.config.height - 100, 'set_chip_btn').setInteractive();
    this.otherCardBtn = this.add.image(this.game.config.width - 60, this.game.config.height - 100, 'other_card_btn').setInteractive();

    this.turnBtn.on('pointerover', function () {
      this.turnBtnText = this.add.text(this.turnBtn.x - 45, this.turnBtn.y - 70, this.lang.turnCard_btn.name, { color: 'black', fontFamily: 'Thintel', fontSize: '30px' });
      this.turnBtn.setScale(CONSTANTS.BTNS_ACTIVE_SCALE);
    }, this);

    this.turnBtn.on('pointerout', function () {
      this.turnBtnText.destroy();
      this.turnBtn.setScale(CONSTANTS.BTNS_DEFAULT_SCALE);
    }, this);

    this.nextBtn.on('pointerover', function () {
      this.nextBtnText = this.add.text(this.nextBtn.x - 45, this.nextBtn.y - 70, this.lang.nextStep_btn.name, { color: 'black', fontFamily: 'Thintel', fontSize: '30px' });
      this.nextBtn.setScale(CONSTANTS.BTNS_ACTIVE_SCALE);
    }, this);

    this.nextBtn.on('pointerout', function () {
      this.nextBtnText.destroy();
      this.nextBtn.setScale(CONSTANTS.BTNS_DEFAULT_SCALE);
    }, this);

    this.setChipBtn.on('pointerover', function () {
      this.setChipBtnText = this.add.text(this.setChipBtn.x - 45, this.setChipBtn.y - 70, this.lang.setChip_btn.name, { color: 'black', fontFamily: 'Thintel', fontSize: '30px' });
      this.setChipBtn.setScale(CONSTANTS.BTNS_ACTIVE_SCALE);
    }, this);

    this.setChipBtn.on('pointerout', function () {
      this.setChipBtnText.destroy();
      this.setChipBtn.setScale(CONSTANTS.BTNS_DEFAULT_SCALE);
    }, this);

    this.otherCardBtn.on('pointerover', function () {
      this.otherCardBtnText = this.add.text(this.otherCardBtn.x - 45, this.otherCardBtn.y - 70, this.lang.otherCard_btn.name, { color: 'black', fontFamily: 'Thintel', fontSize: '30px' });
      this.otherCardBtn.setScale(CONSTANTS.BTNS_ACTIVE_SCALE);
    }, this);

    this.otherCardBtn.on('pointerout', function () {
      this.otherCardBtnText.destroy();
      this.otherCardBtn.setScale(CONSTANTS.BTNS_DEFAULT_SCALE);
    }, this);

    this.openScoreFieldBtn = this.add.image(100, this.game.config.height - 100, 'open_score_btn').setInteractive();

    this.openScoreFieldBtn.on('pointerover', function () {
      this.openScoreFieldText = this.add.text(this.openScoreFieldBtn.x - 45, this.openScoreFieldBtn.y - 70, this.lang.openScoreField.name, { color: 'black', fontFamily: 'Thintel', fontSize: '30px' });
      this.openScoreFieldBtn.setScale(CONSTANTS.BTNS_ACTIVE_SCALE);
    }, this);

    this.openScoreFieldBtn.on('pointerout', function () {
      this.openScoreFieldText.destroy();
      this.openScoreFieldBtn.setScale(CONSTANTS.BTNS_DEFAULT_SCALE);
    }, this);

    if (window.innerWidth <= 1280) {
      this.nextBtn.setPosition(this.game.config.width - 250, this.game.config.height - 50);
      this.turnBtn.setPosition(this.game.config.width - 190, this.game.config.height - 50);
      this.setChipBtn.setPosition(this.game.config.width - 130, this.game.config.height - 50);
      this.otherCardBtn.setPosition(this.game.config.width - 70, this.game.config.height - 50);
      this.openScoreFieldBtn.setPosition(70, this.game.config.height - 50);
    }

    this.scoreField = undefined;
    this.scoreTable = undefined;

    this.openScoreFieldBtn.on('pointerdown', function (pointer) {
      if (this.scoreField === undefined && this.scoreTable === undefined) {
        this.insertSound.play();
        this.openScoreFieldBtn.setTint(CONSTANTS.BTNS_HOVER_COLOR);
        this.openScoreFieldBtn.setScale(CONSTANTS.BTNS_DEFAULT_SCALE);

        this.scoreField = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'score_field').setAlpha(0).setInteractive();
        this.tweens.add({
          targets: this.scoreField,
          alpha: 1,
          ease: 'Sine.easeInOut',
          duration: 500,
        }, this);

        this.showChips();
        this.scoreTable = addDialog(150, this.game.config.width / 2 - 600,
          this.openScoreFieldBtn.y - 260, this, this.players.length);

        if (window.innerWidth <= 1280) {
          this.scoreField.setScale(0.8);
          // eslint-disable-next-line max-len
          this.scoreTable.setPosition(this.game.config.width / 2 - 420, this.openScoreFieldBtn.y - 150);
        } else if (window.innerWidth > 1280) {
          this.scoreField.setScale(1);
        }
      } else if (!this.scoreTable.isInTouching(pointer)) {
        this.removeChips();
        this.insertSound.play();

        this.tweens.add({
          targets: this.scoreField,
          alpha: 0,
          duration: 2000,
          ease: 'Sine.easeInOut',
        }, this);

        this.scoreField.destroy();

        this.scoreTable.fadeOut(500);
        this.scoreTable = undefined;
        this.scoreField = undefined;

        this.openScoreFieldBtn.clearTint();
        // this.scoreFieldOpen = false;
      }
    }, this);

    let menu;
    const settingsBtn = this.add.image(this.game.config.width - 50, 40, 'settings').setInteractive();
    if (window.innerWidth <= 1280) {
      settingsBtn.setPosition(this.game.config.width - 40, 30);
    }
    const items = [
      { name: this.lang.newGame_btn.name },
      { name: this.lang.sound_btn.name },
      { name: this.lang.gameRules_btn.name },
      { name: this.lang.about_btn.name },
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

        menu = createMenu(this, this.game.config.width - 200, 70, items);
        if (window.innerWidth <= 1280) {
          menu.setPosition(this.game.config.width - 170, 60);
        }
      } else if (!menu.isInTouching(pointer)) {
        menu.collapse();
        menu = undefined;

        if (this.rulesOpen !== undefined) {
          this.rulesOpen.fadeOut(300);
          this.rulesOpen = undefined;
        }

        settingsBtn.clearTint();
      }
    }, this);

    this.players = [];
    for (let i = 0; i < window.StartScreen.playerNames.length; i += 1) {
      if (window.StartScreen.playerNames[i] === this.lang.playerName.text) {
        this.players.push(`Player ${i + 1}`)
      } else {
        this.players.push(window.StartScreen.playerNames[i]);
      }
    }

    this.player = this.add.text(this.game.config.width - this.game.config.width / 2, 70, this.players[0], { color: 'white', fontFamily: 'Thintel', fontSize: '30px' });
    this.playerChip = this.add.sprite(this.game.config.width - this.game.config.width / 2 - 50, 85, 'chipHUD_1');
  }

  equalText(element, scene, index, array) {
    return element === scene.lang.playerName.text;
  }

  updatePlayerName(playerNumber) {
    this.player.setText(this.players[playerNumber]);
    this.playerChip.destroy();
    this.playerChip = this.add.sprite(this.game.config.width - this.game.config.width / 2 - 50, 85, `chipHUD_${playerNumber + 1}`);
  }

  showChips() {
    this.chipsOnDesk = [];
    for (let i = 0; i < this.players.length; i += 1) {
      if (window.innerWidth > 1280) {
        this.chipsOnDesk.push(this.add.sprite(
          this.game.config.width / 2 + COORDS_LARGE[this.playerPoints[`player${i + 1}`] % 50].x - i * 5,
          this.game.config.height / 2 + COORDS_LARGE[this.playerPoints[`player${i + 1}`] % 50].y + i * 5,
          `chipBoard_${i + 1}`,
        ));
      } else if (window.innerWidth <= 1280) {
        this.chipsOnDesk.push(this.add.sprite(
          this.game.config.width / 2 + COORDS_SMALL[this.playerPoints[`player${i + 1}`] % 50].x - i * 5,
          this.game.config.height / 2 + COORDS_SMALL[this.playerPoints[`player${i + 1}`] % 50].y + i * 5,
          `chipBoard_${i + 1}`,
        ));
      }
    }
  }

  removeChips() {
    this.chipsOnDesk.forEach((chip) => {
      chip.destroy();
    });

    this.chipsOnDesk = [];
  }

  initHudCard(name) {
    setTimeout(() => {
      this.currentCardHUD = this.add.image((window.innerWidth > 1280) ? 100 : 90, 140, name);
      this.currentCardHUD.setScale(0.3);
    }, 100);
  }

  getNextStepButton() {
    const buttons = this.controlBtns;
    return buttons;
  }

  updateCardNumber(number) {
    if (number !== CONSTANTS.CARDS_COUNT + 1) {
      this.underCardText.setText(`${this.lang.currentCard.text} (${number} / ${CONSTANTS.CARDS_COUNT}):`);
    } else {
      this.otherCardBtn.disableInteractive();
      this.turnBtn.disableInteractive();
      this.underCardText.setText(this.lang.finishText.text);
      let winnerVal = 0;
      let winnerPos = 0;
      let iter = 0;
      for (const [key, value] of Object.entries(this.playerPoints)) {
        if (value > winnerVal) {
          winnerPos = iter;
          winnerVal = value;
        }
        iter += 1;
      }
      this.crown = this.add.sprite(this.game.config.width / 2, 280, 'win_crown').setScale(1);
      this.winText = this.add.text(this.game.config.width / 2 - 500, this.game.config.height / 2,
        `${this.lang.winText.text} ${winnerVal === 0 ? this.lang.winNobody.text : this.players[winnerPos]} !`,
        { color: '#e3b483', fontFamily: 'Thintel', fontSize: (window.innerWidth > 1280) ? '100px': '75px' });
      
      this.currentCardHUD.destroy();

      if(window.innerWidth <= 1280) {
        this.crown.setScale(0.5);
        this.crown.setPosition(this.game.config.width / 2, 200);
        this.winText.setPosition(this.game.config.width / 2- 380, this.game.config.height / 2);
      }
    }
  }

  updateCard(name, angle) {
    this.currentCardHUD.destroy();
    this.currentCardHUD = this.add.image((window.innerWidth > 1280) ? 100 : 90, 140, name);
    this.currentCardHUD.setScale(0.3);
    if (angle) this.currentCardHUD.setAngle(angle);
  }

  turnHudCard(name, side) {
    const angle = (side - 1) * 90;
    this.updateCard(name, angle);
  }

  destroyCard() {
    this.currentCardHUD.destroy();
  }
}

const createMenu = function (scene, x, y, items, onClick) {
  const menu = scene.rexUI.add
    .menu({
      x,
      y,
      width: (window.innerWidth > 1280) ? 220 : 180,
      height: (window.innerWidth > 1280) ? 55 : 45,
      orientation: 'y',
      items,
      space: (window.innerWidth > 1280) ? { left: 20, right: 20, top: 15, bottom: 10, item: 10, } : { left: 20, right: 20, top: 5, bottom: 5, item: 5 },

      createButtonCallback(item, i) {
        const btnsBackgrounds = {};
        Object.values(scene.lang).forEach((obj) => {
          btnsBackgrounds[obj.name] = obj.btn;
        });
        return createMenuBtn(scene, item, scene.add.image(x, y, btnsBackgrounds[item.name]), 15, scene.lang === en ? 40 : 65, 0, 10);
      },

      easeIn: {
        duration: 500,
        orientation: 'y',
      },
      easeOut: {
        duration: 300,
        orientation: 'y',
      },
    });

  menu.on('button.over', (button, index, pointer, event) => {
    button.setScale(CONSTANTS.BTNS_ACTIVE_SCALE);
  });

  menu.on('button.out', (button, index, pointer, event) => {
    button.setScale(CONSTANTS.BTNS_DEFAULT_SCALE);
  });

  const newGameBtn = menu.getButton(0);
  newGameBtn.on('pointerup', function (pointer) {
    newGameBtn.backgroundChildren[0].setTint(CONSTANTS.BTNS_HOVER_COLOR);
    this.sys.game.destroy(true);
    new Phaser.Game(config);
  }, scene);

  const soundBtn = menu.getButton(1);
  soundBtn.on('pointerup', (pointer) => {
    scene.musicON = !scene.musicON;
    if (scene.musicON) {
      scene.musicON = true;
      scene.music.resume();
      scene.insertSound.setVolume(1);
      scene.turnCardSound.setVolume(1);
      soundBtn.backgroundChildren[0].setTexture('sound_btn', 0);
      soundBtn.backgroundChildren[0].clearTint();
    } else {
      scene.musicON = false;
      scene.music.pause();
      scene.insertSound.setVolume(0);
      scene.turnCardSound.setVolume(0);
      soundBtn.backgroundChildren[0].setTexture('no_sound_btn', 0);
      soundBtn.backgroundChildren[0].setTint(CONSTANTS.BTNS_HOVER_COLOR);
      soundBtn.setScale(CONSTANTS.BTNS_DEFAULT_SCALE);
    }
  }, scene);

  const rulesBtn = menu.getButton(2);
  scene.rulesOpen = undefined;
  rulesBtn.on('pointerup', (pointer) => {
    if (scene.rulesOpen === undefined) {
      rulesBtn.backgroundChildren[0].setTint(CONSTANTS.BTNS_HOVER_COLOR);
      rulesBtn.setScale(CONSTANTS.BTNS_DEFAULT_SCALE);

      const rulesBackground = scene.add.image(0, 0, 'game_rules');
      scene.rulesOpen = addRules(scene, scene.game.config.width / 2 + 400, 400, rulesBackground, scene.lang.gameRulesContent.text);
      if (window.innerWidth <= 1280) {
        scene.rulesOpen.setPosition(scene.game.config.width / 2 + 230, 300);
      }
    } else if (!scene.rulesOpen.isInTouching(pointer)) {
      scene.rulesOpen.fadeOut(300);
      scene.rulesOpen = undefined;
      rulesBtn.backgroundChildren[0].clearTint();
    }
  }, scene);

  const aboutUsBtn = menu.getButton(3);
  aboutUsBtn.on('pointerup', (pointer) => {
    const url = 'https://petr-the-lll.medium.com/carcassonne-the-game-on-phaser-3-aec43e5e66ea';
    const s = window.open(url, '_blank');
    if (s && s.focus) {
      s.focus();
    } else if (!s) {
      window.location.href = url;
    }
  }, scene);

  return menu;
};

const createMenuBtn = function (scene, text, background, left = 0, right = 0, top = 0, bottom = 0) {
  return scene.rexUI.add.label({
    name: text.name,
    text: scene.add.text(0, 0, text.name, {
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

const createInput = function (scene, content) {
  const keyObj = scene.input.keyboard.addKey('ENTER');
  const text = scene.add.text(0, 0, content, {
    color: 'white',
    fontFamily: 'Thintel',
    fontSize: (window.innerWidth > 1280) ? '30px' : '23px',
    fixedWidth: 50,
    fixedHeight: 30,
    align: 'center',
    halign: 'center',
  });

  text.setInteractive().on('pointerdown', () => {
    const config = {
      onTextChanged(textObject, text) {
        textObject.text = text;
      },
      selectAll: false,
    };
    scene.plugins.get('rextexteditplugin').edit(text, config);
    text.setColor('black');
  });
  return text;
};

const createInetactiveLabel = function (scene, content, icon, backgroundColor) {
  return scene.rexUI.add.label({
    background: scene.rexUI.add.roundRectangle(0, 0, 100, 50, 20, 0xaf6a39),
    name: content,
    icon: scene.add.image(0, 0, icon.texture.key),
    text: createInput(scene, content),
    space: {
      left: 10,
      right: 10,
      top: 10,
      bottom: 10,
    },
    align: 'center',
    halign: 'center',
  });
};

const addDialog = function (width, x, y, scene, numberOfPlayers) {
  const dialog = scene.rexUI.add.dialog({
    x,
    y,
    width,
    background: scene.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0xe3b483),
    title: scene.rexUI.add.label({
      background: scene.rexUI.add.roundRectangle(0, 0, 100, 50, 20, 0xaf6a39),
      text: scene.add.text(0, 0, scene.lang.scoreTitle.text, {
        fontFamily: 'Thintel',
        fontSize: (window.innerWidth > 1280) ? '30px' : '23px',
        align: 'center',
      }),
      space: {
        left: 10, right: 10, top: 5, bottom: 10,
      },
    }),
    choices: (new Array(scene.players.length).fill().map((v, i) => v = createInetactiveLabel(scene, scene.playerPoints[`player${i + 1}`], scene.chipsOnDesk[i]))).concat([createLabel(scene, scene.lang.scoreSave_btn.name)]),
    space: {
      title: 5,
      content: 5,
      choice: 5,
      left: 5,
      right: 5,
      top: 5,
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
    if (button.name === 'save') {
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

    }
  }, scene);

  return dialog;
};

const createLabel = function (scene, text, backgroundColor) {
  return scene.rexUI.add.label({
    background: scene.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0xaf6a39),
    name: 'save',
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
