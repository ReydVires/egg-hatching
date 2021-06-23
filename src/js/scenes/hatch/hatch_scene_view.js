import { Audios } from "../../assetLibrary/assetAudio";
import { BackgroundView } from "./background/background_view";
import { CoinView } from "./ui/coin_view";
import { DialogUIView } from "./ui/dialog_view";
import { DimOverlayView } from "./ui/dim_overlay_view";
import { EggHatchView } from "./ui/egg_hatch_view";
import { HatchButtonView } from "./ui/hatch_button_view";
import { OverlayFlashUIView } from "./ui/overlay_flash_view";
import { PopupPanelView } from "./ui/popup_panel_view";
import { ScreenUtility } from "../../helper/screenUtility";
import { ShineGlowView } from "./effect/shine_glow_view";
import { TokoPointButtonView } from "./ui/tokopoint_button_view";

export class HatchSceneView {

	/** @private @type {Phaser.Scene} */
	_scene;
	/** @private @type {ScreenUtility} */
	_screenUtil;

	/** @type {Phaser.Events.EventEmitter} */
	event;
	/** @readonly */
	evenNames = {
		GOTO_GAMEPLAY: "GOTO_GAMEPLAY",
		TAP_HATCH_BUTTON: "TAP_HATCH_BUTTON",
		CALL_POPUP_PANEL: "CALL_POPUP_PANEL",
		SHOW_ITEM_COIN: "SHOW_ITEM_COIN",
		PLAY_SFX_BEEP: "PLAY_SFX_BEEP",
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
		const background = new BackgroundView(this._scene, this._screenUtil);
		const overlayView = new OverlayFlashUIView(this._scene, this._screenUtil);
		const eggHatch = new EggHatchView(this._scene, background.getDisplayPositionFromCoordinate(0.5, 0.31), background.hatchNestRatio);
		const dialogView = new DialogUIView(this._scene, this._screenUtil, background.baseRatio);
		const shineGlowView = new ShineGlowView(this._scene, this._screenUtil, eggHatch.getDisplayPositionFromCoordinate(0, 0.5), eggHatch.baseRatio);
		const coinView = new CoinView(this._scene, this._screenUtil, eggHatch.getDisplayPositionFromCoordinate(0.5, 0.5), eggHatch.baseRatio);
		const popupPanelView = new PopupPanelView(this._scene, this._screenUtil, background.baseRatio);
		const hatchBtn = new HatchButtonView(this._scene, this._screenUtil, popupPanelView.baseRatio);
		const tokoPointBtn = new TokoPointButtonView(this._scene, hatchBtn.getDisplayPositionFromCoordinate(0.5, 1), popupPanelView.baseRatio);
		const dimOverlayView = new DimOverlayView(this._scene, this._screenUtil);

		overlayView.dimTweenEffect();
		eggHatch.playAnimCrack();
		dialogView.floatTween();
		dialogView.alphaTween();
		shineGlowView.playTween();

		eggHatch.onAnimationUpdateEggHatch(() => {
			dimOverlayView.alphaTween();
			coinView.playTweens(() => {
				popupPanelView.showTween(() => {
					hatchBtn.showButtonTween(() => {
						this.event.emit(this.evenNames.CALL_POPUP_PANEL, Audios.sfx_popup.key);
					});
					tokoPointBtn.scaleTween(() => {
						this.event.emit(this.evenNames.PLAY_SFX_BEEP, Audios.sfx_beep.key)
					});
				})
			}, () => {
				this.event.emit(this.evenNames.SHOW_ITEM_COIN, Audios.sfx_achievement.key);
			});
		});

		hatchBtn.onClick(() => {
			tokoPointBtn.hideButtonTween(() => this.event.emit(this.evenNames.GOTO_GAMEPLAY));
		}, () => {
			this.event.emit(this.evenNames.TAP_HATCH_BUTTON, Audios.sfx_click.key);
		});
	}

}