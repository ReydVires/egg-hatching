import { Animations } from "../../assetLibrary/animations";
import { Assets } from "../../assetLibrary/assetGameplay";
import { FontAsset } from "../../assetLibrary/assetFont";
import { Image } from "../../modules/gameobjects/image";
import { ScreenUtility } from "../../helper/screenUtility";
import { Sprite } from "../../modules/gameobjects/sprite";
import { Text } from "../../modules/gameobjects/text";
import { addAnimation } from "../../helper/animationHelper";

export class GameplaySceneView {

	/** @private @type {Phaser.Scene} */
	_scene;
	/** @private @type {Phaser.Events.EventEmitter} */
	_event;
	/** @private @type {ScreenUtility} */
	_screenUtil;

	/**
	 * @param {Phaser.Scene} scene
	 */
	constructor (scene) {
		this._scene = scene;
		this._event = new Phaser.Events.EventEmitter();
		this._screenUtil = ScreenUtility.getInstance();
	}

	create () {
		const {
			centerX,
			centerY,
			width: screenWidth,
			height: screenHeight
		} = this._screenUtil;

		const background = new Image(this._scene, centerX, centerY, Assets.background.key);
		background.transform.setDisplayWidthAsScreenWidth(true);

		const baseRatio = background.transform.displayToOriginalHeightRatio;

		//#region Environment
		const board = new Image(this._scene, centerX * 0.5, centerY * 0.7, Assets.board.key);
		board.transform.setToScaleDisplaySize(baseRatio * 0.7);

		const windowOnWall = new Image(this._scene, centerX * 1.5, centerY * 0.7, Assets.window.key);
		windowOnWall.transform.setToScaleDisplaySize(baseRatio * 0.8);

		const lamp = new Image(this._scene, centerX * 1.5, centerY * 1.05, Assets.lamp.key);
		lamp.transform.setToScaleDisplaySize(baseRatio * 1.4);

		const nestPosition = lamp.transform.getDisplayPositionFromCoordinate(0.5, 1.15);
		const hatchNest = new Image(this._scene, nestPosition.x, nestPosition.y, Assets.nest.key);
		hatchNest.transform.setToScaleDisplaySize(baseRatio * 1.35);

		const eggPosition = hatchNest.transform.getDisplayPositionFromCoordinate(0.5, 0.3);
		const egg = new Image(this._scene, eggPosition.x, eggPosition.y, Assets.blue_egg.key);
		egg.transform.setToScaleDisplaySize(baseRatio * 1.25);
		egg.gameObject.setOrigin(0.5, 1);

		const char = new Sprite(this._scene, centerX * 0.5, centerY * 1.15, Assets.char_idle.key, 0);
		char.transform.setToScaleDisplaySize(baseRatio * 1.5);

		const leafLeft = new Image(this._scene, 0, screenHeight, Assets.leaf.key);
		leafLeft.transform.setToScaleDisplaySize(baseRatio * 1.25);
		leafLeft.gameObject.setOrigin(0, 1);

		const leafRight = new Image(this._scene, screenWidth, screenHeight, Assets.leaf.key);
		leafRight.transform.setToScaleDisplaySize(baseRatio * 1.25);
		leafRight.gameObject.setOrigin(1, 1).setFlipX(true);
		//#endregion

		addAnimation(this._scene, Animations.char_idle);
		char.gameObject.play(Animations.char_idle.key);

		const playBtn = new Image(this._scene, centerX, screenHeight * 0.9, Assets.btn.key);
		playBtn.transform.setToScaleDisplaySize(baseRatio * 0.5);

		const playBtnLabelPosition = playBtn.transform.getDisplayPositionFromCoordinate(0.5, 0.5);
		const playBtnLabel = new Text(this._scene, playBtnLabelPosition.x, playBtnLabelPosition.y, "100", {
			align: "center",
			fontFamily: FontAsset.cabin.key,
			fontSize: `${52 * baseRatio}px`
		});
		playBtnLabel.gameObject.setOrigin(0.5);
	}

}