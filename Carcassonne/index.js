/* eslint-disable import/extensions */
// import Phaser, { Game, Scene } from '../../phaser.js';
import IsoPlugin from './src/IsoPlugin.js';
import Board from './model/Board.js';
import Card from './model/Card.js';
import addCell from './controller/cellController.js';
import HUD from './model/Hud.js';
// import loadImages from './data/loadImages.js';
import CONSTANTS from './utils/CONSTANTS.js';
import StartScreen from './model/StartScreen.js';
import Boot from './model/Boot.js';

class MainScene extends Phaser.Scene {
  constructor() {
    const sceneConfig = {
      key: 'MainScene',
      mapAdd: { isoPlugin: 'iso' },
    };

    super(sceneConfig);
    this.board = new Board();
    // this.zz = 1;
  }

  preload() {
    // loadImages.call(this);
    this.load.scenePlugin({
      key: 'IsoPlugin',
      url: IsoPlugin,
      sceneKey: 'iso',
    });
  }

  create() {
    window.MainScene = this;
    this.isoGroup = this.add.group();
    this.iso.projector.origin.setTo(0.5, 0.3);

    this.spawnTiles();

    // camera settings
    this.cameras.main.setViewport(0.5, 0.3, this.game.config.width, this.game.config.height);
    // this.cameras.main.setBounds(0.5, 0.3, 10000, 10000);
    this.cameras.main.setZoom(1);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys('W, A , S , D, PLUS, MINUS');

    this.input.on('wheel', function (pointer) {
      if (pointer.deltaY > 0 && this.cameras.main.zoom > 0.4) {
        this.cameras.main.zoom -= 0.25;
      } else if (pointer.deltaY < 0) {
        this.cameras.main.zoom += 0.25;
      }
      // console.log(this.cameras.main.zoom);
    });
  }

  update() {
    const cards = this.board.board;
    const cam = this.cameras.main;
    const xPositiveCards = [];
    // const xNegativeCards = [];
    const yPositiveCards = [];
    // const yNegativeCards = [];

    cards.map((item) => {
      if (item.x > 0) {
        xPositiveCards.push(item.x);
      }
      // else if (item.x < 0) {
      //   xNegativeCards.push(item.x);
      // }
      if (item.y > 0) {
        yPositiveCards.push(item.y);
      }
      // else if (item.y < 0) {
      //   yNegativeCards.push(item.y);
      // }
    });

    if (this.keys.A.isDown) {
      cam.scrollX -= CONSTANTS.SCROLL_SIZE;

      if (cam.scrollX < (- Math.max(...xPositiveCards) - 100)) {
        cam.setScroll(0, cam.scrollY);
      }
    } else if (this.keys.D.isDown) {
      cam.scrollX += CONSTANTS.SCROLL_SIZE;

      if (cam.scrollX >= (Math.max(...xPositiveCards) + 100)) {
        cam.setScroll(0, cam.scrollY);
      }
    }

    if (this.keys.W.isDown) {
      cam.scrollY -= CONSTANTS.SCROLL_SIZE;

      if (cam.scrollY < (- Math.max(...yPositiveCards) - 100)) {
        cam.setScroll(cam.scrollX, 0);
      }
    } else if (this.keys.S.isDown) {
      cam.scrollY += CONSTANTS.SCROLL_SIZE;

      if (cam.scrollY >= (Math.max(...yPositiveCards) + 100)) {
        cam.setScroll(cam.scrollX, 0);
      }
    }

    if (this.keys.MINUS.isDown && cam.zoom > 0.4) {
      cam.zoom -= 0.05;
    } else if (this.keys.PLUS.isDown) {
      cam.zoom += 0.05;
    }
  }

  spawnTiles() {
    this.input.mouse.disableContextMenu();
    this.board.initialization.call(this);
    // console.log(this);
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
  scene: [StartScreen, Boot, MainScene, HUD],
  // scene: [MainScene, HUD],
  // physics: {
  //   default: 'matter',
  //   matter: {
  //     debug: true,
  //   },
  // },
  arcade: {
    debug: true,
    // gravity: { y: 200 }
  },
};

// const config = {
//   type: Phaser.AUTO,
//   width: 1300,
//   height: 900,
//   pixelArt: true,
//   scene: [MainScene, HUD],
// };

const game = new Phaser.Game(config);
