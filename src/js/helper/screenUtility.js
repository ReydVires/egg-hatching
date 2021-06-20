export class ScreenUtility {

	/** @private @type {ScreenUtility} */
	static instance;

	/** @private @type {Phaser.Scene} */
	_scene;
	/** @private @type {number} */
	_defaultWidth = 1080;
	/** @private @type {number} */
	_defaultHeight = 1920;

	/** @private */
	constructor () {}

	static getInstance () {
		if (!ScreenUtility.instance) {
			ScreenUtility.instance = new ScreenUtility();
		}
		return ScreenUtility.instance;
	}

	/**
	 * @param {Phaser.Scene} scene
	 * @param {number} [defaultWidth]
	 * @param {number} [defaultHeight]
	 */
	init (scene, defaultWidth, defaultHeight) {
		return new Promise((resolve) => {
			this._scene = scene;
			this.setDefaultScreenSize(defaultWidth ?? this._defaultWidth, defaultHeight ?? this._defaultHeight);
			resolve();
		});
	}

	get width () {
		return this._scene.cameras.main.width;
	}

	get height () {
		return this._scene.cameras.main.height;
	}

	get centerX () {
		return this.width * 0.5;
	}

	get centerY () {
		return this.height * 0.5;
	}

	get screenPercentage () {
		return this.width / this._defaultWidth;
	}

	get defaultScreenSize () {
		return { width: this._defaultWidth, height: this._defaultHeight };
	}

	/**
	 * @param {number} width
	 * @param {number} height
	 */
	setDefaultScreenSize (width, height) {
		this._defaultWidth = width;
		this._defaultHeight = height;
	}

}