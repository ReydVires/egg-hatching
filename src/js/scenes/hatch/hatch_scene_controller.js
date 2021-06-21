import { HatchSceneView } from "./hatch_scene_view";
import { SceneKeyInfo } from "../../const/gameInfo";
import { ScreenUtility } from "../../helper/screenUtility";

export class HatchSceneController extends Phaser.Scene {

	/** @type {HatchSceneView} */
	view;

	constructor () {
		super({ key: SceneKeyInfo.HATCH });
	}

	init () {
		this.view = new HatchSceneView(this);
		ScreenUtility.getInstance().init(this);

		this.onGoToGameplay(() => this.scene.start(SceneKeyInfo.GAMEPLAY));
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

}