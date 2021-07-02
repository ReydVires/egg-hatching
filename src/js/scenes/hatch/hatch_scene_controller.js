import { AudioController } from "../../modules/audio/audio_controller";
import { HatchSceneView } from "./hatch_scene_view";
import { SceneKeyInfo } from "../../const/gameInfo";
import { ScreenUtility } from "../../helper/screenUtility";

/**
 * @typedef {(audioKey: string) => void} OnTapHatchButton
 * @typedef {(audioKey: string) => void} OnCallPopupPanel
 * @typedef {(audioKey: string) => void} OnShowItemCoint
 * @typedef {(audioKey: string) => void} OnPlaySfxBeep
 */

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
		this.audioController = AudioController.getInstance();

		this.onGoToGameplay(() => {
			this.scene.start(SceneKeyInfo.GAMEPLAY);
		});
		this.onTapHatchButton((audioKey) => {
			this.audioController.playSFX(audioKey, { volume: 1.15 });
		});
		this.onCallPopupPanel((audioKey) => {
			this.audioController.playSFX(audioKey);
		});
		this.onShowItemCoint((audioKey) => {
			this.audioController.playSFX(audioKey);
		});
		this.onPlaySfxBeep((audioKey) => {
			this.audioController.playSFX(audioKey);
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
	 * @param {OnPlaySfxBeep} events
	 */
	onPlaySfxBeep (events) {
		this.view.event.on(this.view.evenNames.PLAY_SFX_BEEP, events);
	}

	/**
	 * @param {OnTapHatchButton} events
	 */
	onTapHatchButton (events) {
		this.view.event.on(this.view.evenNames.TAP_HATCH_BUTTON, events);
	}

	/**
	 * @param {OnCallPopupPanel} events
	 */
	onCallPopupPanel (events) {
		this.view.event.on(this.view.evenNames.CALL_POPUP_PANEL, events);
	}

	/**
	 * @param {OnShowItemCoint} events
	 */
	onShowItemCoint (events) {
		this.view.event.on(this.view.evenNames.SHOW_ITEM_COIN, events);
	}

}