import { Assets } from "../../assetLibrary/assetGameplay";

export class GameplaySceneView {

	/** @private @type {Phaser.Scene} */
	_scene;

	/**
	 * @param {Phaser.Scene} scene
	 */
	constructor (scene) {
		this._scene = scene;
	}

	create () {
		this._scene.add.image(0, 0, Assets.background.key);
	}

}