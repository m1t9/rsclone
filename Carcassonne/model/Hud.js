export default class HUD extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene', active: true });

    this.score = 0;
    this.currentCardHUD = null;
  }

  preload() {
    window.HUD = this;
    // this.load.image('t1-hud', 'assets/card1test.png');
    // this.load.image('road_straight', 'assets/pack1/road_straight.png');
    // this.load.image('road_bend', 'assets/pack1/road_bend.png');
  }

  create() {
    const mainScene = this.scene.get('MainScene').board.currentCard;
    this.add.text(10, 10, 'Current card:', { font: '20px', fill: '#ffffff' });
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

  updateCard(name) {
    this.currentCardHUD.destroy();
    this.currentCardHUD = this.add.image(100, 120, name);
    this.currentCardHUD.setScale(0.3);
  }
}
