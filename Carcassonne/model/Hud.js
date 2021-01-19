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
