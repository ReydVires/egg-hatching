import { ScreenUtility } from "../../../helper/screenUtility";
import { layerDepth } from "../misc/layer_depth";

export class OverlayFlashUIView {

	/** @private @type {Phaser.Scene} */
	_scene;
	/** @private @type {ScreenUtility} */
	_screenUtil;
	/** @private @type {Phaser.GameObjects.Graphics} */
	_flashObject;

	/**
	 * @param {Phaser.Scene} scene
	 * @param {ScreenUtility} screenUtil
	 */
	constructor (scene, screenUtil) {
		this._scene = scene;
		this._screenUtil = screenUtil;
		this.create();
	}

	/**
	 * @private
	 */
	create () {
		const { width: screenWidth, height: screenHeight } = this._screenUtil;
		this._flashObject = this._scene.add.graphics().setDepth(layerDepth.OVERLAY_LIGHT).setAlpha(0).setVisible(false);
		this._flashObject.fillStyle(0xfafafa, 1);
		this._flashObject.fillRect(0, 0, screenWidth, screenHeight);
	}

	/**
	 * @param {Function} onComplete
	 */
	showFlashlight (onComplete) {
		this._flashObject.setVisible(true);
		this._scene.tweens.add({
			targets: this._flashObject,
			duration: 500,
			alpha: 1,
			onComplete: () => (onComplete) && onComplete(),
		});
	}

}