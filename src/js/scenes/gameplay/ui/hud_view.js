import { Assets } from "../../../assetLibrary/assetGameplay";
import { Image } from "../../../modules/gameobjects/image";
import { ScreenUtility } from "../../../helper/screenUtility";

export class HUDUIView {

	/** @private @type {Phaser.Scene} */
	_scene;
	/** @private @type {ScreenUtility} */
	_screenUtil;

	/** @private @type {Image} */
	_eggProgressBar;
	/** @private @type {Phaser.GameObjects.Graphics} */
	_progressBar;

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
		const { centerX } = this._screenUtil;
		const hud = new Image(this._scene, centerX, 0, Assets.hud.key);
		hud.transform.setDisplayWidthAsScreenWidth(true);
		hud.gameObject.setOrigin(0.5, 0);

		const eggProgressBarPos = hud.transform.getDisplayPositionFromCoordinate(0.173, 0.61);
		this._eggProgressBar = new Image(this._scene, eggProgressBarPos.x, eggProgressBarPos.y, Assets.progress_bar.key);
		this._eggProgressBar.transform.setToScaleDisplaySize(hud.transform.displayToOriginalHeightRatio);
		this._eggProgressBar.gameObject.setOrigin(0, 0.5);

		this._progressBar = this._scene.add.graphics().setVisible(false);
		this._eggProgressBar.gameObject.setMask(this._progressBar.createGeometryMask());
	}

	/**
	 * @param {Function} onComplete
	 */
	fillProgressBar (onComplete) {
		this._scene.tweens.addCounter({
			from: 0,
			to: 1,
			duration: 600,
			ease: Phaser.Math.Easing.Cubic.InOut,
			onUpdate: (tween) => {
				const value = tween.getValue();
				this._progressBar.clear();
				this._progressBar.fillStyle(0xffffff, 1);
				this._progressBar.fillRect(
					this._eggProgressBar.gameObject.getTopLeft().x,
					this._eggProgressBar.gameObject.getTopLeft().y,
					value * this._eggProgressBar.gameObject.displayWidth,
					this._eggProgressBar.gameObject.displayHeight
				);
			},
			onComplete: () => (onComplete) && onComplete()
		});
	}

}