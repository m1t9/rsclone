/* eslint-disable import/extensions */
// import Phaser, { Game, Scene } from '../../phaser.js';
import IsoPlugin from './src/IsoPlugin.js';
import Board from './model/Board.js';
import Card from './model/Card.js';
import addCell from './controller/cellController.js';
import HUD from './model/Hud.js';
import loadImages from './data/loadImages.js';
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
    this.isoGroup = this.add.group();
    this.iso.projector.origin.setTo(0.5, 0.3);
    this.spawnTiles();

    window.MainScene = this;

    // camera settings
    // this.cameras.main.setViewport(0.5, 0.3, this.game.config.width, this.game.config.height);
    this.cameras.main.setBounds(0.5, 0.3, this.game.config.width, this.game.config.height);
    this.cameras.main.setZoom(1);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys('W, A , S , D, PLUS, MINUS, UP, DOWN, LEFT, RIGHT');

    this.input.on('wheel', function (pointer) {
      if (pointer.deltaY > 0 && this.cameras.main.zoom > 0.4) {
        this.cameras.main.zoom -= 0.25;
      } else if (pointer.deltaY < 0) {
        this.cameras.main.zoom += 0.25;
      }
      // console.log(this.cameras.main.zoom);
    });

    console.log(this.game.config.width)
  }

  update() {
    const cards = this.board.board;
    const cam = this.cameras.main;
    // const xPositiveCards = [];
    // const yPositiveCards = [];
    // const xNegativeCards = [];
    // const yNegativeCards = [];

    cards.map((item) => {
      if (item.x > 0) {
        xPositiveCards.push(item.x);
      }
      if (item.y > 0) {
        yPositiveCards.push(item.y);
      }
    });

    if (this.keys.A.isDown || this.keys.LEFT.isDown) {
      cam.scrollX -= CONSTANTS.SCROLL_SIZE;

      if (cam.scrollX < (-this.game.config.width)) {
        cam.setScroll(0, cam.scrollY);
      }
    } else if (this.keys.D.isDown || this.keys.RIGHT.isDown) {
      cam.scrollX += CONSTANTS.SCROLL_SIZE;

      if (cam.scrollX >= (this.game.config.width)) {
        cam.setScroll(0, cam.scrollY);
      }
    }

    if (this.keys.W.isDown || this.keys.UP.isDown) {
      cam.scrollY -= CONSTANTS.SCROLL_SIZE;

      if (cam.scrollY < ( -this.game.config.height)) {
        cam.setScroll(cam.scrollX, 0);
      }
    } else if (this.keys.S.isDown || this.keys.DOWN.isDown) {
      cam.scrollY += CONSTANTS.SCROLL_SIZE;

      if (cam.scrollY >= (this.game.config.height)) {
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
  scene: [StartScreen, Boot, HUD, MainScene],
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

const game = new Phaser.Game(config);

export default config;