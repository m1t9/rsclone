/* eslint-disable import/extensions */
import CONSTANTS from '../utils/CONSTANTS.js';

export default class HUD extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene', active: true });

    this.score = 0;
    this.underCardText = '';
    this.currentCardHUD = null;
    // this.currentCardNumber = 0;
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
    this.load.image('settings', './assets/btns/settings.png');
    this.load.image('btn_background', './assets/btns/grey_button06.png');

  }

  create() {
    // this.add.image(650, 410, 'chip1');
    const mainScene = this.scene.get('MainScene').board.currentCard;
    // this.add.text(10, 10, 'Current card:', { font: '20px', fill: '#ffffff' });
    this.underCardText = this.add.text(10, 10, `Current card (1 / ${CONSTANTS.CARDS_COUNT}):`, { font: '20px', fill: '#ffffff' });
    // this.currentCardHUD.setInteractive();
    // this.currentCardHUD.on('pointerdown', function (pointer) {
    //   console.log('current_card');
    // });

    let menu = undefined;
    const settingsBtn = this.add.image(this.game.config.width - 50, 30, 'settings').setInteractive();
    
    const items = [
      { name: 'New Game' },
      { name: 'Save Game'},
      { name: 'Sound'},
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
  }

  initHudCard(name) {
    setTimeout(() => {
      this.currentCardHUD = this.add.image(100, 120, name);
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
    this.currentCardHUD = this.add.image(100, 120, name);
    this.currentCardHUD.setScale(0.3);
  }
}


const createMenu = function (scene, x, y, items, onClick) {
  const backgroundArray = [];
  for (let i = 0; i < items.length; i += 1) {
    let backgroundBtn = scene.add.image(x, y * i + 10, 'btn_background');
    backgroundArray.push(backgroundBtn);
  }

  let menu = scene.rexUI.add
    .menu({
      x: x,
      y: y,
      width: 150,
      orientation: 'y',
      items: items,
      createButtonCallback: function (item, i) {
        return createMenuBtn(scene, item, backgroundArray[i]);
      },
  
      space: { item: 10 },
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
    // if(button.name === 'New Game') {
    //   this.scene.restart('MainScene');
    //   // this.board.initialization.call(this);
    // }
  }, scene)

  return menu;
}

const createMenuBtn = function (scene, item, background) {
  return scene.rexUI.add.label({
    width: 30,
    height: 30,
    name: item.name,
    text: scene.add.text(0, 0, item.name, {
      fontSize: 18,
      color: 'black'
    }),
    background: background,
    space: {
      top: 10,
      bottom: 10
    },
    align: 'center',
  })
}
