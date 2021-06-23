import { ScreenUtility } from "../../../helper/screenUtility";
import { layerDepth } from "../info/layer_depth";

export class OverlayFlashUIView {

	/** @private @type {Phaser.Scene} */
	_scene;
	/** @private @type {ScreenUtility} */
	_screenUtil;
	/** @private @type {Phaser.Tweens.Tween} */
	_flashDimTween;

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
		const flashObject = this._scene.add.graphics().setDepth(layerDepth.OVERLAY_LIGHT_DIM);
		flashObject.fillStyle(0xfafafa, 1);
		flashObject.fillRect(0, 0, screenWidth, screenHeight);

		this._flashDimTween = this._scene.tweens.create({
			targets: [flashObject],
			duration: 300,
			props: {
				alpha: { getStart: () => 1, getEnd: () => 0 }
			},
		});
	}

	dimTweenEffect () {
		this._flashDimTween.play();
	}

}