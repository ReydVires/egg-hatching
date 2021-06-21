import "./css/index.css";

import { _CONFIG as CONFIG } from "./js/const/gameInfo";
import { GameplaySceneController } from "./js/scenes/gameplay/gameplay_scene_controller";
import { HatchSceneController } from "./js/scenes/hatch/hatch_scene_controller";
import { LoadingSceneController } from "./js/scenes/loading/loading_scene_controller";

const meta = document.createElement('meta');
meta.name = "viewport";
meta.content = `initial-scale=1.00,minimum-scale=1.00,maximum-scale=1.00,user-scalable=no`;
document.head.appendChild(meta);

const calculateScreen = () => {
	let actualWidth = window.innerWidth < 480 ? window.innerWidth * window.devicePixelRatio : window.innerWidth;
	let actualHeight = window.innerWidth < 480 ? window.innerHeight * window.devicePixelRatio : window.innerHeight;
	const actualZoom = window.innerWidth < 480 ? 1 / window.devicePixelRatio : 1;
	const isLandscape = window.innerWidth > window.innerHeight;

	if (isLandscape) {
		actualWidth = actualHeight * (3 / 4);
	}

	// Modulo 2 to prevent bleeding tile
	actualWidth = Math.round(actualWidth);
	actualHeight = Math.round(actualHeight);

	if (actualWidth % 2 != 0) {
		actualWidth++;
	}
	if (actualHeight % 2 != 0) {
		actualHeight++;
	}

	return {
		actualWidth,
		actualHeight,
		actualZoom,
		isLandscape
	};
};

const screenProfile = calculateScreen();
const isFirefox = /Firefox/i.test(navigator.userAgent);
const renderType = isFirefox ? Phaser.WEBGL : Phaser.CANVAS;

/** @type {Phaser.Types.Core.GameConfig} */
const gameConfig = {
	version: CONFIG.VERSION,
	banner: { hidePhaser: !CONFIG.ENABLE_LOG },
	type: renderType,
	parent: 'game',
	backgroundColor: (CONFIG.SHOW_DEBUG_LAYER) ? '#3498db' : '#181818',
	scale: {
		mode: Phaser.Scale.NONE,
		width: screenProfile.actualWidth,
		height: screenProfile.actualHeight,
		zoom: screenProfile.actualZoom,
		autoRound: true,
	},
	seed: [((+new Date()).toString(16) + (Math.random() * 100000000 | 0).toString(16))],
	scene: [
		LoadingSceneController,
		GameplaySceneController,
		HatchSceneController,
	],
	dom: {
		createContainer: true
	},
	render: {
		antialias: true,
		pixelArt: false,
		roundPixels: false,
	},
	autoFocus: true,
};

const game = new Phaser.Game(gameConfig);

window.addEventListener("load", () => {
	// Register resize handler event
	/** @type {number} */
	let execResize;
	const resizeEndEvent = new Event('resizeEnd');
	const EXEC_DELAY = /i(Phone|Pod|Pad|OS)/.test(navigator.userAgent) ? 380 : 50;

	window.addEventListener("resize", () => {
		clearTimeout(execResize);
		execResize = setTimeout(() => window.document.dispatchEvent(resizeEndEvent), EXEC_DELAY);
	}, false);

	window.document.addEventListener("resizeEnd", (e) => {
		const { actualWidth, actualHeight, actualZoom } = calculateScreen();
		game.scale.resize(actualWidth, actualHeight);
		game.scale.setZoom(actualZoom);
	});
});