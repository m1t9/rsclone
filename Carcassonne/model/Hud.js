/* eslint-disable import/extensions */
import CONSTANTS from '../utils/CONSTANTS.js';

export default class HUD extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });
    // super({ key: 'UIScene', active: true });

    this.score = 0;
    this.underCardText = '';
    this.currentCardHUD = null;
    // this.currentCardNumber = 0;
    this.music = undefined;
    this.musicON = true;
  }

  preload() {
    window.HUD = this;
    // this.load.image('chip1', 'assets/chip-1.png');
    // this.load.image('road_straight', 'assets/pack1/road_straight.png');
    // this.load.image('road_bend', 'assets/pack1/road_bend.png');
    this.load.scenePlugin(
      'rexuiplugin',
      'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
      'rexUI',
      'rexUI'
    );
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
  }

  create() {
    // this.add.image(650, 410, 'chip1');
    const mainScene = this.scene.get('MainScene').board.currentCard;
    // this.add.text(10, 10, 'Current card:', { font: '20px', fill: '#ffffff' });
    this.underCardText = this.add.text(10, 5, `Current card (1 / ${CONSTANTS.CARDS_COUNT}):`, { fontFamily: 'Thintel', fontSize: 40, fill: '#ffffff' });
    // this.currentCardHUD.setInteractive();
    // this.currentCardHUD.on('pointerdown', function (pointer) {
    //   console.log('current_card');
    // });

    this.music = this.sound.add('kingdom_sound', {
      // mute: false,
      volume: 0.5,
      rate: 1,
      // detune: 0,
      // seek: 0,
      loop: true,
      delay: 1000
    });
    this.music.play();

    let menu = undefined;
    const settingsBtn = this.add.image(this.game.config.width - 50, 30, 'settings_2').setInteractive();

    const items = [
      { name: 'New Game' },
      { name: 'Save Game'},
      { name: 'Load Game'},
      { name: 'Sound',
      //   children: [ 
      //   { name: 'ON'},
      //   { name: 'OFF'},
      // ]
      },
      { name: 'About' }
    ];


    settingsBtn.on('pointerdown', function (pointer) {
      if (menu === undefined) {
        menu = createMenu(this, this.game.config.width - 200, 50, items)
      } else if (!menu.isInTouching(pointer)) {
        // console.log('collapse!');
        menu.collapse();
        menu = undefined;
      }
    }, this)


    const nextBtnBackground = this.add.image(0, 0, 'next_step_btn');
    const turnBtnBackground = this.add.image(0, 0, 'turn_btn');
    const setChipBtnBackground = this.add.image(0, 0, 'set_chip_btn');
    let controlBtns = this.rexUI.add
      .buttons({
        x: this.game.config.width -  125,
        y: this.game.config.height - 100,
        // width: 200,
        orientation: 'x',
        space: {
          item: 10,
        },
        // anchor: {
        //   left: 'center-400',
        //   centerY: 'center-30',
        // },
        buttons: [
          createSimpleBtn(this, 'next_step', nextBtnBackground),
          createSimpleBtn(this, 'turn_card',  turnBtnBackground),
          createSimpleBtn(this, 'set_chip', setChipBtnBackground),
        ],
        // space: { item: 10 },
        expand: true
      })
      .layout();

    controlBtns.on('button.click', function (button, index, pointer, event) {
      
      console.log(`Click button ${button.name}`);

      //CONTROL BUTTONS LOGIC HERE

    }, this);
  }

  initHudCard(name) {
    setTimeout(() => {
      this.currentCardHUD = this.add.image(100, 140, name);
      this.currentCardHUD.setScale(0.3);
    }, 100);
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

  updateCard(name) {
    this.currentCardHUD.destroy();
    this.currentCardHUD = this.add.image(100, 140, name);
    this.currentCardHUD.setScale(0.3);
  }
}

const createMenu = function (scene, x, y, items, onClick) {
  // const backgroundArray = [];
  // for (let i = 0; i < items.length; i += 1) {
  //   let backgroundBtn = scene.add.image(x, y * i + 10, 'btn_background');
  //   backgroundArray.push(backgroundBtn);
  // }

  let menu = scene.rexUI.add
    .menu({
      x: x,
      y: y,
      width: 220,
      height: 55,
      orientation: 'y',
      items: items,
      space: { left: 20, right: 20, top: 10, bottom: 10, item: 20 },

      createButtonCallback: function (item, i) {
        // if (item.name === 'ON' || item.name === 'OFF') {
        //   let soundBtn = scene.add.image(x, y, 'sound_btn');
        //   return createMenuBtn(scene, item, soundBtn);
        // } else {
          let btnsBackgrounds = {
            'New Game': 'start_btn',
            'Save Game': 'save_btn',
            'Load Game': 'load_btn',
            'Sound' : scene.musicON ? 'sound_btn': 'no_sound_btn',
            'About' : 'about_btn',
          }

          return createMenuBtn(scene, item, scene.add.image(x, y, btnsBackgrounds[item.name]));
        // }
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

  menu.on('button.click', function (button, index, pointer, event) {
    console.log(`Click button ${button.text}`);
    if (button.name === 'New Game') {
      this.scene.restart('MainScene');
    }
    if (button.name === 'Sound') {
      // console.log(button.backgroundChildren[0].texture);
      this.musicON = !this.musicON;

      if (this.musicON) {
        this.musicON = true;
        scene.music.resume();
        // scene.music.pause();
        button.backgroundChildren[0].setTexture('sound_btn', 0);
      } else {
        this.musicON = false;
        scene.music.pause();
        button.backgroundChildren[0].setTexture('no_sound_btn', 0);
      }

      // menu.collapseSubMenu();
    }

    // if (button.name === 'ON') {
    //   scene.music.resume();
    //   menu.collapseSubMenu();
    // }
    // if (button.name === 'OFF') {
    //   scene.music.pause();
    //   menu.collapseSubMenu();
    // }
  }, scene);

  return menu;
}

const createMenuBtn = function (scene, item, background) {
  return scene.rexUI.add.label({
    width: 30,
    height: 55,
    name: item.name,
    background: background,
    text: scene.add.text(0, 0, item.name, {
      fontFamily: 'Thintel',
      fontSize: 38,
      color: 'black'
    }),
    space: {
      left: 30,
      right: 45,
      top: 0,
      bottom: 10,
      // item: 10
    },
    align: 'center',
  })
}

const createSimpleBtn = function (scene, text, background) {
  return scene.rexUI.add.label({
    width: 55,
    height: 55,
    name: text,
    // text: scene.add.text(0, 0, text, {
    //   fontSize: 18,
    //   color: 'black',
    // }),
    background: background,
    space: {
      // left: 30,
      // right: 45,
      top: 10,
      bottom: 10,
      // item: 10
    },
    align: 'center',
  });
}
