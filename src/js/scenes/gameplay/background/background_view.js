import { Assets } from "../../../assetLibrary/assetGameplay";
import { Image } from "../../../modules/gameobjects/image";
import { LayerDepth } from "../../../const/layerDepth";
import { ScreenUtility } from "../../../helper/screenUtility";

export class BackgroundView {

	/** @private @type {Phaser.Scene} */
	_scene;
	/** @private @type {ScreenUtility} */
	_screenUtil;
	/** @private @type {number} */
	_baseRatio;
	/** @private @type {number} */
	_hatchNestRatio;

	/**
	 * @param {Phaser.Scene} scene
	 */
	constructor (scene) {
		this._scene = scene;
		this._screenUtil = ScreenUtility.getInstance();
		this.create();
	}

	get baseRatio () {
		return this._baseRatio;
	}

	get hatchNestRatio () {
		return this._hatchNestRatio;
	}

	/**
	 * @private
	 */
	create () {
		const { centerX, centerY, width: screenWidth, height: screenHeight } = this._screenUtil;
		const background = new Image(this._scene, centerX, centerY, Assets.background.key);
		background.transform.setDisplayWidthAsScreenWidth(true);

		this._baseRatio = background.transform.displayToOriginalHeightRatio;

		const board = new Image(this._scene, centerX * 0.5, centerY * 0.7, Assets.board.key);
		board.transform.setToScaleDisplaySize(this._baseRatio * 0.7);

		const windowOnWall = new Image(this._scene, centerX * 1.5, centerY * 0.7, Assets.window.key);
		windowOnWall.transform.setToScaleDisplaySize(this._baseRatio * 0.8);

		const lamp = new Image(this._scene, centerX * 1.5, centerY * 1.05, Assets.lamp.key);
		lamp.transform.setToScaleDisplaySize(this._baseRatio * 1.4);

		const nestPosition = lamp.transform.getDisplayPositionFromCoordinate(0.5, 1.15);
		const hatchNest = new Image(this._scene, nestPosition.x, nestPosition.y, Assets.nest.key);
		hatchNest.transform.setToScaleDisplaySize(this._baseRatio * 1.35);

		this._hatchNestRatio = hatchNest.transform.displayToOriginalHeightRatio;

		const eggPosition = hatchNest.transform.getDisplayPositionFromCoordinate(0.5, 0.3);
		const egg = new Image(this._scene, eggPosition.x, eggPosition.y, Assets.blue_egg.key);
		egg.transform.setToScaleDisplaySize(this._baseRatio * 1.25);
		egg.gameObject.setOrigin(0.5, 1);

		const leafLeft = new Image(this._scene, 0, screenHeight, Assets.leaf.key);
		leafLeft.transform.setToScaleDisplaySize(this._baseRatio * 1.25);
		leafLeft.gameObject.setOrigin(0, 1).setDepth(LayerDepth.gameplay.LEAF);

		const leafRight = new Image(this._scene, screenWidth, screenHeight, Assets.leaf.key);
		leafRight.transform.setToScaleDisplaySize(this._baseRatio * 1.25);
		leafRight.gameObject.setOrigin(1, 1).setFlipX(true).setDepth(LayerDepth.gameplay.LEAF);
	}

}