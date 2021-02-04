/* eslint-disable import/extensions */
// import Phaser, { Game, Scene } from '../../phaser.js';
import IsoPlugin from './src/IsoPlugin.js';
import Board from './model/Board.js';
import HUD from './model/Hud.js';
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
  }

  preload() {
    window.MainScene = this;
    this.load.scenePlugin({
      key: 'IsoPlugin',
      url: IsoPlugin,
      sceneKey: 'iso',
    });
  }

  create() {
    this.cameras.main.setBackgroundColor(CONSTANTS.SCENE_BACKGROUND);
    this.isoGroup = this.add.group();
    this.iso.projector.origin.setTo(0.5, 0.3);
    this.spawnTiles();
    this.cameras.main.setViewport(0.5, 0.3, this.game.config.width, this.game.config.height);
    this.cameras.main.setZoom(1);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys('W, A , S , D, PLUS, MINUS, UP, DOWN, LEFT, RIGHT');

    this.input.on('wheel', function (pointer) {
      if (pointer.deltaY > 0 && this.cameras.main.zoom > 0.4) {
        this.cameras.main.zoom -= 0.25;
      } else if (pointer.deltaY < 0) {
        this.cameras.main.zoom += 0.25;
      }
    });
  }

  update() {
    const cam = this.cameras.main;

    if (this.keys.A.isDown || this.keys.LEFT.isDown) {
      cam.scrollX -= CONSTANTS.SCROLL_SIZE;
    } else if (this.keys.D.isDown || this.keys.RIGHT.isDown) {
      cam.scrollX += CONSTANTS.SCROLL_SIZE;
    }

    if (this.keys.W.isDown || this.keys.UP.isDown) {
      cam.scrollY -= CONSTANTS.SCROLL_SIZE;
    } else if (this.keys.S.isDown || this.keys.DOWN.isDown) {
      cam.scrollY += CONSTANTS.SCROLL_SIZE;
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
  dom: {
    createContainer: true,
  },
  scene: [StartScreen, Boot, MainScene, HUD],
  arcade: {
    debug: true,
    // gravity: { y: 200 }
  },
};

const game = new Phaser.Game(config);

export default config;
