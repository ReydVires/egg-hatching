import { AudioController } from "../../modules/audio/audio_controller";
import { Audios } from "../../assetLibrary/assetAudio";
import { GameplaySceneView } from "./gameplay_scene_view";
import { SceneKeyInfo } from "../../const/gameInfo";
import { ScreenUtility } from "../../helper/screenUtility";

/**
 * @typedef {(lock: boolean) => void} OnLockInput
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
		ScreenUtility.getInstance().init(this);
		AudioController.getInstance().init(this);
		this.audioController = AudioController.getInstance();

		this.onGotoHatch(() => {
			this.scene.start(SceneKeyInfo.HATCH);
		});
		this.onTapPointButton(() => {
			this.audioController.playSFX(Audios.sfx_zap.key, { volume: 1.25 });
		});
		this.onFillProgressBar(() => {
			this.audioController.playSFX(Audios.sfx_fill_up.key, { volume: 0.85 });
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
	 * @param {Function} events
	 */
	onTapPointButton (events) {
		this.view.event.once(this.view.evenNames.TAP_POINT_BUTTON, events)
	}

	/**
	 * @param {Function} events
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