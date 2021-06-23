import { Assets } from "../../../assetLibrary/assetHatch";
import { Image } from "../../../modules/gameobjects/image";
import { ScreenUtility } from "../../../helper/screenUtility";

export class ShineGlowView {

	/** @private @type {Phaser.Scene} */
	_scene;
	/** @private @type {ScreenUtility} */
	_screenUtil;

	/** @private @type {Image} */
	_shineEffect;

	/**
	 * @param {Phaser.Scene} scene
	 * @param {ScreenUtility} screenUtil
	 * @param {Phaser.Math.Vector2} initPosition
	 * @param {number} ratio
	 */
	constructor (scene, screenUtil, initPosition, ratio) {
		this._scene = scene;
		this._screenUtil = screenUtil;
		this.create(initPosition, ratio);
	}

	/**
	 * @private
	 * @param {Phaser.Math.Vector2} initPosition
	 * @param {number} ratio
	 */
	create (initPosition, ratio) {
		const { centerX } = this._screenUtil
		this._shineEffect = new Image(this._scene, centerX, initPosition.y, Assets.shine.key);
		this._shineEffect.transform.setToScaleDisplaySize(ratio * 0.375);
	}

	playTween () {
		this._scene.tweens.add({
			targets: this._shineEffect.gameObject,
			delay: 1800,
			duration: 300,
			props: {
				alpha: { getStart: () => 1, getEnd: () => 0 }
			},
			ease: Phaser.Math.Easing.Linear,
		});
		this._scene.tweens.add({
			targets: this._shineEffect.gameObject,
			duration: 2100,
			props: {
				angle: { getStart: () => 0, getEnd: () => 15 }
			},
			ease: Phaser.Math.Easing.Linear,
		});
	}

}