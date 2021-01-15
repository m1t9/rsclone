/* eslint-disable import/extensions */
// import Phaser, { Game, Scene } from '../../phaser.js';
import IsoPlugin from './src/IsoPlugin.js';
import Board from './model/Board.js';
import Card from './model/Card.js';
import addCell from './controller/cellController.js';

class IsoInteractionExample extends Phaser.Scene {
  constructor() {
    const sceneConfig = {
      key: 'IsoInteractionExample',
      mapAdd: { isoPlugin: 'iso' },
    };

    super(sceneConfig);
    this.board = new Board();
    this.cells = [];
  }

  preload() {
    this.load.image('tile', 'assets/test2.png');
    this.load.image('empty', 'assets/test2empty.png');
    this.load.image('cardTest_1', 'assets/card2test1.png');
    this.load.image('cardTest_2', 'assets/card2test2.png');
    this.load.image('cardTest_3', 'assets/card2test3.png');
    this.load.image('cardTest_4', 'assets/card2test4.png');
    this.load.image('t1', 'assets/card1test.png');
    this.load.scenePlugin({
      key: 'IsoPlugin',
      url: IsoPlugin,
      sceneKey: 'iso',
    });
  }

  create() {
    this.isoGroup = this.add.group();
    this.iso.projector.origin.setTo(0.5, 0.3);
    this.spawnTiles();
    this.add.text(10, 10, 'Current card:', { font: '20px', fill: '#ffffff' });
  }

  spawnTiles() {
    this.input.mouse.disableContextMenu();
    this.board.initialization.call(this);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  scene: IsoInteractionExample,
};

new Phaser.Game(config);
