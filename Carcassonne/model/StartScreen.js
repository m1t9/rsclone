export default class StartScreen extends Phaser.Scene {
    constructor () {
      super({ key: 'StartScreen'})
    }
  
    preload () {
      this.load.image('castle1', './assets/test_startScreen/castle_01.png')
      this.load.image('castle2', './assets/test_startScreen/castle_02.png');
      this.load.image('castle3', './assets/test_startScreen/castle_03.png');
  
      this.load.image('grey_btn', './assets/btns/grey_button06.png');
      this.load.scenePlugin(
        'rexuiplugin',
        'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
        'rexUI',
        'rexUI'
      )
    }
  
    create () {
      // this.stage.background = 0x1b1a1c;
      this.cameras.main.setBackgroundColor(0x1b1a1c);
  
      this.anims.create({
        key: 'castleAnim',
        frames: [
          { key: 'castle1', duration: 100 },
          { key: 'castle2', duration: 100 }, 
          { key: 'castle3', duration: 100 }
        ],
        framrate: 10,
        repeat: -1,
      });
  
      this.add.sprite(this.game.config.width / 2, 450, 'castle1').setScale(1.1).play('castleAnim');
  
      const startBtnBackground = this.add.image(0, 0, 'grey_btn');
      const optionsBtnBackground = this.add.image(0, 0, 'grey_btn');
      let startBtn = this.rexUI.add
        .buttons({
          x: 0,
          y: 0,
          width: 200,
          orientation: 'y',
          space: {
            item: 10,
          },
          anchor: {
            left: 'center -125',
            centerY: 'center -15'
          },
          buttons: [
            createBtn(this, 'New Game', startBtnBackground),
            createBtn(this, 'Options', optionsBtnBackground),
          ],
          // space: { item: 10 },
          expand: true
        })
        .layout();
  
        startBtn.on('button.click', function (button, index, pointer, event) {
          console.log(`Click button ${button.text}`)
          this.scene.launch('UIScene');
          this.scene.launch('MainScene');
          this.scene.remove('StartScreen');
          // startBtn.clearButtons(true);
      }, this)
    }
  }
  
  const createBtn = function (scene, text, background) {
    return scene.rexUI.add.label({
      width: 30,
      height: 30,
      name: text,
      text: scene.add.text(0, 0, text, {
        fontSize: 18,
        color: 'black'
      }),
      background: background,
      space: {
        // left: 10,
        // right: 10,
        top: 20,
        bottom: 20
      },
      align: 'center'
    })
  }