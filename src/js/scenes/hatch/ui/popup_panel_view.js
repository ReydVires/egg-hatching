import { Assets } from "../../../assetLibrary/assetHatch";
import { FontAsset } from "../../../assetLibrary/assetFont";
import { Image } from "../../../modules/gameobjects/image";
import { LayerDepth } from "../../../const/layerDepth";
import { ScreenUtility } from "../../../helper/screenUtility";
import { Text } from "../../../modules/gameobjects/text";

export class PopupPanelView {

	/** @private @type {Phaser.Scene} */
	_scene;
	/** @private @type {ScreenUtility} */
	_screenUtil;

	/** @private @type {Image} */
	_popupPanel;
	/** @private @type {Phaser.GameObjects.Container} */
	_panelContainer;

	/**
	 * @param {Phaser.Scene} scene
	 * @param {number} ratio
	 */
	constructor (scene, ratio) {
		this._scene = scene;
		this._screenUtil = ScreenUtility.getInstance();
		this.create(ratio);
	}

	get baseRatio () {
		return this._popupPanel.transform.displayToOriginalHeightRatio;
	}

	/**
	 * @private
	 * @param {number} ratio
	 */
	create (ratio) {
		const { centerX, centerY } = this._screenUtil;
		this._popupPanel = new Image(this._scene, 0, 0, Assets.popup_panel.key);
		this._popupPanel.transform.setToScaleDisplaySize(ratio * 0.75);

		const popupLabelPos = this._popupPanel.transform.getDisplayPositionFromCoordinate(0.5, 0.65);
		const popupLabel = new Text(this._scene, popupLabelPos.x, popupLabelPos.y, "Yay! Here's your reward:", {
			fontSize: `${46 * this._popupPanel.transform.displayToOriginalHeightRatio}px`,
			fontFamily: FontAsset.cabin.key,
			color: "#529ab3",
			fontStyle: "bold"
		});
		popupLabel.gameObject.setOrigin(0.5);

		const descPosition = this._popupPanel.transform.getDisplayPositionFromCoordinate(0.5, 0.86);
		const description = new Text(this._scene, descPosition.x, descPosition.y, "100 TokoPoints", {
			fontSize: `${68 * this._popupPanel.transform.displayToOriginalHeightRatio}px`,
			fontFamily: FontAsset.cabin.key,
			color: "#529ab3",
			fontStyle: "bold",
		});
		description.gameObject.setOrigin(0.5);

		this._panelContainer = this._scene.add.container(centerX, (centerY * 0.8), [
			this._popupPanel.gameObject,
			popupLabel.gameObject,
			description.gameObject,
		]).setDepth(LayerDepth.hatch.PANEL_POPUP).setScale(0).setVisible(false);
	}

	/**
	 * @param {Function} onComplete
	 */
	showTween (onComplete) {
		this._scene.tweens.add({
			targets: [this._panelContainer],
			onStart: () => {
				this._panelContainer.setVisible(true);
			},
			props: {
				scale: { getStart: () => 0.25, getEnd: () => 1 }
			},
			duration: 500,
			ease: Phaser.Math.Easing.Back.Out,
			// onComplete: () => this.event.emit(this.evenNames.CALL_BUTTONS)
			onComplete: () => onComplete()
		});
	}

}