import { Assets } from "../../../assetLibrary/assetHatch";
import { Image } from "../../../modules/gameobjects/image";
import { ScreenUtility } from "../../../helper/screenUtility";
import { layerDepth } from "../info/layer_depth";

export class HatchButtonView {

	/** @private @type {Phaser.Scene} */
	_scene;
	/** @private @type {ScreenUtility} */
	_screenUtil;

	/** @private @type {Image} */
	_hatchBtn;
	/** @private @type {Phaser.Tweens.Tween} */
	_hatchBtnTween;

	/**
	 * @param {Phaser.Scene} scene
	 * @param {ScreenUtility} screenUtil
	 * @param {number} ratio
	 */
	constructor (scene, screenUtil, ratio) {
		this._scene = scene;
		this._screenUtil = screenUtil;
		this.create(ratio);
	}

	/**
	 * @private
	 * @param {number} ratio
	 */
	create (ratio) {
		const { centerX, centerY } = this._screenUtil;
		this._hatchBtn = new Image(this._scene, centerX, centerY * 1.55, Assets.hatch_btn.key);
		this._hatchBtn.transform.setToScaleDisplaySize(ratio);
		this._hatchBtn.gameObject.setDepth(layerDepth.BUTTON).setVisible(false);

		this._hatchBtnTween = this._scene.tweens.create({
			onStart: () => {
				this._hatchBtn.gameObject.setVisible(true);
			},
			targets: this._hatchBtn.gameObject,
			delay: 300,
			duration: 500,
			props: {
				scale: { getStart: () => 0.1, getEnd: () => ratio }
			},
			ease: Phaser.Math.Easing.Back.Out,
		});
	}

	/**
	 * @param {Function} [sfxEvent]
	 */
	showButtonTween (sfxEvent) {
		(sfxEvent) && sfxEvent();
		this._hatchBtn.gameObject.setScale(0);
		this._hatchBtnTween.play();
	}

	/**
	 * @param {Function} events
	 * @param {Function} [sfxEvent]
	 */
	onClick (events, sfxEvent) {
		this._hatchBtn.gameObject.setInteractive({ useHandCursor: true }).once(Phaser.Input.Events.POINTER_DOWN, () => {
			(sfxEvent) && sfxEvent();
			this._scene.tweens.add({
				targets: this._hatchBtn.gameObject,
				scale: this._hatchBtn.gameObject.scale * 0.96,
				duration: 120,
				yoyo: true,
				onComplete: () => events()
			})
		});
	}

	/**
	 * @param {number} x 
	 * @param {number} [y] 
	 */
	getDisplayPositionFromCoordinate (x, y = x) {
		return this._hatchBtn.transform.getDisplayPositionFromCoordinate(x, y);
	}

}