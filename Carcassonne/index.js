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

    // camera settings
    this.cameras.main.setViewport(0.5, 0.3, this.game.config.width, this.game.config.height);
    // this.cameras.main.setBounds(0.5, 0.3, 10000, 10000);
    this.cameras.main.setZoom(1);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys('W, A , S , D');
  }

  update () {
    const cam = this.cameras.main;

    if (this.keys.A.isDown) {
      cam.scrollX += 5;

      if (cam.scrollX >= (this.game.config.width / 2)) {
        cam.setScroll(0, cam.scrollY);
      }
    } else if (this.keys.D.isDown) {
      cam.scrollX -= 5;
      if (cam.scrollX <= (- this.game.config.width / 2)) {
        cam.setScroll(this.game.config.width - cam.width, cam.scrollY);
      }
    } 
    
    if (this.keys.W.isDown) {
      cam.scrollY += 5;

      if (cam.scrollY >= (this.game.config.height / 2)) {
        cam.setScroll(cam.scrollX, 0);
      }

    } else if (this.keys.S.isDown) {
      cam.scrollY -= 5;

      if (cam.scrollY <= (- this.game.config.height / 2)) {
        cam.setScroll(cam.scrollX, this.game.config.height - cam.height);
      }
    }

    if (this.cursors.left.isDown) {
      cam.zoom -= 0.05;
      // this.cameras.main.setZoom(1);
    } else if (this.cursors.right.isDown) {
      // this.cameras.main.setZoom(3);
      cam.zoom += 0.05;
    }
  }

  spawnTiles() {
    this.input.mouse.disableContextMenu();
    this.board.initialization.call(this);
  }
}

const fullScreenHeight = document.documentElement.getBoundingClientRect().height;
const fullScreenWidth = document.documentElement.getBoundingClientRect().width;

const config = {
  type: Phaser.AUTO,
  parent: 'phaser_container',
  width: fullScreenWidth,
  height: fullScreenHeight,
  pixelArt: true,
  scene: [MainScene, HUD],
};

// const config = {
//   type: Phaser.AUTO,
//   width: 1300,
//   height: 900,
//   pixelArt: true,
//   scene: [MainScene, HUD],
// };

new Phaser.Game(config);
