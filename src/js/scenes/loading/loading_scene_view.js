import { CONFIG } from "../../const/gameInfo";
import { FontAsset } from "../../assetLibrary/assetFont";
import { Text } from "../../modules/gameobjects/text";

export class LoadingSceneView {

	/** @private @type {Phaser.Scene} */
	_scene;
	/** @private @type {Text} */
	_loadingText;

	/**
	 * @param {Phaser.Scene} scene
	 */
	constructor (scene) {
		this._scene = scene;
	}

	create () {
		const camRef = this._scene.cameras.main;
		this._loadingText = new Text(this._scene, camRef.centerX, camRef.centerY, "LOADING...", {
			fontSize: `${64}px`,
			fontFamily: FontAsset.cabin.key,
			align: "center",
		});
		this._loadingText.gameObject.setOrigin(0.5);
	}

	/**
	 * @param {number} value
	 */
	updateLoading (value) {
		CONFIG.ENABLE_LOG && console.log("Percent load::", value);
		this._loadingText.gameObject.setText("LOADING\n" + Math.floor(value * 100).toString() + "%");
	}

}