import { Assets } from "../../../assetLibrary/assetHatch";
import { FontAsset } from "../../../assetLibrary/assetFont";
import { Image } from "../../../modules/gameobjects/image";
import { LayerDepth } from "../../../const/layerDepth";
import { ScreenUtility } from "../../../helper/screenUtility";
import { Text } from "../../../modules/gameobjects/text";

export class DialogUIView {

	/** @private @type {Phaser.Scene} */
	_scene;
	/** @private @type {ScreenUtility} */
	_screenUtil;
	
	/** @private @type {Phaser.Tweens.Tween} */
	_floatDialogTween;
	/** @private @type {Phaser.GameObjects.Container} */
	_dialogContainer;

	/**
	 * @param {Phaser.Scene} scene
	 * @param {number} ratio
	 */
	constructor (scene, ratio) {
		this._scene = scene
		this._screenUtil = ScreenUtility.getInstance();
		this.create(ratio);
	}

	/**
	 * @private
	 * @param {number} ratio
	 */
	create (ratio) {
		const { centerX, centerY } = this._screenUtil;
		const dialogFrame = new Image(this._scene, 0, 0, Assets.dialog.key);
		dialogFrame.transform.setToScaleDisplaySize(ratio * 0.65);

		const dialogLabelPos = dialogFrame.transform.getDisplayPositionFromCoordinate(0.5, 0.4);
		const dialogLabel = new Text(this._scene, 0, dialogLabelPos.y, "WOW! The egg is hatching...", {
			fontFamily: FontAsset.cabin.key,
			align: "center",
			color: "black",
			fontSize: `${32 * dialogFrame.transform.displayToOriginalHeightRatio}px`,
		});
		dialogLabel.gameObject.setOrigin(0.5);

		this._dialogContainer = this._scene.add.container(centerX, centerY * 0.5, [
			dialogFrame.gameObject,
			dialogLabel.gameObject
		]).setDepth(LayerDepth.hatch.DIALOG);

		const prevPosYDialog = this._dialogContainer.y;
		this._floatDialogTween = this._scene.tweens.create({
			targets: this._dialogContainer,
			props: {
				y: { getStart: () => prevPosYDialog, getEnd: () => prevPosYDialog * 1.02 },
			},
			yoyo: true,
			loop: -1,
			duration: 600,
		});
	}

	playTween () {
		this._floatDialogTween.play();
		this._scene.tweens.add({
			targets: this._dialogContainer,
			delay: 1800,
			duration: 300,
			props: {
				alpha: { getStart: () => 1, getEnd: () => 0 }
			},
			ease: Phaser.Math.Easing.Linear,
		});
	}

}