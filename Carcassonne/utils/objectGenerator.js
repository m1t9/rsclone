const cardNames = [
  'castle_capital',
  'castle_capital+shield',
  'castle_capital+two_shield',
  'castle_corner+bottom_road',
  'castle_corner+right_road',
  'castle_corner+two_roads',
  'castle_four_quarter',
  'castle_half',
  'castle_half+quarter+shield',
  'castle_half+road_bend_left+bottom',
  'castle_half+road_bend_left+bottom+shield',
  'castle_half+road_bottom',
  'castle_half+road_right',
  'castle_half+road_right+quarter',
  'castle_half+shield',
  'castle_half+two_quarter',
  'castle_half+two_road',
  'castle_oneSide',
  'castle_oneSide+shield',
  'castle_quarter',
  'castle_quarter+road_bend_left',
  'castle_quarter+road_bend_left+bottom',
  'castle_quarter+road_bend_right',
  'castle_quarter+road_bend_right+bottom',
  'castle_quarter+road_bottom',
  'castle_quarter+road_cross+bridge',
  'castle_quarter+road_straight',
  'castle_quarter+road_T',
  'castle_three_quarter',
  'castle_threeQuarte+shield',
  'castle_threeQuarter',
  'castle_threeQuarter+road',
  'castle_threeQuarter+road+shield',
  'castle_two_half',
  'castle_two_quarter',
  'castle_two_quarter_opposite',
  'castle_two_quarter+two_road',
  'castle_two_quarters+road_straight',
  'castle_twoSides',
  'castle_twoSides+quarter',
  'castle_twoSides+road',
  'castle_twoSides+shield',
  'castle_twoSides+two_roads',
  'castle_twoSides+two_roads+shield',
  'church',
  'church+four_roads',
  'church+road',
  'church+three_roads',
  'church+two_roads',
  'road_bend',
  'road_cross',
  'road_cross+bridge',
  'road_deadEnd',
  'road_straight',
  'road_T',
  'road_two_bend',
];

const amount = [
  2,
  1,
  1,
  1,
  1,
  1,
  1,
  5,
  1,
  3,
  3,
  2,
  2,
  2,
  2,
  1,
  1,
  1,
  1,
  5,
  1,
  5,
  1,
  5,
  1,
  1,
  4,
  3,
  1,
  1,
  4,
  2,
  2,
  2,
  2,
  3,
  1,
  1,
  2,
  2,
  2,
  2,
  2,
  1,
  4,
  1,
  2,
  1,
  1,
  10,
  1,
  1,
  1,
  10,
  5,
  1,
];

const sides = [
  ['land', 'land', 'land', 'land', 'land'],
  ['land', 'land', 'land', 'land', 'land'],
  ['land', 'land', 'land', 'land', 'land'],
  ['land', 'grass', 'land', 'road', 'land'],
  ['land', 'road', 'land', 'grass', 'land'],
  ['land', 'road', 'land', 'road', 'land'],
  ['land', 'land', 'land', 'land', 'grass'],
  ['land', 'grass', 'land', 'grass', 'grass'],
  ['land', 'grass', 'land', 'land', 'grass'],
  ['land', 'road', 'land', 'road', 'grass'],
  ['land', 'road', 'land', 'road', 'grass'],
  ['land', 'grass', 'land', 'road', 'grass'],
  ['land', 'road', 'land', 'grass', 'road'],
  ['land', 'road', 'land', 'land', 'road'],
  ['land', 'grass', 'land', 'grass', 'grass'],
  ['land', 'land', 'land', 'land', 'grass'],
  ['land', 'road', 'land', 'road', 'grass'],
  ['grass', 'grass', 'land', 'grass', 'land'],
  ['grass', 'grass', 'land', 'grass', 'land'],
  ['land', 'grass', 'grass', 'grass', 'grass'],
  ['land', 'grass', 'road', 'grass', 'road'],
  ['land', 'grass', 'road', 'road', 'grass'],
  ['land', 'road', 'grass', 'grass', 'road'],
  ['land', 'road', 'grass', 'road', 'grass'],
  ['land', 'grass', 'grass', 'road', 'road'],
  ['land', 'grass', 'road', 'road', 'road'],
  ['land', 'road', 'road', 'grass', 'road'],
  ['land', 'road', 'road', 'road', 'road'],
  ['land', 'land', 'land', 'grass', 'grass'],
  ['land', 'land', 'land', 'grass', 'land'],
  ['land', 'land', 'land', 'grass', 'land'],
  ['land', 'land', 'land', 'road', 'land'],
  ['land', 'land', 'land', 'road', 'land'],
  ['land', 'land', 'land', 'land', 'grass'],
  ['land', 'grass', 'land', 'grass', 'grass'],
  ['land', 'grass', 'grass', 'land', 'grass'],
  ['land', 'road', 'land', 'road', 'grass'],
  ['land', 'road', 'road', 'land', 'road'],
  ['grass', 'land', 'land', 'grass', 'land'],
  ['grass', 'land', 'land', 'land', 'land'],
  ['grass', 'land', 'land', 'road', 'land'],
  ['grass', 'land', 'land', 'grass', 'land'],
  ['road', 'land', 'land', 'road', 'land'],
  ['road', 'land', 'land', 'road', 'land'],
  ['grass', 'grass', 'grass', 'grass', 'chirch'],
  ['road', 'road', 'road', 'road', 'chirch'],
  ['grass', 'grass', 'grass', 'road', 'chirch'],
  ['grass', 'road', 'road', 'road', 'chirch'],
  ['grass', 'road', 'road', 'grass', 'chirch'],
  ['grass', 'grass', 'road', 'road', 'road'],
  ['road', 'road', 'road', 'road', 'grass'],
  ['road', 'road', 'road', 'road', 'road'],
  ['grass', 'grass', 'grass', 'road', 'road'],
  ['grass', 'road', 'road', 'grass', 'road'],
  ['grass', 'road', 'road', 'road', 'grass'],
  ['road', 'road', 'road', 'road', 'grass'],
];

