import { Assets } from "../../../assetLibrary/assetHatch";
import { Image } from "../../../modules/gameobjects/image";
import { ScreenUtility } from "../../../helper/screenUtility";
import { layerDepth } from "../info/layer_depth";

export class CoinView {

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
	 * @param {ScreenUtility} screenUtil
	 * @param {Phaser.Math.Vector2} initPosition
	 * @param {number} ratio
	 */
	constructor (scene, screenUtil, initPosition, ratio) {
		this._scene = scene;
		this._screenUtil = screenUtil;
		this._baseRatio = ratio;
		this.create(initPosition, ratio);
	}

	/**
	 * @private
	 * @param {Phaser.Math.Vector2} initPosition
	 * @param {number} ratio
	 */
	create (initPosition, ratio) {
		// const coinPosition = eggHatch.getDisplayPositionFromCoordinate(0.5, 0.5);
		this._coin = new Image(this._scene, initPosition.x, initPosition.y, Assets.price.key);
		this._coin.gameObject.setAlpha(0).setVisible(false);
		// const showScaleCoin = eggHatch.baseRatio * 0.5;
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
				// this.event.emit(this.evenNames.SHOW_ITEM_COIN, Audios.sfx_achievement.key);
			},
			targets: this._coin.gameObject,
			props: {
				alpha: { getStart: () => 0.3, getEnd: () => 1 },
			},
			duration: 100,
			onComplete: () => this._coin.gameObject.setDepth(layerDepth.COIN)
		});
		this._scene.tweens.add({
			targets: this._coin.gameObject,
			y: (centerY * 0.55),
			duration: 500,
			ease: Phaser.Math.Easing.Sine.Out,
			onComplete: () => {
				(onComplete) && onComplete();
			}
			// onComplete: () => popupPanel.showTween(() => {
			// 	this.event.emit(this.evenNames.CALL_BUTTONS);
			// })
		});
		this._scene.tweens.add({
			targets: this._coin.gameObject,
			props: {
				scale: {
					getStart: () => (this._baseRatio * 0.5),
					getEnd: () => (this._baseRatio * 1.1)
				}
			},
			duration: 1200,
			ease: Phaser.Math.Easing.Back.Out,
		});
	}

}