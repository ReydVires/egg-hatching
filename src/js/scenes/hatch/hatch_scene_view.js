import { Animations } from "../../assetLibrary/animations";
import { Assets as AssetGameplay } from "../../assetLibrary/assetGameplay";
import { Assets } from "../../assetLibrary/assetHatch";
import { FontAsset } from "../../assetLibrary/assetFont";
import { Image } from "../../modules/gameobjects/image";
import { ScreenUtility } from "../../helper/screenUtility";
import { Sprite } from "../../modules/gameobjects/sprite";
import { Text } from "../../modules/gameobjects/text";
import { addAnimation } from "../../helper/animationHelper";

export class HatchSceneView {

	/** @private @type {Phaser.Scene} */
	_scene;
	/** @private @type {ScreenUtility} */
	_screenUtil;

	/** @type {Phaser.Events.EventEmitter} */
	event;
	/** @readonly */
	evenNames = {
		CALL_BUTTONS: "CALL_BUTTONS",
		GOTO_GAMEPLAY: "GOTO_GAMEPLAY",
	};

	/**
	 * @param {Phaser.Scene} scene
	 */
	constructor (scene) {
		this._scene = scene;
		this._screenUtil = ScreenUtility.getInstance();
		this.event = new Phaser.Events.EventEmitter();
	}