const points = [
  [2, 2, 2, 2, 2],
  [4, 4, 4, 4, 4],
  [6, 6, 6, 6, 6],
  [2, 0, 2, 1, 2],
  [2, 1, 2, 0, 2],
  [2, 1, 2, 1, 2],
  [2, 2, 2, 2, 0],
  [2, 0, 2, 0, 0],
  [4, 0, 4, 2, 0],
  [2, 1, 2, 1, 0],
  [4, 1, 4, 1, 0],
  [2, 0, 2, 1, 0],
  [2, 1, 2, 0, 1],
  [2, 1, 2, 2, 1],
  [4, 0, 4, 0, 0],
  [2, 2, 2, 2, 0],
  [2, 1, 2, 1, 0],
  [0, 0, 2, 0, 2],
  [0, 0, 4, 0, 4],
  [2, 0, 0, 0, 0],
  [2, 0, 1, 0, 1],
  [2, 0, 1, 1, 0],
  [2, 1, 0, 0, 1],
  [2, 1, 0, 1, 0],
  [2, 0, 0, 1, 1],
  [2, 0, 1, 1, 1],
  [2, 1, 1, 0, 1],
  [2, 1, 1, 1, 1],
  [2, 2, 2, 0, 0],
  [4, 4, 4, 0, 4],
  [2, 2, 2, 0, 2],
  [2, 2, 2, 1, 2],
  [4, 4, 4, 1, 4],
  [2, 2, 2, 2, 0],
  [2, 0, 2, 0, 0],
  [2, 0, 0, 2, 0],
  [2, 1, 2, 1, 0],
  [2, 1, 1, 2, 1],
  [0, 2, 2, 0, 2],
  [0, 2, 2, 2, 2],
  [0, 2, 2, 1, 2],
  [0, 4, 4, 0, 4],
  [1, 2, 2, 1, 2],
  [1, 4, 4, 1, 4],
  [0, 0, 0, 0, 9],
  [1, 1, 1, 1, 9],
  [0, 0, 0, 1, 9],
  [0, 1, 1, 1, 9],
  [0, 1, 1, 0, 9],
  [0, 0, 1, 1, 1],
  [1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1],
  [0, 0, 0, 1, 1],
  [0, 1, 1, 0, 1],
  [0, 1, 1, 1, 0],
  [1, 1, 1, 1, 0]
];

const names = {
  newGame_en: 'New game',
  newGame_ru: 'Новая игра',
  saveGame_en: 'Save Game',
  saveGame_ru: 'Сохранить игру',
  loadGame_en: 'Load Game',
  loadGame_ru: 'Загрузить игру',
  sound_en: 'Sound',
  sound_ru: 'Звук',
  about_en: 'About',
  about_ru: 'О нас',
  options_en: 'Options',
  options_ru: 'Настройки'
}

function objectGenerator() {
  const objArr = [];
  let count = 0;

  cardNames.forEach((cardName) => {
    const item = {};

    item.number = count;
    item.name = cardName;
    item.side1 = sides[count][0];
    item.side2 = sides[count][1];
    item.side3 = sides[count][2];
    item.side4 = sides[count][3];
    item.points = 1;
    // item.amount = amount[count];

    for (let i = 0; i < amount[count]; i += 1) {
      objArr.push(item);
    }

    count += 1;
  });

  return objArr;
}

export {
  objectGenerator,
  cardNames,
};