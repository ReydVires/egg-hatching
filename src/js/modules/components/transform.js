import { ScreenUtility } from "../../helper/screenUtility";

/**
 * @typedef {(Phaser.GameObjects.GameObject & Phaser.GameObjects.Components.ComputedSize & Phaser.GameObjects.Components.Origin & Phaser.GameObjects.Components.Transform) | Phaser.GameObjects.Rectangle} GameObject
 */

export class Transform {

	/** @private @type {GameObject} */
	_gameObject;
	/** @private @type {Phaser.Cameras.Scene2D.Camera} */
	_cameraRef;

	/**
	 * @param {Phaser.Scene} scene
	 * @param {GameObject} gameObject
	 */
	constructor (scene, gameObject) {
		this._gameObject = gameObject;
		this._cameraRef = scene.cameras.main;
	}

	get displayToOriginalWidthRatio () {
		return this._gameObject.displayWidth / this._gameObject.width;
	}

	get displayToOriginalHeightRatio () {
		return this._gameObject.displayHeight / this._gameObject.height;
	}

	get heightAspectRatio() { return this._gameObject.height / this._gameObject.width; }

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	getDisplayPositionFromCoordinate (x, y) {
		return new Phaser.Math.Vector2(
			this._gameObject.x + ((x - this._gameObject.originX) * this._gameObject.displayWidth),
			this._gameObject.y + ((y - this._gameObject.originY) * this._gameObject.displayHeight)
		);
	}

	/**
	 * @param {number} width
	 * @param {number} height
	 */
	setDisplaySize (width, height) {
		this._gameObject.displayWidth = width;
		this._gameObject.displayHeight = height;
	}

	/**
	 * @param {number} percent
	 */
	setToScaleDisplaySize (percent) {
		this.setDisplaySize(percent * this._gameObject.width, percent * this._gameObject.height);
	}

	setDisplayHeightToAspectRatio () {
		this._gameObject.displayHeight = this._gameObject.displayWidth * this.heightAspectRatio;
	}

	/**
	 * @param {number} width
	 * @param {boolean} matchHeightToAspectRatio
	 */
	setDisplayWidth (width, matchHeightToAspectRatio) {
		this._gameObject.displayWidth = width;
		(matchHeightToAspectRatio) && this.setDisplayHeightToAspectRatio();
	}

	/**
	 * @param {boolean} [matchHeightToAspectRatio]
	 */
	setDisplayWidthAsScreenWidth (matchHeightToAspectRatio) {
		this.setDisplayWidth(ScreenUtility.getInstance().width, matchHeightToAspectRatio);
	}

}