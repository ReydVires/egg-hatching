import { Assets } from "../../../assetLibrary/assetHatch";
import { Image } from "../../../modules/gameobjects/image";
import { LayerDepth } from "../../../const/layerDepth";

export class TokoPointButtonView {

	/** @private @type {Phaser.Scene} */
	_scene;

	/** @private @type {number} */
	_baseRatio;
	/** @private @type {Image} */
	_tokoPointBtn;

	/**
	 * @param {Phaser.Scene} scene
	 * @param {Phaser.Math.Vector2} initPosition
	 * @param {number} ratio
	 */
	constructor (scene, initPosition, ratio) {
		this._scene = scene;
		this._baseRatio = ratio
		this.create(initPosition, ratio);
	}

	/**
	 * @private
	 * @param {Phaser.Math.Vector2} initPosition
	 * @param {number} ratio
	 */
	create (initPosition, ratio) {
		this._tokoPointBtn = new Image(this._scene, initPosition.x, initPosition.y * 1.08, Assets.tokopoints_btn.key);
		this._tokoPointBtn.transform.setToScaleDisplaySize(ratio);
		this._tokoPointBtn.gameObject.setDepth(LayerDepth.hatch.PANEL_POPUP).setVisible(false);
	}

	/**
	 * @param {Function} event
	 */
	onClick (event) {
		this._tokoPointBtn.gameObject.setInteractive({useHandCursor: true})
			.on(Phaser.Input.Events.POINTER_DOWN, event);
	}

	/**
	 * @param {Function} [sfxEvent]
	 */
	scaleTween (sfxEvent) {
		this._tokoPointBtn.gameObject.setScale(0);
		this._scene.tweens.add({
			onStart: () => {
				(sfxEvent) && sfxEvent();
				this._tokoPointBtn.gameObject.setVisible(true);
			},
			targets: this._tokoPointBtn.gameObject,
			delay: 600,
			duration: 500,
			props: {
				scale: { getStart: () => 0.1, getEnd: () => this._baseRatio }
			},
			ease: Phaser.Math.Easing.Back.Out,
		});
	}

	/**
	 * @param {Function} [onComplete]
	 */
	hideButtonTween (onComplete) {
		this._scene.tweens.add({
			targets: this._tokoPointBtn.gameObject,
			delay: 350,
			scale: 0,
			duration: 500,
			ease: Phaser.Math.Easing.Back.In,
			onComplete: () => onComplete(),
		});
	}

}