import { Audios } from "../../assetLibrary/assetAudio";
import { BackgroundView } from "./background/background_view";
import { CoinUIView } from "./ui/coin_view";
import { DialogUIView } from "./ui/dialog_view";
import { DimOverlayUIView } from "./ui/dim_overlay_view";
import { EggHatchView } from "./ui/egg_hatch_view";
import { HatchButtonView } from "./ui/hatch_button_view";
import { OverlayFlashUIView } from "./ui/overlay_flash_view";
import { PopupPanelView } from "./ui/popup_panel_view";
import { ShineGlowView } from "./effect/shine_glow_view";
import { TokoPointButtonView } from "./ui/tokopoint_button_view";

export class HatchSceneView {

	/** @private @type {Phaser.Scene} */
	_scene;

	/** @type {Phaser.Events.EventEmitter} */
	event;
	/** @readonly */
	evenNames = {
		GOTO_GAMEPLAY: "GOTO_GAMEPLAY",
		PLAY_SFX: "PLAY_SFX",
	};

	/**
	 * @param {Phaser.Scene} scene
	 */
	constructor (scene) {
		this._scene = scene;
		this.event = new Phaser.Events.EventEmitter();
	}

	create () {
		const background = new BackgroundView(this._scene);
		const overlayView = new OverlayFlashUIView(this._scene);
		const eggHatch = new EggHatchView(this._scene, background.getDisplayPositionFromCoordinate(0.5, 0.31), background.hatchNestRatio);
		const dialogUIView = new DialogUIView(this._scene, background.baseRatio);
		const shineGlowView = new ShineGlowView(this._scene, eggHatch.getDisplayPositionFromCoordinate(0, 0.5), eggHatch.baseRatio);
		const coinUIView = new CoinUIView(this._scene, eggHatch.getDisplayPositionFromCoordinate(0.5, 0.5), eggHatch.baseRatio);
		const popupPanelView = new PopupPanelView(this._scene, background.baseRatio);
		const hatchBtn = new HatchButtonView(this._scene, popupPanelView.baseRatio);
		const tokoPointBtn = new TokoPointButtonView(this._scene, hatchBtn.getDisplayPositionFromCoordinate(0.5, 1), popupPanelView.baseRatio);
		const dimOverlayUIView = new DimOverlayUIView(this._scene);

		overlayView.dimTweenEffect();
		eggHatch.playAnimCrack();
		dialogUIView.playTween();
		shineGlowView.playTween();

		eggHatch.onAnimationUpdateEggHatch(() => {
			dimOverlayUIView.alphaTween();
			coinUIView.playTweens(() => {
				const onCompletePopupTween = () => {
					hatchBtn.showButtonTween(() => this.event.emit(this.evenNames.PLAY_SFX, Audios.sfx_popup.key));
					tokoPointBtn.scaleTween(() => this.event.emit(this.evenNames.PLAY_SFX, Audios.sfx_beep.key));
				};
				popupPanelView.showTween(onCompletePopupTween)
			}, () => {
				this.event.emit(this.evenNames.PLAY_SFX, Audios.sfx_achievement.key);
			});
		});

		hatchBtn.onClick(() => {
			tokoPointBtn.hideButtonTween(() => this.event.emit(this.evenNames.GOTO_GAMEPLAY));
		}, () => {
			this.event.emit(this.evenNames.PLAY_SFX, Audios.sfx_click.key, { volume: 1.15 });
		});
	}

}