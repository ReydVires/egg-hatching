import { Animations } from "../../assetLibrary/animations";
import { Assets } from "../../assetLibrary/assetGameplay";
import { _CONFIG as CONFIG } from "../../const/gameInfo";
import { FontAsset } from "../../assetLibrary/assetFont";
import { Image } from "../../modules/gameobjects/image";
import { ScreenUtility } from "../../helper/screenUtility";
import { Sprite } from "../../modules/gameobjects/sprite";
import { Text } from "../../modules/gameobjects/text";
import { addAnimation } from "../../helper/animationHelper";

export class GameplaySceneView {

	/** @private @type {Phaser.Scene} */
	_scene;
	/** @private @type {ScreenUtility} */
	_screenUtil;

	/** @type {Phaser.Events.EventEmitter} */
	event;
	/** @readonly */
	evenNames = {
		FILL_PROGRESS_BAR: "FILL_PROGRESS_BAR",
		SHOW_FLASHLIGHT: "SHOW_FLASHLIGHT",
		GOTO_HATCH: "GOTO_HATCH",
		LOCK_INPUT: "LOCK_INPUT",
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
		const {
			centerX,
			centerY,
			width: screenWidth,
			height: screenHeight
		} = this._screenUtil;

		const background = new Image(this._scene, centerX, centerY, Assets.background.key);
		background.transform.setDisplayWidthAsScreenWidth(true);

		const baseRatio = background.transform.displayToOriginalHeightRatio;

		//#region Environment
		const board = new Image(this._scene, centerX * 0.5, centerY * 0.7, Assets.board.key);
		board.transform.setToScaleDisplaySize(baseRatio * 0.7);

		const windowOnWall = new Image(this._scene, centerX * 1.5, centerY * 0.7, Assets.window.key);
		windowOnWall.transform.setToScaleDisplaySize(baseRatio * 0.8);

		const lamp = new Image(this._scene, centerX * 1.5, centerY * 1.05, Assets.lamp.key);
		lamp.transform.setToScaleDisplaySize(baseRatio * 1.4);

		const nestPosition = lamp.transform.getDisplayPositionFromCoordinate(0.5, 1.15);
		const hatchNest = new Image(this._scene, nestPosition.x, nestPosition.y, Assets.nest.key);
		hatchNest.transform.setToScaleDisplaySize(baseRatio * 1.35);

		const eggPosition = hatchNest.transform.getDisplayPositionFromCoordinate(0.5, 0.3);
		const egg = new Image(this._scene, eggPosition.x, eggPosition.y, Assets.blue_egg.key);
		egg.transform.setToScaleDisplaySize(baseRatio * 1.25);
		egg.gameObject.setOrigin(0.5, 1);

		const char = new Sprite(this._scene, centerX * 0.5, centerY * 1.15, Assets.char_idle.key, 0);
		char.transform.setToScaleDisplaySize(baseRatio * 1.5);

		const leafLeft = new Image(this._scene, 0, screenHeight, Assets.leaf.key);
		leafLeft.transform.setToScaleDisplaySize(baseRatio * 1.25);
		leafLeft.gameObject.setOrigin(0, 1);

		const leafRight = new Image(this._scene, screenWidth, screenHeight, Assets.leaf.key);
		leafRight.transform.setToScaleDisplaySize(baseRatio * 1.25);
		leafRight.gameObject.setOrigin(1, 1).setFlipX(true);
		//#endregion

		addAnimation(this._scene, Animations.char_idle);
		addAnimation(this._scene, Animations.char_excited);

		char.gameObject.on("animationcomplete-" + Animations.char_excited.key, () => {
			char.gameObject.play(Animations.char_excited.key);
			this.event.emit(this.evenNames.SHOW_FLASHLIGHT);
		});

		char.gameObject.play(Animations.char_idle.key);

		const payPoint = 100;
		
		const playBtn = new Image(this._scene, centerX, screenHeight * 0.9, Assets.btn.key);
		playBtn.transform.setToScaleDisplaySize(baseRatio * 0.5);

		const playBtnLabelPosition = playBtn.transform.getDisplayPositionFromCoordinate(0.5, 0.5);
		const playBtnLabel = new Text(this._scene, playBtnLabelPosition.x, playBtnLabelPosition.y, String(payPoint), {
			align: "center",
			fontFamily: FontAsset.cabin.key,
			fontStyle: "bold",
			fontSize: `${72 * playBtn.transform.displayToOriginalHeightRatio}px`,
		});
		playBtnLabel.gameObject.setOrigin(0.5);

		const electricityBigPos = playBtn.transform.getDisplayPositionFromCoordinate(0.7, 0);
		const electricityBig = new Sprite(this._scene, electricityBigPos.x, electricityBigPos.y, Assets.electricity.key, 0);
		electricityBig.gameObject.setOrigin(0.5, 1).setVisible(false);
		electricityBig.transform.setToScaleDisplaySize(hatchNest.transform.displayToOriginalHeightRatio * 0.45);

		addAnimation(this._scene, Animations.electricity);

		electricityBig.gameObject.on("animationcomplete-" + Animations.electricity.key, () => {
			electricityBig.gameObject.setVisible(false);
			this.event.emit(this.evenNames.FILL_PROGRESS_BAR);
		});

		const hud = new Image(this._scene, centerX, 0, Assets.hud.key);
		hud.transform.setDisplayWidthAsScreenWidth(true);
		hud.gameObject.setOrigin(0.5, 0);

		const eggProgressBarPos = hud.transform.getDisplayPositionFromCoordinate(0.173, 0.61);
		const eggProgressBar = new Image(this._scene, eggProgressBarPos.x, eggProgressBarPos.y, Assets.progress_bar.key);
		eggProgressBar.transform.setToScaleDisplaySize(hud.transform.displayToOriginalHeightRatio);
		eggProgressBar.gameObject.setOrigin(0, 0.5);

		const progressBar = this._scene.add.graphics().setVisible(false);
		eggProgressBar.gameObject.setMask(progressBar.createGeometryMask());

		this.event.on(this.evenNames.FILL_PROGRESS_BAR, () => {
			this._scene.tweens.addCounter({
				from: 0,
				to: 1,
				duration: 600,
				ease: Phaser.Math.Easing.Cubic.InOut,
				onUpdate: (tween) => {
					const value = tween.getValue();
					progressBar.clear();
					progressBar.fillStyle(0xffffff, 1);
					progressBar.fillRect(
						eggProgressBar.gameObject.getTopLeft().x,
						eggProgressBar.gameObject.getTopLeft().y,
						value * eggProgressBar.gameObject.displayWidth,
						eggProgressBar.gameObject.displayHeight
					);
				},
				onComplete: () => {
					char.gameObject.play(Animations.char_excited.key);
				}
			});
		});

		//#region Play button effect
		const playBtnOriginScale = playBtn.gameObject.scale;
		const playBtnTween = this._scene.tweens.create({
			targets: [playBtn.gameObject],
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
		playBtnTween.play();

		const targetToEffect = playBtn.gameObject;
		const glowDimGrapics = this._scene.add.graphics();
		glowDimGrapics.clear();
		glowDimGrapics.fillStyle(0xfafafa, 1);
		glowDimGrapics.fillRoundedRect(
			targetToEffect.x - (targetToEffect.displayWidth / 2),
			targetToEffect.y - (targetToEffect.displayHeight / 2),
			targetToEffect.displayWidth,
			targetToEffect.displayHeight,
			30 * baseRatio
		);

		const idleGlowDimTween = this._scene.tweens.create({
			targets: [glowDimGrapics],
			props: {
				alpha: { getStart: () => 0, getEnd: () => 0.25 }
			},
			yoyo: true,
			loop: -1,
			duration: 600,
			ease: Phaser.Math.Easing.Cubic.InOut,
		});
		idleGlowDimTween.play();

		const tapEffectTween = this._scene.tweens.create({
			targets: [playBtn.gameObject],
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
						playBtn.gameObject.setTexture(Assets.btn_gray.key);
					},
				});
			},
		});

		playBtn.gameObject.setInteractive({ useHandCursor: true }).on(Phaser.Input.Events.POINTER_DOWN, () => {
			// this.lockInput();
			this.event.emit(this.evenNames.LOCK_INPUT);
			tapEffectTween.play();

			electricityBig.gameObject.setVisible(true).play(Animations.electricity.key);
			glowDimGrapics.clear();
			idleGlowDimTween.stop();
			playBtnTween.stop();
		});
		//#endregion

		// Create Flashlight
		const flashObject = this._scene.add.graphics().setAlpha(0).setVisible(false);
		flashObject.fillStyle(0xfafafa, 1);
		flashObject.fillRect(0, 0, screenWidth, screenHeight);

		this.event.once(this.evenNames.SHOW_FLASHLIGHT, () => {
			flashObject.setVisible(true);
			this._scene.tweens.add({
				targets: flashObject,
				duration: 500,
				alpha: 1,
				onComplete: () => this.event.emit(this.evenNames.GOTO_HATCH),
			});
		});

		if (CONFIG.MODE === "PRODUCTION") return;
		const versionDebug = new Text(this._scene, 0, screenHeight, CONFIG.VERSION, {
			fontFamily: FontAsset.arial.key,
			fontSize: `${18 * baseRatio}px`
		});
		versionDebug.gameObject.setOrigin(0, 1);
	}

}