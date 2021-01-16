/* eslint-disable import/extensions */
// import Phaser, { Game, Scene } from '../../phaser.js';
import IsoPlugin from './src/IsoPlugin.js';
import Board from './model/Board.js';
import Card from './model/Card.js';
import addCell from './controller/cellController.js';
import HUD from './model/Hud.js';
import loadImages from './data/loadImages.js';

class MainScene extends Phaser.Scene {
  constructor() {
    const sceneConfig = {
      key: 'MainScene',
      mapAdd: { isoPlugin: 'iso' },
    };

    super(sceneConfig);
    this.board = new Board();
  }

  preload() {
    loadImages.call(this);
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
