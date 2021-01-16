/* eslint-disable import/extensions */
// import Phaser, { Game, Scene } from '../../phaser.js';
import IsoPlugin from './src/IsoPlugin.js';
import Board from './model/Board.js';
import Card from './model/Card.js';
import addCell from './controller/cellController.js';
import HUD from './model/Hud.js';

class MainScene extends Phaser.Scene {
  constructor() {
    const sceneConfig = {
      key: 'MainScene',
      mapAdd: { isoPlugin: 'iso' },
    };

    super(sceneConfig);
    this.board = new Board();
    // console.log(this.board.cellsCount);
    // this.cells = [];
  }

  preload() {
    this.load.image('tile', 'assets/test2.png');
    this.load.image('empty', 'assets/test2empty.png');
    this.load.image('road_t1_1', 'assets/pack1/road_t1_1.png');
    this.load.image('road_t1_2', 'assets/pack1/road_t1_2.png');
    this.load.image('road_t1_3', 'assets/pack1/road_t1_3.png');
    this.load.image('road_t1_4', 'assets/pack1/road_t1_4.png');
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
    // this.add.text(10, 10, 'Current card:', { font: '20px', fill: '#ffffff' });

    window.MainScene = this;
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
  scene: [MainScene, HUD],
};

new Phaser.Game(config);
