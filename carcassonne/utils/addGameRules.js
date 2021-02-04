const addRules = function (scene, x, y, background, gameRules) {
  return scene.rexUI.add.textArea({
    x,
    y,
    width: (window.innerWidth > 1280) ? 553 : 450,
    height: (window.innerWidth > 1280) ? 680 : 570,
    text: scene.add.text(0, 0, '', {
      color: 'black',
      fontFamily: 'Thintel',
      fontSize: (window.innerWidth > 1280) ? '30px' : '22px',
    }),
    background,
    content: gameRules,
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
    },
  })
    .layout()
    .fadeIn(500);
};

export default addRules;
