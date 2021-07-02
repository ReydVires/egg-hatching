import { Assets } from "../../../assetLibrary/assetHatch";
import { Image } from "../../../modules/gameobjects/image";
import { LayerDepth } from "../../../const/layerDepth";
import { ScreenUtility } from "../../../helper/screenUtility";

export class CoinUIView {

	/** @private @type {Phaser.Scene} */
	_scene;
	/** @private @type {ScreenUtility} */
	_screenUtil;
	/** @private @type {number} */
	_baseRatio;

	/** @private @type {Image} */
	_coin;

	/**
	 * @param {Phaser.Scene} scene
	 * @param {Phaser.Math.Vector2} initPosition
	 * @param {number} ratio
	 */
	constructor (scene, initPosition, ratio) {
		this._scene = scene;
		this._screenUtil = ScreenUtility.getInstance();
		this._baseRatio = ratio;
		this.create(initPosition, ratio);
	}

	/**
	 * @private
	 * @param {Phaser.Math.Vector2} initPosition
	 * @param {number} ratio
	 */
	create (initPosition, ratio) {
		this._coin = new Image(this._scene, initPosition.x, initPosition.y, Assets.price.key);
		this._coin.gameObject.setAlpha(0).setVisible(false);
		this._coin.transform.setToScaleDisplaySize(ratio * 0.5);
	}

	/**
	 * @param {Function} onComplete
	 * @param {Function} [sfxEvent]
	 */
	playTweens (onComplete, sfxEvent) {
		const { centerY } = this._screenUtil;
		this._scene.tweens.add({
			onStart: () => {
				(sfxEvent) && sfxEvent();
				this._coin.gameObject.setVisible(true);
			},
			targets: this._coin.gameObject,
			props: {
				alpha: { getStart: () => 0.3, getEnd: () => 1 },
			},
			duration: 100,
			onComplete: () => this._coin.gameObject.setDepth(LayerDepth.hatch.COIN)
		});
		this._scene.tweens.add({
			targets: this._coin.gameObject,
			y: (centerY * 0.55),
			duration: 500,
			ease: Phaser.Math.Easing.Sine.Out,
			onComplete: () => {
				(onComplete) && onComplete();
			}
		});
		this._scene.tweens.add({
			targets: this._coin.gameObject,
			props: {
				scale: {
					getStart: () => (this._baseRatio * 0.5),
					getEnd: () => (this._baseRatio * 1.1)
				}
			},
			duration: 1000,
			ease: (/** @type {number} */x) => {
				const c1 = 5; // Overshoot
				const c3 = c1 + 1;

				return 1 + c3 * ((x - 1) ** 3) + c1 * ((x - 1) ** 2);
			}
		});
	}

}