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
    window.MainScene = this;
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

    // camera settings
    this.cameras.main.setViewport(0.5, 0.3, this.game.config.width, this.game.config.height);
    // this.cameras.main.setBounds(0.5, 0.3, this.game.config.width * 2, this.game.config.height * 2);
    // this.backgroundGame = this.add.tileSprite(-this.game.config.width * 2.5, -this.game.config.height * 2.5, this.game.config.width * 5, this.game.config.height * 5, 'gameBg').setOrigin(0)
    // this.backgroundGame.setScrollFactor(0);
    // this.backgroundGame.fixedToCamera = true;
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
    console.log(this.cameras.main);
  }

  update() {
    const gameBG = this.backgroundGame;
    const cam = this.cameras.main;

    // this.backgroundGame.tilePositionX = cam.scrollX;
    // this.backgroundGame.tilePositionY = cam.scrollY;

    if (this.keys.A.isDown || this.keys.LEFT.isDown) {
      cam.scrollX -= CONSTANTS.SCROLL_SIZE;
      // this.backgroundGame.tilePositionX += 1;
    } else if (this.keys.D.isDown || this.keys.RIGHT.isDown) {
      cam.scrollX += CONSTANTS.SCROLL_SIZE;
      // this.backgroundGame.tilePositionX -= 0.05;
    }

    if (this.keys.W.isDown || this.keys.UP.isDown) {
      cam.scrollY -= CONSTANTS.SCROLL_SIZE;
      // this.backgroundGame.tilePositionY += 0.05;
      // gameBG.tilePositionY -= CONSTANTS.SCROLL_SIZE;
    } else if (this.keys.S.isDown || this.keys.DOWN.isDown) {
      cam.scrollY += CONSTANTS.SCROLL_SIZE;
      // this.backgroundGame.tilePositionY += 0.05;
      // gameBG.tilePositionY += CONSTANTS.SCROLL_SIZE;
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

let fullScreenHeight = document.documentElement.getBoundingClientRect().height;
let fullScreenWidth = document.documentElement.getBoundingClientRect().width;

const config = {
  type: Phaser.AUTO,
  // mode: Phaser.Scale.FIT,
  parent: 'phaser_container',
  width: fullScreenWidth,
  height: fullScreenHeight,
  pixelArt: true,
  dom: {
    createContainer: true
  },        
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

const game = new Phaser.Game(config);

export default config;