	create () {
		const { centerX, centerY, width: screenWidth, height: screenHeight } = this._screenUtil;
		const background = new Image(this._scene, centerX, centerY, Assets.hatch_background.key);
		background.transform.setDisplayWidthAsScreenWidth(true);

		const baseRatio = background.transform.displayToOriginalHeightRatio;

		const flashObject = this._scene.add.graphics().setDepth(1);
		flashObject.fillStyle(0xfafafa, 1);
		flashObject.fillRect(0, 0, screenWidth, screenHeight);

		const flashDimTween = this._scene.tweens.create({
			targets: [flashObject],
			duration: 300,
			props: {
				alpha: { getStart: () => 1, getEnd: () => 0 }
			},
		});
		flashDimTween.play();

		const hatchNest = new Image(this._scene, centerX, screenHeight * 0.9, AssetGameplay.nest.key);
		hatchNest.transform.setToScaleDisplaySize(baseRatio * 6);

		const eggHatchPosition = hatchNest.transform.getDisplayPositionFromCoordinate(0.5, 0.31);
		const eggHatch = new Sprite(this._scene, eggHatchPosition.x, eggHatchPosition.y, Assets.egg_crack.key, 0);
		eggHatch.transform.setToScaleDisplaySize(hatchNest.transform.displayToOriginalHeightRatio * 0.325);
		eggHatch.gameObject.setOrigin(0.5, 1).setDepth(1);

		addAnimation(this._scene, Animations.egg_crack);
		addAnimation(this._scene, Animations.egg_hatch);

		this._scene.time.delayedCall(500, () =>  eggHatch.gameObject.play(Animations.egg_crack.key));
		eggHatch.gameObject.on("animationcomplete-" + Animations.egg_crack.key, () => {
			eggHatch.gameObject.play(Animations.egg_hatch.key);
		});

		const dialogFrame = new Image(this._scene, 0, 0, Assets.dialog.key);
		dialogFrame.transform.setToScaleDisplaySize(baseRatio * 0.65);

		const dialogLabelPos = dialogFrame.transform.getDisplayPositionFromCoordinate(0.5, 0.4);
		const dialogLabel = new Text(this._scene, 0, dialogLabelPos.y, "WOW! The egg is hatching...", {
			fontFamily: FontAsset.cabin.key,
			align: "center",
			color: "black",
			fontSize: `${32 * dialogFrame.transform.displayToOriginalHeightRatio}px`,
		});
		dialogLabel.gameObject.setOrigin(0.5);

		const dialogContainer = this._scene.add.container(centerX, centerY * 0.5, [
			dialogFrame.gameObject,
			dialogLabel.gameObject
		]).setDepth(2);

		const prevPosYDialog = dialogContainer.y;
		const floatDialogTween = this._scene.tweens.create({
			targets: dialogContainer,
			props: {
				y: { getStart: () => prevPosYDialog, getEnd: () => prevPosYDialog * 1.02 },
			},
			yoyo: true,
			loop: -1,
			duration: 600,
		});
		floatDialogTween.play();

		const shineEffectPos = eggHatch.transform.getDisplayPositionFromCoordinate(0.5, 0.5);
		const shineEffect = new Image(this._scene, centerX, shineEffectPos.y, Assets.shine.key);
		shineEffect.transform.setToScaleDisplaySize(eggHatch.transform.displayToOriginalHeightRatio * 0.375);

		const shineAlphaTween = this._scene.tweens.create({
			targets: [
				shineEffect.gameObject,
				dialogContainer,
			],
			delay: 1800,
			duration: 300,
			props: {
				alpha: { getStart: () => 1, getEnd: () => 0 }
			},
			ease: Phaser.Math.Easing.Linear,
		});
		const shineRotateTween = this._scene.tweens.create({
			targets: shineEffect.gameObject,
			duration: 2100,
			props: {
				angle: { getStart: () => 0, getEnd: () => 15 }
			},
			ease: Phaser.Math.Easing.Linear,
		});
		shineAlphaTween.play();
		shineRotateTween.play();

		const dimOverlay = this._scene.add.rectangle(centerX, centerY, screenWidth, screenHeight, 0x636e72, 1);
		dimOverlay.setAlpha(0).setVisible(false).setDepth(1);

		const coinPosition = eggHatch.transform.getDisplayPositionFromCoordinate(0.5, 0.5);
		const coin = new Image(this._scene, coinPosition.x, coinPosition.y, Assets.price.key);
		coin.gameObject.setAlpha(0).setVisible(false);
		const showScaleCoin = eggHatch.transform.displayToOriginalHeightRatio * 0.5;
		coin.transform.setToScaleDisplaySize(showScaleCoin);

		// POPUP
		const popupPanel = new Image(this._scene, 0, 0, Assets.popup_panel.key);
		popupPanel.transform.setToScaleDisplaySize(baseRatio * 0.75);
		popupPanel.gameObject.setDepth(1.5);

		const popupLabelPos = popupPanel.transform.getDisplayPositionFromCoordinate(0.5, 0.65);
		const popupLabel = new Text(this._scene, popupLabelPos.x, popupLabelPos.y, "Yay! Here's your reward:", {
			fontSize: `${46 * popupPanel.transform.displayToOriginalHeightRatio}px`,
			fontFamily: FontAsset.cabin.key,
			color: "#529ab3",
			fontStyle: "bold"
		});
		popupLabel.gameObject.setOrigin(0.5).setDepth(1.5);

		const descPosition = popupPanel.transform.getDisplayPositionFromCoordinate(0.5, 0.86);
		const description = new Text(this._scene, descPosition.x, descPosition.y, "100 TokoPoints", {
			fontSize: `${68 * popupPanel.transform.displayToOriginalHeightRatio}px`,
			fontFamily: FontAsset.cabin.key,
			color: "#529ab3",
			fontStyle: "bold",
		});
		description.gameObject.setOrigin(0.5).setDepth(1.5);

		const panelContainer = this._scene.add.container(centerX, (centerY * 0.9), [
			popupPanel.gameObject,
			popupLabel.gameObject,
			description.gameObject,
		]).setDepth(1.5).setScale(0).setVisible(false);

		const showPopupTween = this._scene.tweens.create({
			targets: [panelContainer],
			onStart: () => panelContainer.setVisible(true),
			props: {
				scale: { getStart: () => 0.25, getEnd: () => 1 }
			},
			duration: 500,
			ease: Phaser.Math.Easing.Back.Out,
			onComplete: () => this.event.emit(this.evenNames.CALL_BUTTONS)
		});

		/**
		 * @param {Phaser.Animations.Animation} anim 
		 * @param {Phaser.Animations.AnimationFrame} frame 
		 */
		const onAnimationUpdateEggHatch = (anim, frame) => {
			if (anim.key !== Animations.egg_hatch.key) return;
			if (frame.textureFrame !== 16) return;

			this._scene.tweens.add({
				onStart: () => dimOverlay.setVisible(true),
				targets: [dimOverlay],
				props: {
					alpha: { getStart: () => 0, getEnd: () => 0.65 },
				},
				duration: 300,
			});

			// Coin sequence!
			this._scene.tweens.add({
				onStart: () => coin.gameObject.setVisible(true),
				targets: [coin.gameObject],
				props: {
					alpha: { getStart: () => 0.3, getEnd: () => 1 },
				},
				duration: 100,
				onComplete: () => coin.gameObject.setDepth(2)
			});
			this._scene.tweens.add({
				targets: [coin.gameObject],
				y: (centerY * 0.75),
				duration: 500,
				ease: Phaser.Math.Easing.Sine.Out,
				onComplete: () => showPopupTween.play()
			});
			this._scene.tweens.add({
				targets: [coin.gameObject],
				props: {
					scale: {
						getStart: () => showScaleCoin,
						getEnd: () => (eggHatch.transform.displayToOriginalHeightRatio * 1.1)
					}
				},
				duration: 1200,
				ease: Phaser.Math.Easing.Back.Out,
			});
		};
		eggHatch.gameObject.on("animationupdate", onAnimationUpdateEggHatch);

		const hatchBtn = new Image(this._scene, centerX, centerY * 1.55, Assets.hatch_btn.key);
		hatchBtn.transform.setToScaleDisplaySize(popupPanel.transform.displayToOriginalHeightRatio);
		hatchBtn.gameObject.setDepth(1.5).setVisible(false);

		hatchBtn.gameObject.setInteractive({ useHandCursor: true }).once("pointerup", () => {
			this._scene.tweens.add({
				targets: hatchBtn.gameObject,
				scale: hatchBtn.gameObject.scale * 0.96,
				duration: 120,
				yoyo: true,
				onComplete: () => {
					this.event.emit(this.evenNames.GOTO_GAMEPLAY);
				}
			})
		});

		const hatchBtnTween = this._scene.tweens.create({
			onStart: () => hatchBtn.gameObject.setVisible(true),
			targets: hatchBtn.gameObject,
			duration: 500,
			props: {
				scale: { getStart: () => 0.1, getEnd: () => popupPanel.transform.displayToOriginalHeightRatio }
			},
			ease: Phaser.Math.Easing.Back.Out,
		});

		const tokoPointBtnPos = hatchBtn.transform.getDisplayPositionFromCoordinate(0.5, 1);
		const tokoPointBtn = new Image(this._scene, tokoPointBtnPos.x, tokoPointBtnPos.y * 1.08, Assets.tokopoints_btn.key);
		tokoPointBtn.transform.setToScaleDisplaySize(popupPanel.transform.displayToOriginalHeightRatio);
		tokoPointBtn.gameObject.setDepth(1.5).setVisible(false);

		const tokoPointBtnTween = this._scene.tweens.create({
			onStart: () => tokoPointBtn.gameObject.setVisible(true),
			targets: tokoPointBtn.gameObject,
			delay: 300,
			duration: 500,
			props: {
				scale: { getStart: () => 0.1, getEnd: () => popupPanel.transform.displayToOriginalHeightRatio }
			},
			ease: Phaser.Math.Easing.Back.Out,
		});

		this.event.once(this.evenNames.CALL_BUTTONS, () => {
			hatchBtn.gameObject.setScale(0);
			tokoPointBtn.gameObject.setScale(0);
			hatchBtnTween.play();
			tokoPointBtnTween.play();
		});
	}

}