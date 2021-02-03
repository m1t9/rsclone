<<<<<<< HEAD

// import CONSTANTS from './CONSTANTS.js';

// function disableButton(btn) {
// 	btn.setTint(CONSTANTS.BTNS_HOVER_COLOR);
// 	btn.disableInteractive();
// }

// function enableButton(btn) {
// 	btn.setInteractive();
// 	btn.clearTint();
// }

// function changeText(gameObj, text) {
// 	gameObj.setText(text);
// 	gameObj.text.setStyle({align: 'center'})
// };

// export {
// 	disableButton,
// 	enableButton,
// 	changeText
// }
=======

import CONSTANTS from './CONSTANTS.js';

function disableButton(btn) {
	btn.setTint(CONSTANTS.BTNS_HOVER_COLOR);
	btn.disableInteractive();
}

function enableButton(btn) {
	btn.setInteractive();
	btn.clearTint();
}

function changeText(gameObj, text) {
	gameObj.setText(text);
	gameObj.text.setStyle({align: 'center'})
};

export {
	disableButton,
	enableButton,
	changeText
}
>>>>>>> origin/develop
