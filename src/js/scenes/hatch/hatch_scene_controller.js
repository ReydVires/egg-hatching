import { AudioController } from "../../modules/audio/audio_controller";
import { Audios } from "../../assetLibrary/assetAudio";
import { HatchSceneView } from "./hatch_scene_view";
import { SceneKeyInfo } from "../../const/gameInfo";
import { ScreenUtility } from "../../helper/screenUtility";

export class HatchSceneController extends Phaser.Scene {

	/** @type {HatchSceneView} */
	view;
	/** @type {AudioController} */
	audioController;

	constructor () {
		super({ key: SceneKeyInfo.HATCH });
	}

	init () {
		this.view = new HatchSceneView(this);
		ScreenUtility.getInstance().init(this);
		AudioController.getInstance().init(this);
		this.audioController = AudioController.getInstance();

		this.onGoToGameplay(() => {
			this.scene.start(SceneKeyInfo.GAMEPLAY);
		});
		this.onTapHatchButton(() => { // TODO: Passing audio assets name from view (?)
			this.audioController.playSFX(Audios.sfx_click.key, { volume: 1.15 });
		});
		this.onCallPopupPanel(() => {
			this.audioController.playSFX(Audios.sfx_popup.key);
		});
		this.onShowItemCoint(() => {
			this.audioController.playSFX(Audios.sfx_achievement.key);
		});
		this.onPlaySfxBeep(() => {
			this.audioController.playSFX(Audios.sfx_beep.key);
		});
	}

	create () {
		this.view.create();
	}

	/**
	 * @param {number} time
	 * @param {number} dt
	 */
	update (time, dt) {}

	/**
	 * @param {Function} events
	 */
	onGoToGameplay (events) {
		this.view.event.on(this.view.evenNames.GOTO_GAMEPLAY, events);
	}

	/**
	 * @param {Function} events
	 */
	onPlaySfxBeep (events) {
		this.view.event.on(this.view.evenNames.PLAY_SFX_BEEP, events);
	}

	/**
	 * @param {Function} events
	 */
	onTapHatchButton (events) {
		this.view.event.on(this.view.evenNames.TAP_HATCH_BUTTON, events);
	}

	/**
	 * @param {Function} events
	 */
	onCallPopupPanel (events) {
		this.view.event.on(this.view.evenNames.CALL_POPUP_PANEL, events);
	}

	/**
	 * @param {Function} events
	 */
	onShowItemCoint (events) {
		this.view.event.on(this.view.evenNames.SHOW_ITEM_COIN, events);
	}

}