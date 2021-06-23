import { ScreenUtility } from "../../../helper/screenUtility";
import { layerDepth } from "../info/layer_depth";

export class DimOverlayView {

	/** @private @type {Phaser.Scene} */
	_scene;
	/** @private @type {ScreenUtility} */
	_screenUtil;

	/** @private @type {Phaser.GameObjects.Rectangle} */
	_dimOverlay;

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
		const { centerX, centerY, width: screenWidth, height: screenHeight } = this._screenUtil;
		this._dimOverlay = this._scene.add.rectangle(centerX, centerY, screenWidth, screenHeight, 0x636e72, 1);
		this._dimOverlay.setAlpha(0).setVisible(false).setDepth(layerDepth.OVERLAY_DIM);
	}

	alphaTween () {
		this._scene.tweens.add({
			onStart: () => this._dimOverlay.setVisible(true),
			targets: [this._dimOverlay],
			props: {
				alpha: { getStart: () => 0, getEnd: () => 0.65 },
			},
			duration: 300,
		});
	}

}