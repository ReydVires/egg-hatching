import { Assets } from "../../../assetLibrary/assetGameplay";
import { FontAsset } from "../../../assetLibrary/assetFont";
import { Image } from "../../../modules/gameobjects/image";
import { LayerDepth } from "../../../const/layerDepth";
import { ScreenUtility } from "../../../helper/screenUtility";
import { Text } from "../../../modules/gameobjects/text";

export class PlayButtonUIView {

	/** @private @type {Phaser.Scene} */
	_scene;
	/** @private @type {ScreenUtility} */
	_screenUtil;

	/** @private @type {Image} */
	_playBtn;
	/** @private @type {Phaser.Tweens.Tween} */
	_playBtnTween;
	/** @private @type {Phaser.Tweens.Tween} */
	_tapEffectTween;
	/** @private @type {Phaser.GameObjects.Graphics} */
	_glowDimGrapics;
	/** @private @type {Phaser.Tweens.Tween} */
	_idleGlowDimTween;

	/**
	 * @param {Phaser.Scene} scene
	 * @param {number} ratio
	 */
	constructor (scene, ratio) {
		this._scene = scene;
		this._screenUtil = ScreenUtility.getInstance();
		this.create(ratio);
	}

	/**
	 * @private
	 * @param {number} ratio
	 */
	create (ratio) {
		const { centerX, height: screenHeight } = this._screenUtil;
		const payPoint = 100;
		this._playBtn = new Image(this._scene, centerX, screenHeight * 0.9, Assets.btn.key);
		this._playBtn.transform.setToScaleDisplaySize(ratio * 0.5);
		this._playBtn.gameObject.setDepth(LayerDepth.gameplay.BUTTON);

		const playBtnLabelPosition = this._playBtn.transform.getDisplayPositionFromCoordinate(0.5, 0.5);
		const playBtnLabel = new Text(this._scene, playBtnLabelPosition.x, playBtnLabelPosition.y, String(payPoint), {
			align: "center",
			fontFamily: FontAsset.cabin.key,
			fontStyle: "bold",
			fontSize: `${72 * this._playBtn.transform.displayToOriginalHeightRatio}px`,
		});
		playBtnLabel.gameObject.setOrigin(0.5).setDepth(LayerDepth.gameplay.BUTTON);

		const playBtnOriginScale = this._playBtn.gameObject.scale;
		this._playBtnTween = this._scene.tweens.create({
			targets: [this._playBtn.gameObject],
			loop: -1,
			props: {
				scale: {
					getStart: () => playBtnOriginScale,
					getEnd: () => playBtnOriginScale * 1.02
				}
			},
			yoyo: true,
			ease: Phaser.Math.Easing.Cubic.InOut,
			duration: 300,
		});
		this._playBtnTween.play();

		const targetToEffect = this._playBtn.gameObject;
		this._glowDimGrapics = this._scene.add.graphics().setDepth(LayerDepth.gameplay.BUTTON);
		this._glowDimGrapics.clear();
		this._glowDimGrapics.fillStyle(0xfafafa, 1);
		this._glowDimGrapics.fillRoundedRect(
			targetToEffect.x - (targetToEffect.displayWidth / 2),
			targetToEffect.y - (targetToEffect.displayHeight / 2),
			targetToEffect.displayWidth,
			targetToEffect.displayHeight,
			30 * ratio
		);

		this._idleGlowDimTween = this._scene.tweens.create({
			targets: [this._glowDimGrapics],
			props: {
				alpha: { getStart: () => 0, getEnd: () => 0.25 }
			},
			yoyo: true,
			loop: -1,
			duration: 600,
			ease: Phaser.Math.Easing.Cubic.InOut,
		});
		this._idleGlowDimTween.play();

		this._tapEffectTween = this._scene.tweens.create({
			targets: [this._playBtn.gameObject],
			props: {
				scale: {
					getStart: () => playBtnOriginScale,
					getEnd: () => playBtnOriginScale * 0.95
				}
			},
			yoyo: true,
			duration: 120,
			onComplete: () => {
				this._scene.tweens.addCounter({
					from: payPoint,
					to: 0,
					duration: 300,
					onUpdate: (tween) => {
						const value = Math.floor(tween.getValue());
						playBtnLabel.gameObject.setText(String(value));
					},
					onComplete: () => {
						this._playBtn.gameObject.setTexture(Assets.btn_gray.key);
					},
				});
			},
		});
	}

	/**
	 * @param {Function} events
	 */
	onClick (events) {
		this._playBtn.gameObject.setInteractive({ useHandCursor: true }).on(Phaser.Input.Events.POINTER_UP, () => {
			(events) && events();
			this._tapEffectTween.play();
			this._glowDimGrapics.clear();
			this._idleGlowDimTween.stop();
			this._playBtnTween.stop();
		});
	}

	/**
	 * @param {number} x
	 * @param {number} [y]
	 */
	getDisplayPositionFromCoordinate (x, y = x) {
		return this._playBtn.transform.getDisplayPositionFromCoordinate(x, y);
	}

}