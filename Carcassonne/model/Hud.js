export default class HUD extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene', active: true });

    this.score = 0;
  }

  preload() {
    this.load.image('t1-hud', 'assets/card1test.png');
    this.load.image('current-card-hud', 'assets/pack1/road_t1.png');
  }

  create() {
    const mainScene = this.scene.get('MainScene');
    this.add.text(10, 10, 'Current card:', { font: '20px', fill: '#ffffff' });
    // let currentCard = this.add.image(80, 80, 't1-hud');
    // currentCard.destroy();
    const currentCard = this.add.image(80, 80, 'current-card-hud');
    currentCard.setScale(0.7);
    mainScene.board.currentCardSprite = currentCard;
    currentCard.setInteractive();
    currentCard.on('pointerdown', function (pointer) {
      console.log('current_card');
    });
  }
}
