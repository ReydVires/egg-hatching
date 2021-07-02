import { Assets as AssetGameplay } from "../../../assetLibrary/assetGameplay";
import { Assets } from "../../../assetLibrary/assetHatch";
import { Image } from "../../../modules/gameobjects/image";
import { ScreenUtility } from "../../../helper/screenUtility";

export class BackgroundView {

	/** @private @type {Phaser.Scene} */
	_scene;
	/** @private @type {ScreenUtility} */
	_screenUtil;
	/** @private @type {number} */
	_baseRatio;

	/** @private @type {Image} */
	_hatchNest;

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
		return this._hatchNest.transform.displayToOriginalHeightRatio;
	}

	/**
	 * @private
	 */
	create () {
		const { centerX, centerY, height: screenHeight } = this._screenUtil;
		const background = new Image(this._scene, centerX, centerY, Assets.hatch_background.key);
		background.transform.setDisplayWidthAsScreenWidth(true);

		this._baseRatio = background.transform.displayToOriginalHeightRatio;

		this._hatchNest = new Image(this._scene, centerX, screenHeight * 0.9, AssetGameplay.nest.key);
		this._hatchNest.transform.setToScaleDisplaySize(background.transform.displayToOriginalHeightRatio * 6);
	}

	/**
	 * @param {number} x
	 * @param {number} [y]
	 */
	getDisplayPositionFromCoordinate (x, y = x) {
		return this._hatchNest.transform.getDisplayPositionFromCoordinate(x, y);
	}

}