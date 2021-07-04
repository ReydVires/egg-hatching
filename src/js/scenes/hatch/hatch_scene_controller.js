import { AudioController } from "../../modules/audio/audio_controller";
import { HatchSceneView } from "./hatch_scene_view";
import { SceneKeyInfo } from "../../const/gameInfo";
import { ScreenUtility } from "../../helper/screenUtility";

/**
 * @typedef {(audioKey: string) => void} OnTapHatchButton
 * @typedef {(audioKey: string) => void} OnCallPopupPanel
 * @typedef {(audioKey: string) => void} OnShowItemCoint
 * @typedef {(audioKey: string) => void} OnPlaySfxBeep
 * @typedef {(audioKey: string, config?: Phaser.Types.Sound.SoundConfig) => void} OnPlaySFX
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

		this.onPlaySFX((audioKey, config) => {
			this.audioController.playSFX(audioKey, config);
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
	 * @param {OnPlaySFX} events
	 */
	onPlaySFX (events) {
		this.view.event.on(this.view.evenNames.PLAY_SFX, events);
	}

}