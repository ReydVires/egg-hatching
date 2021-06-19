import { GameplaySceneView } from "./gameplay_scene_view";
import { SceneKeyInfo } from "../../const/gameInfo";
import { ScreenUtility } from "../../helper/screenUtility";

export class GameplaySceneController extends Phaser.Scene {

	/** @type {GameplaySceneView} */
	view;

	constructor () {
		super({ key: SceneKeyInfo.GAMEPLAY });
	}

	init () {
		this.view = new GameplaySceneView(this);
	}

	create () {
		Promise.all([
			ScreenUtility.getInstance().init(this),
		])
		.then(() => {
			this.view.create();
		})
		.catch((error) => Error(`${SceneKeyInfo.GAMEPLAY}::\n` + error));
	}

	/**
	 * @param {number} time
	 * @param {number} dt
	 */
	update (time, dt) {}

}