import { AudioController } from "../../modules/audio/audio_controller";
import { GameplaySceneView } from "./gameplay_scene_view";
import { SceneKeyInfo } from "../../const/gameInfo";

/**
 * @typedef {(lock: boolean) => void} OnLockInput
 * @typedef {(audioKey: string) => void} OnTapPointButton
 * @typedef {(audioKey: string) => void} OnFillProgressBar
 */

export class GameplaySceneController extends Phaser.Scene {

	/** @type {GameplaySceneView} */
	view;
	/** @type {AudioController} */
	audioController;

	constructor () {
		super({ key: SceneKeyInfo.GAMEPLAY });
	}

	init () {
		this.view = new GameplaySceneView(this);
		this.audioController = AudioController.getInstance();

		this.onGotoHatch(() => {
			this.scene.start(SceneKeyInfo.HATCH);
		});
		this.onTapPointButton((audioKey) => {
			this.audioController.playSFX(audioKey, { volume: 1.5 });
		});
		this.onFillProgressBar((audioKey) => {
			this.audioController.playSFX(audioKey, { volume: 0.8 });
		});
		this.onLockInput((lock = true) => {
			this.input.enabled = !lock;
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
	onGotoHatch (events) {
		this.view.event.once(this.view.evenNames.GOTO_HATCH, events)
	}

	/**
	 * @param {OnTapPointButton} events
	 */
	onTapPointButton (events) {
		this.view.event.once(this.view.evenNames.TAP_POINT_BUTTON, events)
	}

	/**
	 * @param {OnFillProgressBar} events
	 */
	onFillProgressBar (events) {
		this.view.event.on(this.view.evenNames.FILL_PROGRESS_BAR, events)
	}

	/**
	 * @param {OnLockInput} events
	 */
	onLockInput (events) {
		this.view.event.on(this.view.evenNames.LOCK_INPUT, events)
	}

}