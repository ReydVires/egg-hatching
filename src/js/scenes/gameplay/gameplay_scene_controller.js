import { GameplaySceneView } from "./gameplay_scene_view";
import { SceneKeyInfo } from "../../const/gameInfo";
import { ScreenUtility } from "../../helper/screenUtility";

/**
 * @typedef {(lock: boolean) => void} OnLockInput
 */

export class GameplaySceneController extends Phaser.Scene {

	/** @type {GameplaySceneView} */
	view;

	constructor () {
		super({ key: SceneKeyInfo.GAMEPLAY });
	}

	init () {
		this.view = new GameplaySceneView(this);
		ScreenUtility.getInstance().init(this);

		this.onGotoHatch(() => {
			this.scene.start(SceneKeyInfo.HATCH);
		});
		this.onLockInput((lock = true) => {
			this.input.enabled = !lock;
		})
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
	 * @param {OnLockInput} events
	 */
	onLockInput (events) {
		this.view.event.on(this.view.evenNames.LOCK_INPUT, events)
	}

}