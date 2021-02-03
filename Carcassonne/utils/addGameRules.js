const addRules = function(scene, x, y, background, game_rules) {
    return scene.rexUI.add.textArea({
      x: x,
      y: y,
      // width: 453,
      // height: 580,
      width: 553,
      height: 680,
      // background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, 0x260e04),
      text: scene.add.text(0, 0, '', {
        color: 'black',
        fontFamily: 'Thintel',
        fontSize: '30px',
        // align: 'center',
      }),
      background: background,
      content: game_rules,
      slider: {
        track: scene.rexUI.add.roundRectangle(0, 0, 6, 6, 6, 0xb5855e),
        thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 5, 0xf1c995),
      },
      scroller: {
        threshold: 10,
        slidingDeceleration: 5000,
        backDeceleration: 2000,
      },
      space: {
        left: 60,
        right: 40,
        top: 100,
        bottom: 100,
        text: {
           top: 0,
           bottom: 0,
           left: 50,
           right: 10,
        },
        // header: 0,
        // footer: 0,
      },
    })
    .layout()
    .fadeIn(500)
    
    // .drawBounds(scene.add.graphics(), 0xff0000)
    // .setText(rulesContentEn);
    // .setText(CreateContent(10000));
  }
  
  // var CreateContent = function (linesCount) {
  //   var numbers = [];
  //   for (var i = 0; i < linesCount; i++) {        
  //       numbers.push('[color=' + ((i % 2) ? 'green' : 'yellow') + ']' + i.toString() + '[/color]');
  //   }
  //   return rulesContent + '\n' + numbers.join('\n');
  // }

  export default addRules;


  // const nextBtnBackground = this.add.image(0, 0, 'next_step_btn');
    // const turnBtnBackground = this.add.image(0, 0, 'turn_btn');
    // const setChipBtnBackground = this.add.image(0, 0, 'set_chip_btn');
    // this.controlBtns = this.rexUI.add
    //   .buttons({
    //     x: this.game.config.width -  125,
    //     y: this.game.config.height - 100,
    //     // width: 200,
    //     orientation: 'x',
    //     space: {
    //       item: 10,
    //     },
    //     // anchor: {
    //     //   left: 'center-400',
    //     //   centerY: 'center-30',
    //     // },
    //     buttons: [
    //       createSimpleBtn(this, 'next_step', nextBtnBackground),
    //       createSimpleBtn(this, 'turn_card',  turnBtnBackground),
    //       createSimpleBtn(this, 'set_chip', setChipBtnBackground),
    //     ],
    //     // space: { item: 10 },
    //     expand: true
    //   })
    //   .layout();

    // this.controlBtns.on('button.click', function (button, index, pointer, event) {
      
    //   console.log(`Click button ${button.name}`);

    //   //CONTROL BUTTONS LOGIC HERE

    // }, this);

    // this.controlBtns.on('button.over', function(button, index, ponter, event) {
    //   button.backgroundChildren[0].setTint(CONSTANTS.BTNS_HOVER_COLOR);
    // });

    // this.controlBtns.on('button.out', function(button, index, ponter, event) {
    //   button.backgroundChildren[0].clearTint();
    // })