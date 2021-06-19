import { GameplaySceneView } from "./gameplay_scene_view";
import { SceneKeyInfo } from "../../const/gameInfo";

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
		this.view.create();
	}

	/**
	 * @param {number} time
	 * @param {number} dt
	 */
	update (time, dt) {}

}