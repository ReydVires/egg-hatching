import { LayerDepth } from "../../../const/layerDepth";
import { ScreenUtility } from "../../../helper/screenUtility";

export class OverlayFlashUIView {

	/** @private @type {Phaser.Scene} */
	_scene;
	/** @private @type {ScreenUtility} */
	_screenUtil;
	/** @private @type {Phaser.Tweens.Tween} */
	_flashDimTween;

	/**
	 * @param {Phaser.Scene} scene
	 */
	constructor (scene) {
		this._scene = scene;
		this._screenUtil = ScreenUtility.getInstance();
		this.create();
	}

	/**
	 * @private
	 */
	 create () {
		const { width: screenWidth, height: screenHeight } = this._screenUtil;
		const flashObject = this._scene.add.graphics().setDepth(LayerDepth.hatch.OVERLAY_LIGHT_DIM);
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