import { _CONFIG as CONFIG } from "../../const/gameInfo";

export class LoadingSceneView {

	/** @private @type {Phaser.Scene} */
	_scene;

	/**
	 * @param {Phaser.Scene} scene
	 */
	constructor (scene) {
		this._scene = scene;
	}

	create () {}

	/**
	 * @param {number} value
	 */
	updateLoading (value) {
		CONFIG.ENABLE_LOG && console.log("Percent load::", value);
	}

}